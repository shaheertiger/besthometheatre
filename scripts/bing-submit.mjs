// Submits URLs to Bing through the Bing Webmaster API (SubmitUrlBatch), the counterpart of the IndexNow ping.
// Bing's index also feeds DuckDuckGo, Yahoo, Ecosia and Copilot.
//
//   BING_WEBMASTER_API_KEY=... npm run bing:submit                 every URL in the live /sitemap.xml, up to today's quota
//   BING_WEBMASTER_API_KEY=... npm run bing:submit -- --dist       the URLs in the freshly built dist/sitemap.xml
//   BING_WEBMASTER_API_KEY=... npm run bing:submit -- /gear/ /compare/   only URLs containing these paths
//   BING_WEBMASTER_API_KEY=... npm run bing:submit -- --quota      show the daily and monthly quota and exit
//
// The key comes from Bing Webmaster Tools → Settings → API access (it is tied to your Bing account and works for
// every site verified in it). It is read from BING_WEBMASTER_API_KEY, or `apikey` as on enthusiastreview.com.
// The API takes it as a URL parameter, so it never goes in this repo.
//
// Bing allows a daily quota of URL submissions per site (often 100, up to 10,000 for established sites).
// URLs are sent in priority order: home and best lists first, then comparisons, brand pages, products, the rest.
import fs from 'node:fs';
import path from 'node:path';

const SITE_URL = 'https://www.besthometheaterreview.com';
const KEY = process.env.BING_WEBMASTER_API_KEY || process.env.apikey;
const args = process.argv.slice(2);
const filters = args.filter((a) => !a.startsWith('--'));
const API = 'https://ssl.bing.com/webmaster/api.svc/json';

if (!KEY) {
  console.error('Bing submit: no API key. Set BING_WEBMASTER_API_KEY (Bing Webmaster Tools → Settings → API access).');
  process.exit(1);
}

async function call(method, body) {
  const url = `${API}/${method}?apikey=${encodeURIComponent(KEY)}${body ? '' : `&siteUrl=${encodeURIComponent(SITE_URL)}`}`;
  const res = await fetch(url, body ? { method: 'POST', headers: { 'Content-Type': 'application/json; charset=utf-8' }, body: JSON.stringify(body) } : {});
  const text = await res.text();
  let json;
  try { json = JSON.parse(text); } catch { json = { raw: text }; }
  if (!res.ok || json.ErrorCode) throw new Error(`${method}: HTTP ${res.status} ${json.Message ?? text.slice(0, 200)}`);
  return json.d ?? json;
}

const quota = await call('GetUrlSubmissionQuota');
console.log(`Bing quota for ${SITE_URL}: ${quota.DailyQuota} today, ${quota.MonthlyQuota} this month`);
if (args.includes('--quota')) process.exit(0);

const locs = (xml) => [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
const xml = args.includes('--dist')
  ? fs.readFileSync(path.resolve(import.meta.dirname, '..', 'dist', 'sitemap.xml'), 'utf8')
  : await (await fetch(`${SITE_URL}/sitemap.xml`)).text();
let urls = [...new Set(locs(xml))].filter((u) => !filters.length || filters.some((f) => u.includes(f)));

// Priority: home, root-level best lists, brand reviews and guides, then comparisons, brand hubs, products, the rest.
const rank = (u) => {
  const p = new URL(u).pathname;
  if (p === '/') return 0;
  if (/^\/[^/]+\/$/.test(p) && !/^\/(about|contact|privacy-policy|affiliate-disclosure|editorial-policy|sitemap|how-we-test)\/$/.test(p)) return 1;
  if (p.startsWith('/compare/') && p !== '/compare/') return 2;
  if (p.startsWith('/brands/')) return 3;
  if (p.startsWith('/gear/')) return 4;
  return 5;
};
urls.sort((a, b) => rank(a) - rank(b));

const room = Math.min(quota.DailyQuota, quota.MonthlyQuota);
if (!room) {
  console.log('Bing submit: no quota left today; try again tomorrow (IndexNow still covers every URL).');
  process.exit(0);
}
const send = urls.slice(0, room);
for (let i = 0; i < send.length; i += 500) {
  const batch = send.slice(i, i + 500);
  await call('SubmitUrlBatch', { siteUrl: SITE_URL, urlList: batch });
  console.log(`Bing submit: sent ${batch.length} URLs (${i + batch.length}/${send.length})`);
}
if (urls.length > send.length) console.log(`Bing submit: ${urls.length - send.length} URLs left for later days (quota). Run again tomorrow.`);
