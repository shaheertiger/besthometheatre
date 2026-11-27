#!/usr/bin/env node
/**
 * Daily search report from the Bing Webmaster API. Bing's index also serves DuckDuckGo, Yahoo and Ecosia,
 * so this covers most of the site's search traffic. Used by the daily-publish skill before writing pages.
 *
 *   apikey=... node scripts/search-report.mjs [--days 30] [--json out.json]
 *
 * The key is read from `apikey` (the cloud environment variable) or BING_WEBMASTER_API_KEY. It goes in the
 * request URL only: never print it, log it or commit it.
 *
 * Prints: daily totals, top queries, top pages, pages with impressions and CTR under 2% (snippet rewrites),
 * and on-topic queries with no matching page (new-page candidates).
 */
import fs from 'node:fs';
import path from 'node:path';

const KEY = process.env.apikey || process.env.BING_WEBMASTER_API_KEY;
// Bing Webmaster verifies the bare domain.
const SITE = 'https://besthometheaterreview.com/';
const ROOT = path.resolve(import.meta.dirname, '..');
const args = process.argv.slice(2);
const opt = (n, d) => (args.includes(n) ? args[args.indexOf(n) + 1] : d);
const DAYS = Number(opt('--days', 30));
const JSON_OUT = opt('--json', null);
// Noise found in the 2026-11-27 keyword research (docs/keywords/).
const OFF_TOPIC = /\b(polk (county|state)|motorcycle|outboard|yamaha (r\d|mt-|atv|golf)|ipad|iphone|laptop screen|monitor size|login|sign in|app download|windows search|outlook)\b/i;

if (!KEY) {
  console.error('No Bing Webmaster API key: set apikey (or BING_WEBMASTER_API_KEY).');
  process.exit(1);
}

async function bing(method) {
  const url = `https://ssl.bing.com/webmaster/api.svc/json/${method}?apikey=${encodeURIComponent(KEY)}&siteUrl=${encodeURIComponent(SITE)}`;
  const r = await fetch(url);
  // Never echo the URL: it contains the key.
  if (!r.ok) throw new Error(`${method}: HTTP ${r.status} ${(await r.text()).slice(0, 200)}`);
  return (await r.json()).d || [];
}
const day = (d) => new Date(Number(/-?\d+/.exec(d)[0])).toISOString().slice(0, 10);
const since = new Date(Date.now() - DAYS * 864e5).toISOString().slice(0, 10);

function aggregate(rows) {
  const m = new Map();
  for (const r of rows) {
    if (day(r.Date) < since) continue;
    const a = m.get(r.Query) || { key: r.Query, impressions: 0, clicks: 0, posSum: 0 };
    a.impressions += r.Impressions;
    a.clicks += r.Clicks;
    a.posSum += (r.AvgImpressionPosition || 0) * r.Impressions;
    m.set(r.Query, a);
  }
  return [...m.values()]
    .map(({ posSum, ...a }) => ({ ...a, ctr: a.impressions ? a.clicks / a.impressions : 0, position: +(posSum / Math.max(a.impressions, 1)).toFixed(1) }))
    .sort((x, y) => y.clicks - x.clicks || y.impressions - x.impressions);
}

// Pages that exist: articles (slug, keyword, keywords). Used to decide whether a query already has a page.
const STOP = new Set('a an the for of to in on with and or is are how what best vs my your do does can i 2025 2026 review reviews'.split(' '));
const tokens = (s) => s.toLowerCase().replace(/[^a-z0-9.]+/g, ' ').split(' ').filter((t) => t && !STOP.has(t));
const articles = fs
  .readdirSync(path.join(ROOT, 'src/content/articles'))
  .map((f) => JSON.parse(fs.readFileSync(path.join(ROOT, 'src/content/articles', f), 'utf8')))
  .map((a) => ({ slug: a.slug, words: new Set(tokens([a.slug.replace(/-/g, ' '), a.keyword, ...(a.keywords ?? [])].join(' '))) }));
function pageFor(query) {
  const q = tokens(query);
  if (!q.length) return null;
  let best = null;
  for (const a of articles) {
    const hit = q.filter((t) => a.words.has(t)).length / q.length;
    if (hit >= 0.8 && (!best || hit > best.hit)) best = { slug: a.slug, hit };
  }
  return best?.slug ?? null;
}

const pct = (x) => (x * 100).toFixed(1) + '%';
const row = (r) => `${String(r.impressions).padStart(5)} ${String(r.clicks).padStart(4)} ${pct(r.ctr).padStart(6)} ${String(r.position).padStart(5)}  ${r.key}`;

const [queryRows, pageRows, traffic] = await Promise.all([bing('GetQueryStats'), bing('GetPageStats'), bing('GetRankAndTrafficStats')]);
const queries = aggregate(queryRows).filter((q) => !OFF_TOPIC.test(q.key));
const pages = aggregate(pageRows);

console.log(`# Bing search report for ${SITE}, last ${DAYS} days (since ${since})\n`);
console.log('## Daily totals (last 14 days)');
const recent = traffic.filter((t) => day(t.Date) >= since);
for (const t of traffic.slice(-14)) console.log(`${day(t.Date)}  impressions ${String(t.Impressions).padStart(5)}  clicks ${t.Clicks}`);
const tot = recent.reduce((a, t) => ({ i: a.i + t.Impressions, c: a.c + t.Clicks }), { i: 0, c: 0 });
console.log(`Total ${DAYS} d: ${tot.i} impressions, ${tot.c} clicks (CTR ${pct(tot.i ? tot.c / tot.i : 0)})`);

console.log(`\n## Top queries (${queries.length} on-topic)   impr  clk    ctr   pos`);
for (const q of queries.slice(0, 50)) console.log(row(q));

console.log(`\n## Top pages (${pages.length})                impr  clk    ctr   pos`);
for (const p of pages.slice(0, 40)) console.log(row(p));

const lowCtr = pages.filter((p) => p.impressions >= 20 && p.ctr < 0.02).sort((a, b) => b.impressions - a.impressions);
console.log(`\n## SNIPPET REWRITES: pages with impressions and CTR under 2% (${lowCtr.length})`);
for (const p of lowCtr.slice(0, 20)) console.log(row(p));
if (!lowCtr.length) console.log('(none with 20+ impressions)');

const noPage = queries.filter((q) => !pageFor(q.key)).sort((a, b) => b.impressions - a.impressions);
console.log(`\n## NEW-PAGE CANDIDATES: on-topic queries with no matching page (${noPage.length})`);
for (const q of noPage.slice(0, 40)) console.log(row(q));

if (JSON_OUT) {
  fs.writeFileSync(JSON_OUT, JSON.stringify({ site: SITE, since, traffic, queries, pages, lowCtr, noPage }, null, 2));
  console.log(`\nWrote ${JSON_OUT}`);
}
