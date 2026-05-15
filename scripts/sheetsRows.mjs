// Convert benefits JSON to 2D array (header + rows) for Sheets upload
import { readFileSync } from 'fs';

const data = JSON.parse(readFileSync('/tmp/benefits.json', 'utf-8'));

const headers = [
  'id', 'tier', 'phase', 'wardKey', 'isNew',
  'title', 'amount', 'as', 'desc',
  'tags', 'cat', 'ageMin', 'ageMax',
  'period', 'deadlineMonth', 'deadlineDay', 'deadlineNote', 'deadlineType',
  'url',
];

const rows = [headers, ...data.map((d) => headers.map((h) => d[h] ?? ''))];

console.log(JSON.stringify(rows));
