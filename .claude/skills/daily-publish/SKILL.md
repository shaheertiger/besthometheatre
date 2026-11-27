---
name: daily-publish
description: Daily publishing run for besthometheaterreview.com. Pull Bing Webmaster API and Vercel Analytics data, read docs/what-works.md, pick 5 pages (snippet rewrites, Bing queries with no page, then the double-down list), write and link them, run the gates, log, push, open a PR into main and merge it once gates pass. Use when asked to "run the daily publish", "write today's pages", or by the daily scheduled task.
---

# Daily publish: data first, then 5 pages

Bing's index serves Bing, DuckDuckGo, Yahoo and Ecosia, the search engines that send this site its visitors.
Every run starts from **today's** Bing and Vercel numbers. If a data pull fails, say so in the log and the PR and
fall back to the double-down list in `docs/what-works.md`; never invent demand.

## 1. Branch from main

The live site deploys from `main` (not the repository's default branch).

```bash
git fetch origin main
git checkout -B claude/daily-publish-$(date -u +%F) FETCH_HEAD
npm ci
```

## 2. Bing Webmaster API

```bash
node scripts/search-report.mjs --days 30 --json /tmp/bing-$(date -u +%F).json
node scripts/search-report.mjs --days 7
```

- Key: environment variable `apikey` (or `BING_WEBMASTER_API_KEY`). It goes only in the request URL. **Never print
  it, echo it, write it to a file or commit it**; do not paste request URLs into logs or PRs.
- Site: `https://besthometheaterreview.com/` (Bing verifies the bare domain).
- Calls `GetQueryStats`, `GetPageStats` and `GetRankAndTrafficStats`, and prints daily totals, top queries, top
  pages, **pages with impressions and CTR under 2%** (snippet rewrites) and **on-topic queries with no matching
  page** (new-page candidates).

### Mondays: refresh the keyword research

Once a week (Monday runs), refresh `docs/keywords/`:

1. For each topic and brand seed in the latest `docs/keywords/bing-keyword-research-*.md` (home theater, soundbar,
   projector, projector screen size, receiver, subwoofer, dolby atmos speaker placement, earc, soundbar not working,
   Sonos, Bose, Polk, Klipsch, Denon, Yamaha, Samsung soundbar, Vizio soundbar, Epson projector, SVS, onn, deals …),
   call the Bing Webmaster API `GetRelatedKeywords` (and `GetKeyword` for exact checks of planned page queries) with
   `country=us`, `language=en-US` and a `startDate`/`endDate` window covering the **last 90 days**.
2. Filter to on-topic queries. Drop noise: Polk County / Polk State, Yamaha motorcycles and outboards, laptop,
   phone and monitor "screen size" queries, app / login / download / Windows-search queries.
3. Save `docs/keywords/bing-keywords-YYYY-MM-DD.json` (query, impressions, broad impressions, seeds, format) and
   `docs/keywords/bing-keyword-research-YYYY-MM-DD.md` (top demand table mapped to winning formats, exact checks,
   noise ignored). Keep older files; reference the new one in `docs/what-works.md`.

A 0 from Bing's keyword tool means "below reporting", not "no demand".

## 3. Vercel Analytics

Vercel MCP, project `prj_y4OPFlWSx5fYjeLXrSq5WqAtXCfG`, team `team_pAoikpyeUpvHszE2JvWQKq7c`:

- `aggregate_pageviews` grouped by `["referrerHostname"]`, last **30** and last **7** days: the search-engine mix.
- `aggregate_pageviews` grouped by `["requestPath"]`, filtered to search referrers
  (`referrerHostname in ('duckduckgo.com','bing.com','www.bing.com','search.yahoo.com','yahoo.com','ecosia.org','www.ecosia.org','search.brave.com','google.com','www.google.com')`),
  limit 60, last **30** and last **7** days: the search landing pages.

The winners tell you which **format** to copy. Record the totals for the log.

## 4. Read `docs/what-works.md` (STOP rules override)

Read it in full before picking. Its STOP list overrides this skill: no combinatorial "best X for Y" floods, no
guessed vs pages, no broad "best <category>" pages, no testing claims, no invented prices, no off-topic pages.

## 5. Pick 5 pages

Skip any slug that already exists in `src/content/articles/` (or pair in `src/data/compares.ts`). In order:

1. **Up to 2 CTR rewrites:** pages from the "CTR under 2%" list (most impressions first) whose title or
   description is not already query-first and answer-first. Rewrite to the snippet rules; do not touch a page
   rewritten in the last 7 days (check `docs/daily-log.md`).
2. **Bing queries with no page**, most impressions first, but only in a winning format from `docs/what-works.md`
   (cost, reference chart, brand how-to/troubleshooting, brand trust, store guide, seasonal deal, a real attribute).
3. **The double-down list** in `docs/what-works.md`, top to bottom, favouring the biggest demand in
   `docs/keywords/`.

Write the 5 picks and the numbers behind each into the PR description.

## 6. Write, link, run the gates

Follow `docs/CONTENT_GUIDE.md` and `docs/ranking-method.md`; copy the closest existing page:

| Format | Model page |
|---|---|
| Cost | `src/content/articles/how-much-does-a-home-theater-cost.json` |
| Reference chart | `src/content/articles/projector-throw-distance-chart.json` |
| How-to / troubleshooting | `src/content/articles/soundbar-no-sound-hdmi-arc-earc.json` |
| Brand trust | `src/content/articles/is-polk-audio-good.json` |
| Seasonal deals | `src/content/articles/cyber-monday-soundbar-deals.json` |
| Roundup | `src/content/articles/best-wireless-home-theater-system.json` |

Rules: `kind: "guide"`, `hub: "guides"` for non-roundups; title 50-62 characters, query first; description 140-158
characters with the answer and a number in the first clause; facts only from manufacturer specs, Dolby/THX/SMPTE
guidance, the store's own policy pages or our product JSON (`priceBand` for prices); never claim hands-on testing.
Only link product slugs in `src/content/products/`, existing article slugs, glossary terms and tools.

Linking: every new page links its **pillar plus 2 siblings** (in `related` and in the body); add a reciprocal
link sentence to the pillar and the siblings. Add the slug and its target queries to `docs/keyword-map.json`.

Gates (fix every failure you caused):

```bash
node scripts/qa-content.mjs   # banned phrases, unknown links, title/meta lengths
npm run build                 # page dates, astro build, sitemap, link check, Markdown twins
npm run check:links
npm run audit:seo             # no new rows in the failure lists
```

Spot-check one built page in `dist/`.

## 7. Log

Add a row to `docs/daily-log.md`: date, Bing impressions/clicks (last day, 7 d, 30 d), Vercel search visitors
(7 d, 30 d) and top landing pages, snippet rewrites, the pages written, gate results.

## 8. Commit, push, PR, merge

```bash
git add -A && git commit -m "Daily publish YYYY-MM-DD: 5 pages from Bing + Vercel data"
git -c push.negotiate=true push -u origin claude/daily-publish-$(date -u +%F)
```

Open a PR into `main` titled `Daily publish YYYY-MM-DD: 5 pages from Bing + Vercel data`, with the picks and
numbers, and **merge it once every gate passes**: the site owner authorised auto-merge on 27 Nov 2026. If a gate
fails and cannot be fixed, push nothing to `main`; report why.

## 9. Update `docs/what-works.md` when the data proves something

When a format here has **14+ days and 5+ live pages**, compare its search visitors per page (Vercel) and CTR
(Bing) with the site average. Promote it to proven, or move it to STOP, with the date and the numbers, as the
"Updating this file" section describes. Retire seasonal deal pages after the season.
