// Submit every URL in the built XML sitemaps to IndexNow (Bing, Yandex, Seznam, Naver and others share submissions).
// The key file public/<key>.txt must be live at https://www.besthometheaterreview.com/<key>.txt first.
// Usage: npm run build && npm run indexnow            (all URLs)
//        npm run indexnow -- /best-home-theater-systems/ /gear/  (only URLs containing these paths)
//        npm run indexnow -- --no-check             (submit before deploy; IndexNow validates the key later, HTTP 202)
import { readFileSync, readdirSync } from 'node:fs';

const KEY = '02e52e4ff57642149b896959813aefcc';
const HOST = 'www.besthometheaterreview.com';
const dist = new URL('../dist/', import.meta.url).pathname;
const noCheck = process.argv.includes('--no-check');
const filters = process.argv.slice(2).filter((a) => !a.startsWith('--'));

const urls = readdirSync(dist)
  .filter((f) => /^sitemap-.*\d\.xml$/.test(f))
  .flatMap((f) => [...readFileSync(dist + f, 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]))
  .filter((u) => !filters.length || filters.some((f) => u.includes(f)));
if (!urls.length) { console.error('No URLs found. Run npm run build first.'); process.exit(1); }

const keyUrl = `https://${HOST}/${KEY}.txt`;
const check = noCheck ? null : await fetch(keyUrl).catch(() => null);
if (!noCheck && (!check?.ok || (await check.text()).trim() !== KEY)) { console.error(`Key file not live at ${keyUrl}. Deploy first.`); process.exit(1); }

const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: keyUrl, urlList: urls }),
});
console.log(`Submitted ${urls.length} URLs to IndexNow: HTTP ${res.status} ${res.statusText}`);
if (res.status >= 400) { console.error(await res.text()); process.exit(1); }
