# Google Sheets 連携セットアップ

補助金一覧データを Google スプレッドシートで管理するための手順書です。

## スプレッドシート

- ID: `1NG1RofQwe0OPatuFvIZRhQyCgK5pn1Gp3ECCo_rjvPg`
- シート名: `補助金マスター`
- URL: https://docs.google.com/spreadsheets/d/1NG1RofQwe0OPatuFvIZRhQyCgK5pn1Gp3ECCo_rjvPg/edit

## カラム定義

| カラム | 型 | 説明 |
|---|---|---|
| `id` | text | 補助金ID（例: `n1`, `wc3`）— 詳細ページURLに使用 |
| `tier` | text | `national` / `metro` / `ward` |
| `phase` | text | `fertility` / `pregnancy` / `birth`（空欄可） |
| `wardKey` | text | 区キー（`chuo`, `minato` 等）。ward行のみ |
| `isNew` | bool | TRUE / FALSE（NEWバッジ表示） |
| `title` | text | 制度名 |
| `amount` | text | 金額（例: `50万円`） |
| `as` | text | 補足（例: `1児あたり1回`） |
| `desc` | text | 説明文 |
| `tags` | text | カンマ区切り（例: `0〜18歳,所得制限なし`） |
| `cat` | text | カテゴリ（カンマ区切り） |
| `ageMin` / `ageMax` | number | 対象月齢の範囲 |
| `period` | text | 申請期間の説明 |
| `deadlineMonth` / `deadlineDay` | number | 申請締切（任意） |
| `deadlineNote` | text | 締切に関する注記 |
| `deadlineType` | text | `annual` / `rolling` / `onetime` |
| `url` | text | 公式ページURL |

## 同期の流れ

```
Google Sheets で編集
       ↓
npm run sync-sheets        ← 担当エンジニアが実行
       ↓
src/data/generated/benefits.json が更新される
       ↓
git diff で差分確認
       ↓
git commit → push          ← Vercelが自動デプロイ
```

## 初回セットアップ（Google Cloud 側）

1. **Google Cloud Console** にログイン: https://console.cloud.google.com/
2. プロジェクトを作成（または既存のものを選択）
3. **APIライブラリ** で `Google Sheets API` を有効化
4. **認証情報 → サービスアカウントを作成**
   - 名前: 例「ikuji-guide-sheets-sync」
   - ロール: 不要（読み取り専用なので付与しないでOK）
5. 作成したサービスアカウントを開き、**「鍵」→ 「新しい鍵を作成」→ JSON** を選択
6. ダウンロードされた JSON ファイルを以下のパスに配置:
   ```
   secrets/sheets-service-account.json
   ```
   ※ `secrets/` は `.gitignore` 済みです
7. **スプレッドシートを共有**:
   - スプレッドシートを開く
   - 右上「共有」→ サービスアカウントのメールアドレス（`xxx@yyy.iam.gserviceaccount.com`）を**閲覧者**として追加

## 同期実行

```bash
npm run sync-sheets
```

成功時の出力例:
```
📊 Fetching 補助金マスター from spreadsheet 1NG1Rof...
✓ Got 145 rows
  Tier counts: { national: 17, metro: 13, ward: 115 }

✅ Synced 145 benefits → src/data/generated/benefits.json
```

## 反映の有効化（最初の1回だけ）

同期したデータを Next.js アプリで使うには `src/data/index.ts` を切り替えます:

```ts
// 変更前
export { NATIONAL } from './national';
export { METRO } from './metro';
...

// 変更後
export {
  NATIONAL, METRO, FERTILITY, PREGNANCY, BIRTH, WARD,
} from './loadFromSheets';
```

`loadFromSheets.ts` は同期データ（JSON）があればそれを、なければ既存の TS データをフォールバックとして使うように作られています。

## トラブルシューティング

| 症状 | 対処 |
|---|---|
| `[ERROR] サービスアカウントキーが見つかりません` | JSON キーを `secrets/sheets-service-account.json` に配置 |
| `Permission denied` / 403 | スプレッドシートにサービスアカウントを共有していない |
| `No data found in the sheet` | シート名 `補助金マスター` が変わっていないか確認 |
| 列が足りない | カラム定義に従って A〜S 列が揃っているか確認 |

## 注意事項

- **詳細ページのコンテンツ**（適格性チェック・申請の流れ等）は `src/data/benefitDetails/` 配下にコード管理されています。Sheets では管理しません。
- スプレッドシートで新しい `id` を追加した場合、詳細ガイドページは生成されません（コード側に詳細データを追加する必要があります）。
- スプレッドシートから `id` を削除しても、同期実行までは旧データが残ります。
