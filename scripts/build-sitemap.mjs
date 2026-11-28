// Writes dist/sitemap.xml after `astro build`: one sitemap for every indexable page, the enthusiastreview.com
// pattern. scripts/indexnow-submit.mjs reads this file.
//
// Built from the HTML in dist/, so it can never list a page that doesn't exist or miss one that does:
//   - pages with <meta name="robots" content="noindex"> (drafts, 404) are left out
//   - <lastmod> is the page's article:modified_time, the real last-commit date from scripts/page-dates.mjs;
//     pages without one (hubs, legal) take the newest content date on the site
//   - product photos inside <main> become <image:image> entries (Google image sitemap extension)
import fs from 'node:fs';
import path from 'node:path';

const DIST = path.resolve(import.meta.dirname, '..', 'dist');
const SITE_URL = 'https://www.besthometheaterreview.com';
const esc = (s) => s.replace(/&(?!(?:amp|lt|gt|quot|#\d+);)/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const decode = (s) => s.replace(/&#38;|&amp;/g, '&').replace(/&#39;/g, "'").replace(/&quot;|&#34;/g, '"');

const files = [];
(function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p);
    else if (e.name === 'index.html') files.push(p);
  }
})(DIST);

const pages = [];
for (const file of files) {
  const html = fs.readFileSync(file, 'utf8');
  if (/<meta[^>]+name="robots"[^>]+content="[^"]*noindex/i.test(html)) continue;
  const route = '/' + path.relative(DIST, path.dirname(file)).split(path.sep).filter(Boolean).join('/');
  const loc = route === '/' ? '/' : `${route}/`;
  if (loc.startsWith('/404')) continue;
  const lastmod = html.match(/<meta property="article:modified_time" content="(\d{4}-\d{2}-\d{2})/)?.[1];
  const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)?.[1] ?? '';
  const images = new Map();
  for (const m of main.matchAll(/<img\b[^>]*src="(https:\/\/m\.media-amazon\.com\/images\/I\/[^"]+)"[^>]*alt="([^"]+)"/g)) {
    const id = m[1].match(/\/images\/I\/([^._/]+)\./)?.[1];
    if (id && !images.has(id)) images.set(id, { loc: `https://m.media-amazon.com/images/I/${id}._SL500_.jpg`, title: decode(m[2]) });
  }
  pages.push({ loc, lastmod, images: [...images.values()].slice(0, 20) });
}
// Priority and changefreq, as thehonestreviewers.com sets them: home and the best-of hub first, then the
// buyer's guides that earn search clicks, then guides and brand reviews, then the long tail.
const articleDir = path.join(path.dirname(new URL(import.meta.url).pathname), '..', 'src', 'content', 'articles');
const kindOf = new Map(fs.readdirSync(articleDir).filter((f) => f.endsWith('.json')).map((f) => {
  const a = JSON.parse(fs.readFileSync(path.join(articleDir, f), 'utf8'));
  return [`/${a.slug}/`, a.kind];
}));
function rank(loc) {
  if (loc === '/') return ['1.0', 'daily'];
  if (['/best-of/', '/guides/', '/reviews/'].includes(loc)) return ['0.9', 'weekly'];
  const kind = kindOf.get(loc);
  if (kind === 'roundup') return ['0.9', 'weekly'];
  if (kind === 'guide' || kind === 'review') return ['0.8', 'weekly'];
  if (loc.startsWith('/gear/') || loc.startsWith('/compare/') || loc.startsWith('/tools/')) return ['0.6', 'monthly'];
  if (loc.startsWith('/brands/')) return ['0.5', 'monthly'];
  return ['0.4', 'monthly'];
}
const latest = pages.reduce((m, p) => (p.lastmod && p.lastmod > m ? p.lastmod : m), '');
pages.sort((a, b) => (a.loc === '/' ? -1 : b.loc === '/' ? 1 : a.loc.localeCompare(b.loc)));

const body =
  '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n' +
  pages
    .map((p) => `  <url><loc>${SITE_URL}${p.loc}</loc><lastmod>${p.lastmod ?? latest}</lastmod><changefreq>${rank(p.loc)[1]}</changefreq><priority>${rank(p.loc)[0]}</priority>${p.images.map((i) => `<image:image><image:loc>${esc(i.loc)}</image:loc><image:title>${esc(i.title)}</image:title></image:image>`).join('')}</url>`)
    .join('\n') +
  '\n</urlset>\n';
fs.writeFileSync(path.join(DIST, 'sitemap.xml'), body);
console.log(`build-sitemap: ${pages.length} URLs, ${pages.reduce((n, p) => n + p.images.length, 0)} images → dist/sitemap.xml`);
