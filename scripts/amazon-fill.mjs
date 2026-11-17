#!/usr/bin/env node
/**
 * Fill in real Amazon ASINs and product photos using the official Amazon
 * Product Advertising API 5.0 (SearchItems). Writes src/data/amazon-links.json,
 * which the site merges over the product catalog at build time.
 *
 * Usage:
 *   AMAZON_ACCESS_KEY=... AMAZON_SECRET_KEY=... npm run amazon:fill            # only products with no ASIN yet
 *   AMAZON_ACCESS_KEY=... AMAZON_SECRET_KEY=... npm run amazon:fill -- --all   # refresh everything
 *
 * The partner tag comes from AMAZON_PARTNER_TAG or defaults to the tag in src/data/site.ts.
 * PA-API keys come from Amazon Associates Central → Tools → Product Advertising API.
 * Review the output before publishing: the first search result is not always the exact model.
 */
import { createHash, createHmac } from 'node:crypto';
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';

const root = new URL('../', import.meta.url).pathname;
const ACCESS = process.env.AMAZON_ACCESS_KEY, SECRET = process.env.AMAZON_SECRET_KEY;
const site = readFileSync(root + 'src/data/site.ts', 'utf8');
const TAG = process.env.AMAZON_PARTNER_TAG || site.match(/amazonTag:\s*'([^']+)'/)[1];
const HOST = 'webservices.amazon.com', REGION = 'us-east-1';
if (!ACCESS || !SECRET) { console.error('Set AMAZON_ACCESS_KEY and AMAZON_SECRET_KEY (Product Advertising API credentials).'); process.exit(1); }

const linksPath = root + 'src/data/amazon-links.json';
const links = JSON.parse(readFileSync(linksPath, 'utf8'));
const all = process.argv.includes('--all');
const products = readdirSync(root + 'src/content/products').flatMap((f) => JSON.parse(readFileSync(root + 'src/content/products/' + f, 'utf8')));

const hmac = (k, s) => createHmac('sha256', k).update(s).digest();
const sha = (s) => createHash('sha256').update(s).digest('hex');
async function paapi(target, payload) {
  const path = '/paapi5/' + target.toLowerCase();
  const body = JSON.stringify(payload);
  const amzDate = new Date().toISOString().replace(/[:-]|\.\d{3}/g, '');
  const date = amzDate.slice(0, 8);
  const headers = { 'content-encoding': 'amz-1.0', 'content-type': 'application/json; charset=utf-8', host: HOST, 'x-amz-date': amzDate, 'x-amz-target': `com.amazon.paapi5.v1.ProductAdvertisingAPIv1.${target}` };
  const signed = Object.keys(headers).sort().join(';');
  const canon = ['POST', path, '', Object.keys(headers).sort().map((k) => `${k}:${headers[k]}\n`).join(''), signed, sha(body)].join('\n');
  const scope = `${date}/${REGION}/ProductAdvertisingAPI/aws4_request`;
  const toSign = ['AWS4-HMAC-SHA256', amzDate, scope, sha(canon)].join('\n');
  const key = hmac(hmac(hmac(hmac('AWS4' + SECRET, date), REGION), 'ProductAdvertisingAPI'), 'aws4_request');
  const sig = createHmac('sha256', key).update(toSign).digest('hex');
  const res = await fetch(`https://${HOST}${path}`, { method: 'POST', body, headers: { ...headers, Authorization: `AWS4-HMAC-SHA256 Credential=${ACCESS}/${scope}, SignedHeaders=${signed}, Signature=${sig}` } });
  return res.json();
}
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const norm = (s) => s.toLowerCase().replace(/[^a-z0-9]/g, '');

let filled = 0;
for (const p of products) {
  if (!all && links[p.slug]) continue;
  const data = await paapi('SearchItems', { Keywords: p.amazonQuery || p.name, SearchIndex: 'All', ItemCount: 5, PartnerTag: TAG, PartnerType: 'Associates', Marketplace: 'www.amazon.com', Resources: ['ItemInfo.Title', 'Images.Primary.Large'] });
  const items = data?.SearchResult?.Items ?? [];
  const brandTok = norm(p.brand.split(' ')[0]);
  const item = items.find((it) => norm(it.ItemInfo?.Title?.DisplayValue ?? '').includes(brandTok)) ?? items[0];
  if (item) {
    const img = item.Images?.Primary?.Large?.URL ?? '';
    const imageId = img.match(/images\/I\/([^._]+)\./)?.[1];
    links[p.slug] = { asin: item.ASIN, ...(imageId ? { imageId } : {}), title: item.ItemInfo?.Title?.DisplayValue };
    filled++;
    console.log(`✓ ${p.slug} → ${item.ASIN}  ${item.ItemInfo?.Title?.DisplayValue?.slice(0, 70)}`);
  } else console.log(`✗ ${p.slug}: ${data?.Errors?.[0]?.Message ?? 'no results'}`);
  writeFileSync(linksPath, JSON.stringify(links, null, 2) + '\n');
  await sleep(1100); // PA-API default limit is 1 request/second
}
console.log(`\nDone. ${filled} products updated in src/data/amazon-links.json. Review titles before publishing.`);
