// Submits every URL in the built sitemap.xml to IndexNow (Bing, Yandex, Seznam, Naver…) so new and updated pages
// are crawled within hours. Bing's index also feeds DuckDuckGo, Yahoo, Ecosia and Copilot. Same script as
// enthusiastreview.com.
//
//   npm run indexnow                          submit the URLs in the LIVE /sitemap.xml (run after a deploy)
//   node scripts/indexnow-submit.mjs --postbuild
//                                             last step of `npm run build`: on a Vercel production build, submit
//                                             the URLs in the freshly built dist/sitemap.xml; anywhere else do
//                                             nothing. Never fails the build.
//
// IndexNow verifies ownership by fetching https://<host>/<key>.txt, which lives in /public.
import fs from 'node:fs';
import path from 'node:path';

const SITE_URL = (process.env.SITE_URL || 'https://www.besthometheaterreview.com').replace(/\/$/, '');
const KEY = process.env.INDEXNOW_KEY || '02e52e4ff57642149b896959813aefcc';
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
    urlList = locs(fs.readFileSync(path.join(DIST, 'sitemap.xml'), 'utf8'));
  } else {
    const xml = await (await fetch(`${SITE_URL}/sitemap.xml`)).text();
    // Before this deploy the live site still served a sitemap index: follow it if that's what comes back.
    urlList = xml.includes('<sitemapindex') ? (await Promise.all(locs(xml).map(async (u) => locs(await (await fetch(u)).text())))).flat() : locs(xml);
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
