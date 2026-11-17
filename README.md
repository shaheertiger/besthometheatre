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
`/<slug>.md` markdown copy of each article (linked with `rel="alternate"`, like the protein site).

## Commands

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # builds to dist/ and runs the link/SEO audit (fails on broken internal links)
```

Deploy `dist/` to any static host (Cloudflare Pages, Netlify, Vercel: build command `npm run build`, output `dist`).

## Amazon affiliate links and product images

- The Associates tag lives in **`src/data/site.ts` → `amazonTag`** (`sktiger-20`). Every Amazon link uses it, with `rel="sponsored nofollow noopener"`.
- When a product has an **ASIN**, buttons link to `https://www.amazon.com/dp/<ASIN>?tag=sktiger-20` and the page shows the Amazon product photo (`m.media-amazon.com/images/I/<imageId>._SL400_.jpg`, the same hotlinking the protein site uses).
- Without an ASIN, the button falls back to a tagged Amazon **search** link for the exact model, and the image shows a clean placeholder.

There are two ways to add ASINs and photos. Both write to **`src/data/amazon-links.json`**, which overrides the catalog at build time:

1. **Paste your own Amazon links.** Map product slug → any Amazon URL or ASIN:
   ```json
   {
     "klipsch-r-120sw": "https://www.amazon.com/dp/B07FK2WNW4?tag=sktiger-20",
     "sonos-arc-ultra": "B0DGHX...",
     "epson-home-cinema-2350": { "asin": "B0B...", "imageId": "61abcXYZ" }
   }
   ```
   The `imageId` is the part after `/images/I/` in the product photo URL. With only an ASIN, the site uses Amazon's official ASIN image endpoint.
2. **Use the Product Advertising API** (requires PA-API access in Associates Central):
   ```bash
   AMAZON_ACCESS_KEY=... AMAZON_SECRET_KEY=... npm run amazon:fill
   ```
   Review the matched titles it prints before publishing.

Product slugs are listed in `docs/product-catalog.txt` and in each `src/content/products/*.json`.

## Content

See **`docs/CONTENT_GUIDE.md`** for the ranking playbook, schemas and style rules, and
`docs/keyword-map.json` for the keyword cluster each page targets (from the Semrush "best home theater"
broad-match export).
