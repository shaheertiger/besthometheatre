// Fails the build if src/data/link-plan.ts names an article slug that does not exist, so the
// Before You Buy, Ready to Buy and Everything Else blocks never point at a missing page.
import fs from 'node:fs';
import path from 'node:path';
const root = path.join(import.meta.dirname, '..');
const slugs = new Set(fs.readdirSync(path.join(root, 'src/content/articles')).filter((f) => f.endsWith('.json')).map((f) => f.replace(/\.json$/, '')));
const src = fs.readFileSync(path.join(root, 'src/data/link-plan.ts'), 'utf8');
const bad = [...new Set([...src.matchAll(/'([a-z0-9]+(?:-[a-z0-9]+)+)'/g)].map((m) => m[1]))].filter((s) => !slugs.has(s));
if (bad.length) { console.error(`link-plan: unknown slugs: ${bad.join(', ')}`); process.exit(1); }
console.log(`link-plan: all slugs exist (${slugs.size} articles)`);
