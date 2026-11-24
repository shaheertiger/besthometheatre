// Submits every URL in the built sitemaps to IndexNow (Bing, Yandex, Seznam, Naver…) so new and updated pages
// are crawled within hours. Bing's index also feeds DuckDuckGo, Yahoo, Ecosia and Copilot. Same script as
// enthusiastreview.com.
//
//   npm run indexnow                          submit the URLs in the LIVE sitemaps (run after a deploy)
//   node scripts/indexnow-submit.mjs --postbuild
//                                             last step of `npm run build`: on a Vercel production build, submit
//                                             the URLs in the freshly built dist/sitemap-*.xml; anywhere else do
//                                             nothing. Never fails the build.
//
// IndexNow verifies ownership by fetching https://<host>/<key>.txt, which lives in /public.
import fs from 'node:fs';
import path from 'node:path';

const SITE_URL = (process.env.SITE_URL || 'https://www.besthometheaterreview.com').replace(/\/$/, '');
const KEY = process.env.INDEXNOW_KEY || '2d31550bc2b94a8d882d41a77fdb73d7';
const host = new URL(SITE_URL).host;
const postbuild = process.argv.includes('--postbuild');
const DIST = path.resolve(import.meta.dirname, '..', 'dist');

if (postbuild && process.env.VERCEL_ENV !== 'production') {
  console.log(`IndexNow: skipped (not a Vercel production build; VERCEL_ENV=${process.env.VERCEL_ENV ?? 'unset'})`);
  process.exit(0);
}
const fail = (msg) => {
  console.error(msg);
  // A failed ping must never block a deploy; Bing still recrawls from the sitemap.
  process.exit(postbuild ? 0 : 1);
};

const locs = (xml) => [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
let urlList = [];
try {
  if (postbuild) {
    for (const f of fs.readdirSync(DIST).filter((f) => /^sitemap-(?!index).*\.xml$/.test(f))) urlList.push(...locs(fs.readFileSync(path.join(DIST, f), 'utf8')));
  } else {
    const index = await (await fetch(`${SITE_URL}/sitemap-index.xml`)).text();
    for (const sm of locs(index)) urlList.push(...locs(await (await fetch(sm)).text()));
  }
} catch (e) {
  fail(`IndexNow: could not read the sitemaps (${e.message})`);
}
urlList = [...new Set(urlList)];
if (!urlList.length) fail('IndexNow: no URLs found in the sitemaps — is the site built/deployed?');

try {
  const res = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ host, key: KEY, keyLocation: `${SITE_URL}/${KEY}.txt`, urlList }),
  });
  console.log(`IndexNow: ${res.status} ${res.statusText} — submitted ${urlList.length} URLs`);
  if (!res.ok) fail(await res.text().catch(() => ''));
} catch (e) {
  fail(`IndexNow: request failed (${e.message})`);
}
