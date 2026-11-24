# besthometheaterreview.com

Static Astro site for **Best Home Theater Review**, built on the same page structure as best-proteinpowder.com:

| Page type | URL pattern | Template | Data |
|---|---|---|---|
| Best-of roundups | `/best-…/` | `src/pages/[slug].astro` | `src/content/articles/*.json` (`kind: "roundup"`) |
| Brand reviews | `/<brand>-…-review/` | same | `kind: "review"` |
| Guides | `/home-theater-setup-guide/` etc. | same | `kind: "guide"` |
| Product database | `/gear/<product>/` | `src/pages/gear/[slug].astro` | `src/content/products/*.json` |
| Head-to-head | `/compare/<a>-vs-<b>/` | `src/pages/compare/[slug].astro` | `src/data/compares.ts` |
| Brands | `/brands/`, `/brands/<brand>/` | `src/pages/brands/` | derived from products |
| Tools | `/tools/…/` | `src/pages/tools/` | |
| Glossary | `/glossary/<term>/` | `src/pages/glossary/` | `src/data/glossary.ts` |
| Trust pages | `/about/`, `/how-we-test/`, `/editorial-policy/`, `/affiliate-disclosure/`, … | `src/pages/*.astro` | |

Every page ships with a canonical, OG/Twitter tags, JSON-LD (Organization, WebSite, BreadcrumbList,
Article, FAQPage, ItemList → Product + Review), XML sitemap, `robots.txt`, `llms.txt`, and a
`/<path>.md` Markdown twin of every page (linked with `rel="alternate"`).

## Build, sitemap and Bing

The structure, templates and on-page rules follow [enthusiastreview.com](https://www.enthusiastreview.com); the
method and checklist are in [`docs/ranking-method.md`](docs/ranking-method.md).

- **XML:** one `/sitemap.xml` (written after the build by `scripts/build-sitemap.mjs`) with every indexable page,
  its real `<lastmod>` and the Amazon product photos as `<image:image>`. `/sitemap-index.xml` and the old
  `/sitemap-*.xml` files 301 to it. Submit `https://www.besthometheaterreview.com/sitemap.xml` in Bing Webmaster Tools and Search Console.
- **HTML:** `/sitemap/`, linked from the footer, lists every page for visitors and crawlers.
- **Real dates:** `scripts/page-dates.mjs` reads each content file's last commit date into `src/data/git-dates.json`.
- **Markdown twins + Dualmark:** `scripts/build-markdown.mjs` writes `/<path>.md` for every page plus `llms.txt`,
  `llms-full.txt` and `ai.txt`; `middleware.js` (`@dualmark/core`) serves them to AI agents and `Accept: text/markdown`.
- **IndexNow:** every Vercel production build submits `dist/sitemap.xml` (`scripts/indexnow-submit.mjs`);
  `npm run indexnow` resubmits the live sitemap.

## Commands

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # page dates → astro build → sitemap → link check → Markdown twins → IndexNow (production only)
npm run audit:seo  # after a build: titles, descriptions, Short Answer H2, H1s, schema, inbound links
```

Deploy `dist/` to any static host (Cloudflare Pages, Netlify, Vercel: build command `npm run build`, output `dist`).

## Amazon affiliate links and product images

Same setup as best-proteinpowder.com:

- The Associates tag lives in **`src/data/site.ts` → `amazonTag`** (`sktiger-20`). Every Amazon link uses it, with `rel="sponsored nofollow noopener"`.
- **Images and ASINs come from the Amazon Creators API**, stored in `src/data/product-images.json` (slug → `m.media-amazon.com` image URL) and `src/data/product-asins.json` (slug → ASIN).
- With an ASIN, buttons link to `https://www.amazon.com/dp/<ASIN>?tag=sktiger-20` and the page shows the Amazon photo. Without one, the button falls back to a tagged Amazon **search** link for the exact model, and a placeholder replaces the photo.

### Fetch images and ASINs

```bash
cp ../proteinpowder/.env .env      # same Creators API credentials as the protein site (or fill in .env.example)
npm run images:fetch               # matches all products, writes the two JSON files
npm run images:review              # eyeball every match: our name vs Amazon's title
npm run build
```

Matching is strict: Amazon's title must contain the brand **and** the model tokens from
`docs/product-catalog.txt` (so an R-121SW can't stand in for an R-120SW). Rejected products keep their
search link. To block a wrong match, add `"slug": "reason"` to `src/data/asin-quarantine.json` and
remove the slug from the two JSON files.

### Manual overrides

`src/data/amazon-links.json` wins over everything. Map product slug → an Amazon URL, an ASIN, or
`{ "asin": "...", "image": "https://m.media-amazon.com/images/I/....jpg" }`.

## Content

See **`docs/CONTENT_GUIDE.md`** for the ranking playbook, schemas and style rules, and
`docs/keyword-map.json` for the keyword cluster each page targets (from the Semrush "best home theater"
broad-match export).
