// Google Sheets → src/data/generated/benefits.json への同期スクリプト
//
// 使い方:
//   1. Google Cloud Console でサービスアカウントを作成
//   2. JSON キーを `secrets/sheets-service-account.json` に配置（.gitignore 済み）
//   3. スプレッドシートにそのサービスアカウントのメールアドレスを「閲覧者」で共有
//   4. `node scripts/syncFromSheets.mjs` を実行
//
// 出力先: src/data/generated/benefits.json
//
import { google } from 'googleapis';
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, '..');

const SPREADSHEET_ID =
  process.env.SHEETS_SPREADSHEET_ID || '1NG1RofQwe0OPatuFvIZRhQyCgK5pn1Gp3ECCo_rjvPg';
const SHEET_NAME = process.env.SHEETS_SHEET_NAME || '補助金マスター';
const RANGE = `${SHEET_NAME}!A1:S200`;

const KEY_PATH =
  process.env.GOOGLE_APPLICATION_CREDENTIALS ||
  join(projectRoot, 'secrets', 'sheets-service-account.json');

if (!existsSync(KEY_PATH)) {
  console.error(`\n[ERROR] サービスアカウントキーが見つかりません: ${KEY_PATH}`);
  console.error(
    '       Google Cloud Console でサービスアカウントを作成し、JSON キーを上記パスに置いてください。\n' +
      '       詳細: README.md の "Sheets sync setup" セクションを参照'
  );
  process.exit(1);
}

const auth = new google.auth.GoogleAuth({
  keyFile: KEY_PATH,
  scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
});

const sheets = google.sheets({ version: 'v4', auth });

console.log(`📊 Fetching ${SHEET_NAME} from spreadsheet ${SPREADSHEET_ID}...`);

const res = await sheets.spreadsheets.values.get({
  spreadsheetId: SPREADSHEET_ID,
  range: RANGE,
});

const rows = res.data.values;
if (!rows || rows.length < 2) {
  console.error('No data found in the sheet.');
  process.exit(1);
}

const headers = rows[0];
const dataRows = rows.slice(1).filter((r) => r[0]); // skip empty rows

console.log(`✓ Got ${dataRows.length} rows`);

// Row → Benefit object
const benefits = dataRows.map((row) => {
  const obj = {};
  headers.forEach((h, i) => {
    obj[h] = row[i] ?? '';
  });

  // Type-safe transformation
  const benefit = {
    id: obj.id,
    tier: obj.tier,
    isNew: String(obj.isNew).toLowerCase() === 'true',
    title: obj.title,
    amount: obj.amount,
    as: obj.as,
    desc: obj.desc,
    tags: obj.tags ? String(obj.tags).split(',').filter(Boolean) : [],
    cat: obj.cat ? String(obj.cat).split(',').filter(Boolean) : [],
    period: obj.period,
    url: obj.url,
    deadline: null,
  };

  if (obj.phase) benefit.phase = obj.phase;
  if (obj.wardKey) benefit.wardKey = obj.wardKey;

  // age range
  if (obj.ageMin !== '' || obj.ageMax !== '') {
    benefit.age = [Number(obj.ageMin || 0), Number(obj.ageMax || 0)];
  }

  // deadline
  if (obj.deadlineMonth || obj.deadlineDay || obj.deadlineNote) {
    benefit.deadline = {
      month: obj.deadlineMonth ? Number(obj.deadlineMonth) : null,
      day: obj.deadlineDay ? Number(obj.deadlineDay) : null,
      note: obj.deadlineNote || '',
    };
  }

  if (obj.deadlineType) benefit.deadlineType = obj.deadlineType;

  return benefit;
});

// 集計ログ
const counts = benefits.reduce((a, b) => {
  a[b.tier] = (a[b.tier] || 0) + 1;
  return a;
}, {});
console.log('  Tier counts:', counts);

// 出力
const outDir = join(projectRoot, 'src', 'data', 'generated');
mkdirSync(outDir, { recursive: true });

const outPath = join(outDir, 'benefits.json');
writeFileSync(outPath, JSON.stringify(benefits, null, 2), 'utf-8');

console.log(`\n✅ Synced ${benefits.length} benefits → ${outPath.replace(projectRoot + '/', '')}`);
console.log('\n次の手順:');
console.log('  1. git diff src/data/generated/benefits.json で差分を確認');
console.log('  2. 問題なければ commit & push → Vercel が自動デプロイ');
