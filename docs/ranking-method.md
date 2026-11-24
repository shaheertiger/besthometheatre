# besthometheaterreview.com: the method to rank on Bing and Google

This site uses the same structure, templates and on-page rules as its sister site
[enthusiastreview.com](https://www.enthusiastreview.com), whose `docs/ranking-method.md` holds the evidence
behind them (Search Console and Bing data from besthometheaterreview.com, best-proteinpowder.com and
enthusiastreview.com, Nov 2026). Bing's index also feeds DuckDuckGo, Yahoo, Ecosia and Copilot, which drove
about 90% of search visits on enthusiastreview.com, so every rule below is written for Bing first.

## 1. What the sister-site evidence says

1. **Specific pages rank first.** Comparisons (`/compare/a-vs-b/`), brand reviews, brand hubs and model pages
   reach page 1–2 within weeks; broad `/best-x/` guides take longer.
2. **Exact model searches win.** Every product has its own `/gear/<model>/` page with the model in the H1 and title.
3. **Long-tail guides win before head terms.** Narrow lists ("best X for Y") rank before "best X".
4. **Comparison H2s that state the answer** ("Price: the A costs about $40 less (27% cheaper)") earn the clicks.
5. **Rich results:** a full Product + Review for every product shown on a page brings Product and Review snippets.
6. **Glossary and tools are support pages**: they feed internal links and definitional searches.

## 2. Site structure

| Path | Page | Template |
|---|---|---|
| `/<slug>/` | Buyer's guides, brand reviews and guides at the root | `src/pages/[slug].astro` |
| `/gear/<slug>/` | One page per product: specs, BHTR Score, verdict, alternatives, compare links, FAQ, Featured in | `src/pages/gear/[slug].astro` |
| `/compare/<a>-vs-<b>/` | Head-to-heads with answer-first difference H2s | `src/pages/compare/[slug].astro` |
| `/brands/`, `/brands/<brand>/` | Brand hubs | `src/pages/brands/` |
| `/glossary/<term>/` | Spec-sheet terms, "<term>: The Short Answer" first | `src/pages/glossary/` |
| `/tools/…` | Calculators (WebApplication schema) | `src/pages/tools/` |
| `/best-of/`, `/gear/`, `/compare/`, `/guides/`, `/reviews/` | Hubs | |

Buyer's guide skeleton (the enthusiastreview.com order; Bing's Short Answer first):

```
H1 (the search) · dek · byline (author, real git date, read time) · research disclosure
Lede · Shortlist (numbered picks, award, best for, score, price)   ← not a heading
On this page                                                        ← not a heading
H2 1. <H1>: The Short Answer      quick answer + picks table (best for / skip it if / score / price)
H2 2. How We Ranked These …       criteria; scores are research scores, not lab results
H2 n. Topic sections written before the picks
H2 n. <H1>: Our N Picks           one card per pick: key specs, skip it if, buy button, write-up, pros/cons
H2 n. Spec Sheets Side by Side
H2 n. Topic sections, mostly the questions people type
H2 Common Mistakes to Avoid · The Bottom Line · Frequently Asked Questions (FAQPage)
H2 Sources and Recent Updates · All <category> We Track · Head-to-Head Comparisons · Related Guides
```

The number is part of the rendered H2 ("1. Best X: The Short Answer"), matching the On this page list.
Guides without picks use the article skeleton: Short Answer → lede → On this page → sections (numbered
"How to…" lists become steps) → mistakes → bottom line → FAQ → sources → products mentioned → related.

## 3. On-page rules (checked by `npm run audit:seo`)

- **Titles lead with the search, 50–62 characters.** `(2026)` only on buyer's guides, brand pages and
  comparisons, never on how-tos. The site name is appended only when the title still fits in 65 (`Base.astro`).
- **Product titles:** `<Model> Review: Specs, Score & Verdict`, padded with the category noun when short, plus
  ` (NN/100)` when it still fits in 65. Descriptions: `<Model> at a glance:` three specs, then the summary.
- **Descriptions 140–158 characters, answer and a number first** ("Of 8 pacifier clips, the … is best").
- **First H2 is "<search>: The Short Answer"** on guides, comparisons and glossary terms. One H1 per page.
- **Comparison H2s state the answer**, built from the data: price gap in dollars and percent, score gap, then
  each spec that differs.
- **Real dates.** `scripts/page-dates.mjs` stamps each article, product file, `compares.ts` and `glossary.ts`
  with the date of the last commit that changed it; the byline, `dateModified`, the Review `datePublished` and
  the sitemap `<lastmod>` all use it. Put `Page-Dates: skip` in the commit message of mechanical edits
  (template migrations, meta titles) so they don't stamp every page as updated.
- **One URL per search.** Two indexable pages must not share a title.
- **Schema:** Organization + WebSite on every page; Article (headline = title, image, keywords, articleSection)
  + BreadcrumbList + ItemList of full Product + Review nodes (rating out of 100, pros/cons, ASIN as `sku`) +
  FAQPage on guides; Product + Review + FAQPage on product pages; Article + 2-Product ItemList + FAQPage on
  comparisons; DefinedTerm on glossary pages; WebApplication on tools; ProfilePage on the author page.
- **Bing Webmaster Tools:** set `bingSiteVerification` in `src/data/site.ts` (or the
  `PUBLIC_BING_SITE_VERIFICATION` env var) to emit `msvalidate.01`, or verify by DNS.

## 4. Build pipeline (`npm run build`)

1. `scripts/page-dates.mjs` → `src/data/git-dates.json` (real last-commit dates; unshallows Vercel's clone).
2. `astro build`.
3. `scripts/build-sitemap.mjs` → one `dist/sitemap.xml` with every indexable page (noindex pages left out),
   real `<lastmod>` and product photos as `<image:image>`. Old `/sitemap-index.xml` and `/sitemap-*.xml` URLs
   301 to it (`vercel.json`).
4. `scripts/check-build.mjs` → broken internal links, JSON-LD validity.
5. `scripts/build-markdown.mjs` → a Markdown twin of every page (`/best-x/` → `/best-x.md`, `/` → `/index.md`),
   `llms.txt`, `llms-full.txt`, `ai.txt`, `sitemap.md` and `md-catalog.json`, converted from the built HTML.
6. `scripts/indexnow-submit.mjs --postbuild` → on a Vercel production build, submits every URL in
   `dist/sitemap.xml` to IndexNow (Bing, Yandex, Seznam, Naver). The key file is `public/02e52e4ff57642149b896959813aefcc.txt`.
   Run `npm run indexnow` to resubmit the live sitemap by hand.
7. `npm run bing:submit` (by hand, with `BING_WEBMASTER_API_KEY` set) → the Bing Webmaster API `SubmitUrlBatch`,
   up to the site's daily quota, best lists and comparisons first. `-- --quota` shows the quota.

`middleware.js` (Vercel Routing Middleware, `@dualmark/core`) serves the Markdown twins: `/x.md`, any page with
`Accept: text/markdown`, known AI bots (unless they prefer HTML), `/api/md/<path>` and `/api/md/_catalog`. HTML
responses get `Vary: Accept` and a `Link` header pointing at the Markdown twin and llms.txt. Every page also has
`<link rel="alternate" type="text/markdown">`, and `robots.txt` points to llms.txt and ai.txt.

## 5. What to do next (in order)

1. **Submit** `https://www.besthometheaterreview.com/sitemap.xml` in Bing Webmaster Tools and Search Console.
2. **Question H2s.** `audit:seo` reports the share of topic H2s phrased as the questions people type; the sister
   sites aim for most of them. Reword section headings into questions as pages are updated.
3. **More comparisons** — the best-ranking page type. Sibling pairs inside one brand and upgrade pairs first.
4. **More long-tail guides** ("best X for Y") before head terms.
5. **Review at 4 weeks.** Position 5–20 with impressions → add answered questions and internal links.
   Page 1 with CTR under 2% → rewrite the title and description.

Check the site against these rules at any time: `npm run build && npm run audit:seo`.
