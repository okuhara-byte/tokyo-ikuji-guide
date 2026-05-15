// Export all benefits from TS data files to a flat JSON array for Sheets upload
import { readFileSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..', 'src', 'data');

// Very simple TS-to-JS parser using regex (data is highly structured)
function parseBenefitsFromFile(filePath, defaultMeta = {}) {
  const src = readFileSync(filePath, 'utf-8');
  const items = [];
  // Match each { ... } object block at the top level of the array
  // Use a balanced brace counter, simple enough for our data files.
  const arrMatch = src.match(/\[\s*([\s\S]*?)\];?\s*$/m);
  if (!arrMatch) return items;
  const body = src.match(/\[\s*\n([\s\S]*)\n\];?/)?.[1] ?? '';

  // split on top-level "{ id:" boundaries
  let depth = 0;
  let buf = '';
  const blocks = [];
  for (const ch of body) {
    if (ch === '{') depth++;
    if (ch === '{' && depth === 1 && buf.trim().match(/[,]?\s*$/)) {
      buf = '';
    }
    buf += ch;
    if (ch === '}') {
      depth--;
      if (depth === 0) {
        blocks.push(buf.trim());
        buf = '';
      }
    }
  }

  for (const block of blocks) {
    if (!block.startsWith('{')) continue;
    const obj = {};
    obj.id = block.match(/id:\s*'([^']+)'/)?.[1] ?? '';
    obj.tier = block.match(/tier:\s*'([^']+)'/)?.[1] ?? '';
    obj.phase = block.match(/phase:\s*'([^']+)'/)?.[1] ?? defaultMeta.phase ?? '';
    obj.wardKey = defaultMeta.wardKey ?? '';
    obj.isNew = block.match(/isNew:\s*(true|false)/)?.[1] ?? 'false';
    obj.title = block.match(/title:\s*'([^']*)'/)?.[1] ?? '';
    obj.amount = block.match(/amount:\s*'([^']*)'/)?.[1] ?? '';
    obj.as = block.match(/as:\s*'([^']*)'/)?.[1] ?? '';
    obj.desc = block.match(/desc:\s*'([^']*)'/)?.[1] ?? '';
    obj.tags = (block.match(/tags:\s*\[([^\]]+)\]/)?.[1] ?? '')
      .split(',')
      .map((s) => s.replace(/['\s]/g, ''))
      .filter(Boolean)
      .join(',');
    obj.cat = (block.match(/cat:\s*\[([^\]]+)\]/)?.[1] ?? '')
      .split(',')
      .map((s) => s.replace(/['\s]/g, ''))
      .filter(Boolean)
      .join(',');
    const age = block.match(/age:\s*\[\s*(\d+)\s*,\s*(\d+)\s*\]/);
    obj.ageMin = age?.[1] ?? '';
    obj.ageMax = age?.[2] ?? '';
    obj.period = block.match(/period:\s*'([^']*)'/)?.[1] ?? '';
    const deadlineBlock = block.match(/deadline:\s*\{([^}]*)\}/)?.[1] ?? '';
    if (deadlineBlock) {
      obj.deadlineMonth = deadlineBlock.match(/month:\s*(\d+)/)?.[1] ?? '';
      obj.deadlineDay = deadlineBlock.match(/day:\s*(\d+)/)?.[1] ?? '';
      obj.deadlineNote = deadlineBlock.match(/note:\s*'([^']*)'/)?.[1] ?? '';
    } else {
      obj.deadlineMonth = '';
      obj.deadlineDay = '';
      obj.deadlineNote = '';
    }
    obj.deadlineType = block.match(/deadlineType:\s*'([^']*)'/)?.[1] ?? '';
    obj.url = block.match(/url:\s*'([^']*)'/)?.[1] ?? '';
    items.push(obj);
  }
  return items;
}

const allItems = [];
allItems.push(...parseBenefitsFromFile(join(root, 'national.ts')));
allItems.push(...parseBenefitsFromFile(join(root, 'metro.ts')));
allItems.push(...parseBenefitsFromFile(join(root, 'fertility.ts')));
allItems.push(...parseBenefitsFromFile(join(root, 'pregnancy.ts')));
allItems.push(...parseBenefitsFromFile(join(root, 'birth.ts')));

const wardDir = join(root, 'wards');
for (const f of readdirSync(wardDir)) {
  if (f === 'index.ts') continue;
  const wardKey = f.replace('.ts', '');
  allItems.push(...parseBenefitsFromFile(join(wardDir, f), { wardKey }));
}

console.log(JSON.stringify(allItems, null, 2));
