import type { Article, Product } from './types';
import overrides from '../data/amazon-links.json';
import fetchedImages from '../data/product-images.json';
import fetchedAsins from '../data/product-asins.json';
import gitDates from '../data/git-dates.json';
import { CATEGORY_LABELS } from '../data/site';
import { slugify } from './md';

type Override = string | { asin?: string; imageId?: string; url?: string; image?: string };

/** Pull an ASIN out of any Amazon product URL (dp/, gp/product/, amzn links with /dp/). */
export function asinFromUrl(url: string): string | undefined {
  const m = url.match(/(?:\/dp\/|\/gp\/product\/|\/gp\/aw\/d\/|\/exec\/obidos\/asin\/)([A-Z0-9]{10})/i);
  return m ? m[1].toUpperCase() : undefined;
}

/** "https://m.media-amazon.com/images/I/41Txa4w1RXL._SL500_.jpg" → "41Txa4w1RXL" */
export function imageIdFromUrl(url: string | undefined): string | undefined {
  return url?.match(/\/images\/I\/([^._/]+)\./)?.[1];
}

/** Merge Amazon data: Creators API results first, then hand-entered amazon-links.json wins. */
function applyOverride(base: Product): Product {
  let p = base;
  const fa = (fetchedAsins as Record<string, string>)[p.slug];
  const fi = imageIdFromUrl((fetchedImages as Record<string, string>)[p.slug]);
  if (fa || fi) p = { ...p, ...(fa ? { asin: fa } : {}), ...(fi ? { imageId: fi } : {}) };
  const o = (overrides as Record<string, Override>)[p.slug];
  if (!o) return p;
  if (typeof o === 'string') {
    const asin = /^[A-Z0-9]{10}$/i.test(o) ? o.toUpperCase() : asinFromUrl(o);
    return asin ? { ...p, asin } : p;
  }
  const asin = o.asin || (o.url ? asinFromUrl(o.url) : undefined);
  const imageId = o.imageId || imageIdFromUrl((o as { image?: string }).image);
  return { ...p, ...(asin ? { asin } : {}), ...(imageId ? { imageId } : {}) };
}

const productFiles = import.meta.glob<{ default: Product[] }>('../content/products/*.json', { eager: true });
const articleFiles = import.meta.glob<{ default: Article }>('../content/articles/*.json', { eager: true });

/** Launch date: the fallback when git has no date for a file (scripts/page-dates.mjs). */
export const LAUNCH = '2026-11-17';
const git = (key: string) => (gitDates as Record<string, string>)[key];
const productFile = new Map<string, string>();
export const products: Product[] = Object.entries(productFiles)
  .flatMap(([path, m]) => m.default.map((p) => (productFile.set(p.slug, path.replace(/^.*\/|\.json$/g, '')), p)))
  .map(applyOverride)
  .sort((a, b) => b.score - a.score);

export const productMap = new Map(products.map((p) => [p.slug, p]));

// `updated` is the date of the last commit that changed the article's JSON (scripts/page-dates.mjs), so the
// byline, the Article dateModified and the sitemap lastmod move only when the content really changes.
const gitDate = (slug: string, fallback: string) => {
  const d = git(`articles/${slug}`);
  return d && d > fallback ? d : fallback;
};
export const articles: Article[] = Object.values(articleFiles)
  .map((m) => ({ ...m.default, updated: gitDate(m.default.slug, m.default.updated) }))
  .sort((a, b) => a.slug.localeCompare(b.slug));

export const articleMap = new Map(articles.map((a) => [a.slug, a]));

export function getProduct(slug: string): Product {
  const p = productMap.get(slug);
  if (!p) throw new Error(`Unknown product slug: ${slug}`);
  return p;
}

export const brandSlug = (b: string) => slugify(b);

export const brands = [...new Set(products.map((p) => p.brand))].sort((a, b) => a.localeCompare(b));

export function productsByCategory(cat: string) {
  return products.filter((p) => p.category === cat);
}

export function productsByBrand(brand: string) {
  return products.filter((p) => p.brand === brand);
}

/** Articles that feature a product in their picks. */
export function articlesForProduct(slug: string) {
  return articles.filter((a) => a.picks?.some((pk) => pk.product === slug));
}

export function articleUrl(a: Pick<Article, 'slug'>) {
  return `/${a.slug}/`;
}
export const productUrl = (p: Pick<Product, 'slug'>) => `/gear/${p.slug}/`;
export const brandUrl = (brand: string) => `/brands/${brandSlug(brand)}/`;

export function hubLabel(hub: string) {
  if (hub === 'guides') return 'Guides';
  if (hub === 'brands') return 'Brand Reviews';
  return CATEGORY_LABELS[hub] ?? hub;
}

export function readMinutes(a: Article) {
  const text = [a.intro, a.quickAnswer, ...(a.picks ?? []).map((p) => p.body), ...a.sections.map((s) => s.body), ...(a.mistakes ?? []).map((m) => m.body), ...a.faqs.map((f) => f.a), a.bottomLine].join(' ');
  return Math.max(3, Math.round(text.split(/\s+/).length / 230));
}

export function formatDate(d: string) {
  return new Date(d + 'T12:00:00Z').toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });
}

/** Compare pairs: [a, b] product slugs, a < b alphabetically. */
export function compareSlug(a: string, b: string) {
  const [x, y] = [a, b].sort();
  return `${x}-vs-${y}`;
}

const SUFFIXES = [
  ' Home Theater Seating', ' Home Theater Seats', ' Home Theater Sound Bar', ' Home Theater System', ' Home Theater Package', ' Surround Sound System',
  ' Soundbar System', ' Wireless System', ' Dolby Atmos System', ' Fixed Frame Screen', ' Motorized Screen', ' Pull Down Screen',
  ' Floorstanding Speakers', ' Floorstanding Speaker', ' Bookshelf Speakers', ' Powered Bookshelf Speakers', ' Center Channel Speaker',
  ' In-Ceiling Speakers', ' In-Ceiling Speaker', ' In-Wall Speakers', ' In-Wall Speaker', ' Dolby Atmos Elevation Speakers', ' Height Module',
  ' Atmos Module', ' Tower Speaker', ' Wireless Speakers', ' Powered Speakers', ' Mini-LED TV', ' Mini LED TV', ' QD-Mini LED TV',
  ' OLED evo TV', ' OLED TV', ' Integrated Amplifier', ' Amplifier', ' Universal Remote', ' Speaker Wire', ' Surge Protector', ' Power Conditioner',
  ' Popcorn Machine', ' Popcorn Popper', ' 5.1 System', ' System', ' Soundbar', ' Speakers', ' Speaker',
];
/** Shorter product name for titles, e.g. "Klipsch Reference Theater Pack 5.1". */
export function shortName(name: string) {
  for (const s of SUFFIXES) if (name.endsWith(s) && name.length - s.length > 8) return name.slice(0, -s.length);
  return name;
}

/* Real last-modified dates (scripts/page-dates.mjs): the date shown on the page, in dateModified and in <lastmod>. */
export const productUpdated = (p: Pick<Product, 'slug'>) => git(`products/${productFile.get(p.slug)}`) ?? LAUNCH;
export const compareUpdated = () => git('compares') ?? LAUNCH;
export const glossaryUpdated = () => git('glossary') ?? LAUNCH;
export const latestDate = () => [LAUNCH, ...articles.map((a) => a.updated), ...products.map(productUpdated), compareUpdated(), glossaryUpdated()].reduce((m, d) => (d > m ? d : m), '');
