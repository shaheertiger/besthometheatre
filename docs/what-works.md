# What works on besthometheaterreview.com (rules for every new page)

Last updated: 28 Nov 2026. Read this before choosing or writing any page. **The STOP list overrides everything,
including the daily-publish skill's priority order.**

## Why these rules (the evidence)

This site has no winners of its own yet. Bing indexed it only this week: **66 impressions, 1 click** in 30 days
(first impressions 23 Nov 2026), and Bing's query and page stats are still empty. Vercel search visitors over
30 days: **about 60 in total**. Top search landing pages:

| Page | Search visitors (30 d) |
|---|---:|
| `/best-wireless-home-theater-system/` | 3 |
| `/epson-projector-review/` | 3 |
| `/sonos-home-theater-review/` | 3 |
| `/best-bookshelf-speakers-for-home-theater/` | 2 |
| `/best-tower-speakers-for-home-theater/` | 2 |
| a few `/gear/` pages | 1 each |

That is too little to prove anything. So, as the owner instructs for a site with no winners, this site follows
**what wins on the owner's other sites** (the portfolio playbook, 27 Nov 2026: Bing Webmaster API and Vercel search
landings for enthusiastreview.com, treadmillreviewsusa.com, best-proteinpowder.com and allmetalbrake.com), adapted
to home theater, plus measured Bing demand from the keyword research below.

Demand data: [`docs/keywords/bing-keyword-research-2026-11-27.md`](keywords/bing-keyword-research-2026-11-27.md)
(summary) and [`docs/keywords/bing-keywords-2026-11-27.json`](keywords/bing-keywords-2026-11-27.json) (555 on-topic
keywords, Bing impressions over 90 days, US). Refreshed weekly by the daily-publish skill (Mondays).

Replace a rule with the site's own data once a format has **14+ days and 5+ live pages** of evidence here
(see "Updating this file").

## Proven portfolio method: Honest Reviewers roundup formula (added 28 Nov 2026)

The owner's biggest site, thehonestreviewers.com, gets **about 20,000 search visitors in 30 days** (Vercel, search
referrers, 29 Oct - 28 Nov 2026) and **74,283 Bing impressions / 1,417 clicks in the week to 26 Nov** (Bing API). Its
traffic comes from "best X" buyer's guides on head terms Bing actually searches: `/best-home-generator-for-power-outages`
1,165 visitors, `/best-solar-power-bank` 872, `/best-water-filtration-system-for-home` 617, `/best-gas-water-heater`
477, plus cost pages (`/generac-generator-cost` 469). Its winners get **11.8-15.5% Bing CTR**. For comparison, this
site had ~60 search visitors and 89 Bing impressions in the same 30 days. So every roundup here now follows that formula:

- **Title:** `<N> Best <Bing head term> in 2026: <hook>`, 50-62 characters. The head term is the variant Bing
  searches ("best soundbars 2026" 625 and "best sound bars 2026" 865 impressions; "best surround sound systems 2026"
  361; "projector screen" 2,825), **not** the low-demand "... for home theater" form. The hook is the buyer's real
  deciding factor ("Which to Buy, Which to Skip", "Sized to Your Room, Not Hype", "Real Channels, Honest Watts").
  Never "Tested" (no testing claims here).
- **H1:** `The <N> Best <head term> in 2026`. The H1 is also the anchor text on every hub, card and sitemap link.
- **Description:** opens with the pick count and the one thing buyers get wrong (channels not watts, room size not
  wattage, gain not size), then the named top picks. Facts only from the page.
- **Order:** H1 → shortlist → TOC → Short Answer + picks table → **the full pick list** → specs → how we ranked →
  explainers. The winner puts the list first; `src/pages/[slug].astro` now renders that order for every roundup.
- **Slugs stay put** (no redirects); only the snippet, H1 and order change.

Applied 28 Nov 2026 to 26 roundups (not the 3 rewritten on 27 Nov, still in their 7-day window:
best-wireless-home-theater-system, best-bookshelf-speakers-for-home-theater, best-tower-speakers-for-home-theater).
Check on 12 Dec 2026: Bing CTR and Vercel search visitors per roundup against the 28 Nov baseline (89 impressions,
1 click, ~60 visitors in 30 days).

New roundups follow the same formula, and only on a head term with Bing demand (`docs/keywords/` or
`GetKeywordStats`). A size, budget or brand variant of an existing guide goes in that guide as an H2, not a new page
(the Honest Reviewers lesson: 109 of 131 variant pages got zero Bing impressions).

## Formats that win (write these)

| Format | Portfolio proof | Home theater version | Template |
|---|---|---|---|
| **Cost question** | Treadmill cost page: #1 page, pos 2.2, 12% CTR; cost pages 5x site average | "how much does a home theater cost" (live), "how much does a <Sonos/Bose/Samsung> soundbar setup cost", "cost to install a home theater", "how much does a soundbar cost" | Price range in sentence 1, table by build/tier, what drives price, hidden costs, FAQ. Prices only from our `priceBand` data. |
| **Reference charts** | Enthusiast equivalents ~9.7 visitors/page (top type); treadmill speed and incline charts | Projector throw distance chart, screen size dimensions (100/120/125-inch), TV size vs viewing distance, Dolby Atmos layout (5.1 vs 7.1 vs 5.1.2 vs 7.1.4; what "9.2" means), receiver power vs speaker impedance, soundbar size per TV size, speaker wire gauge chart, subwoofer placement | Chart first, one H2 per row family answering "what is X", reverse lookup table, formula shown. |
| **Brand how-to / troubleshooting** | Enthusiast BIOS/RGB how-tos ~6/page; ProForm troubleshooting 59 visitors | Sonos/Bose/Samsung/Vizio soundbar not working, how to connect <brand> soundbar to TV, HDMI ARC/eARC no sound, how to connect a projector to a laptop/PC (31k impr), Epson projector setup/troubleshooting | "<Brand> <task/problem>": numbered steps, symptom → cause → fix table, brand setting names, when to call support. No year in the title. |
| **Brand trust "is <brand> good"** | Protein "is Elevation good"; allmetalbrake "is Tekton a good brand" | Is Polk / Klipsch / Bose / Denon / Vizio / Monoprice / Dayton / SVS good | Yes/no in sentence 1, our scores vs category average, ownership, where it falls short, vs main rival. |
| **Store guides** | Protein store guides ~2.4/page, best per-page type | Costco / Walmart (onn) / Best Buy home theater and soundbars | What the store stocks (cite its own pages), return/warranty terms from the store's policy page, best pick per need. |
| **Deals in season** | Treadmill Black Friday pages 5-6x average | Cyber Monday / Black Friday soundbar and home theater (Sonos 806, Bose 297 impr) | Dated; price targets from our `priceBand`, never live sale prices; "check current price"; retire (noindex or redirect) after the season. |
| **Attribute roundups** | Treadmill incline/no-subscription 1.4x | Only when the attribute is a real Bing query: short throw, mini/portable projector, wireless (4.6k impr) | One pick per need. |
| **Budget brand pages** | Treadmill LifeSmart/WellFit beat premium | onn, Vizio, Monoprice, Dayton, Micca, Sony budget | Cheap brands people ask about. |

## Double-down list (next pages, in order)

Written 27 Nov 2026 (do not repeat): projector throw distance chart, TV size viewing distance chart, Dolby Atmos
explained + layout chart, how to connect a projector to a laptop, projector screen size chart, is Polk Audio good,
soundbar no sound (ARC/eARC), Cyber Monday soundbar deals. Already live: how much does a home theater cost.

Next, biggest measured demand first:

1. **Brand trust:** is Klipsch good (4.8k), is Bose worth it (6.7k bose speakers), is Denon a good receiver brand (3.6k), is Sonos worth it (4.0k), is Vizio soundbar good (1.6k), is SVS good (1.5k), onn soundbar (Walmart).
2. **Troubleshooting / how-to:** Bose soundbar not working, Samsung soundbar no sound, Vizio soundbar not working, how to connect a Sonos Arc to a TV, how to reset a Sonos soundbar, Epson projector setup and troubleshooting, HDMI port not working.
3. **Charts:** soundbar size chart (what size soundbar for a 55/65/75-inch TV), receiver power vs speaker impedance, speaker wire gauge chart, acoustic panel placement, subwoofer placement.
4. **Cost:** how much does a soundbar cost, how much does a Sonos surround system cost, cost to install a home theater (only with a citable source for labour rates).
5. **Store guides:** Costco home theater and soundbars (cite costco.com return/warranty pages), Walmart onn, Best Buy.
6. **Deals:** Sonos and Bose Black Friday / Cyber Monday (seasonal; retire after December).

## STOP (do not write, whatever the data step suggests)

- **No combinatorial "best X for Y" floods** (enthusiast "best GPU for <CPU>": 31 pages, 2 visitors; protein's
  1,800 templated pages tanked Google). An attribute roundup needs the exact attribute in Bing queries.
- **No guessed vs pages.** A `/compare/a-vs-b/` page only when that exact pair appears in Bing queries.
- **No broad "best <category>" pages** without a narrow angle; the site already has its head-term roundups. Improve those
  with the Honest Reviewers formula above instead of adding near-duplicates.
- **No premium single-model pages** without a search for that model.
- **No testing claims.** Never write "we tested", "hands-on", "in our lab", "we measured", "we listened" unless the
  product JSON has a real `tested` record (none do as of 27 Nov 2026). Write "on paper", "the spec sheet says",
  "owners report". `scripts/qa-content.mjs` flags the common phrases.
- **No invented prices or facts.** Prices come only from `priceBand` in our product data, never a live sale price.
  Store, warranty and policy facts only from the store's or maker's own page. If unsure, leave it out.
- **No off-topic pages** (allmetalbrake mowers/flooring: 0 visitors). Ignore keyword noise: Polk County, Yamaha
  motorcycles, laptop/phone screen sizes, app/login queries.
- **No more than ~10 new indexable URLs a day.**

## Snippet rules (CTR), every page

- **Title:** the exact searched phrase first, then a concrete promise or number; 50-62 characters. A year only on
  buying guides, brand pages, cost and deals, never on how-tos and fixes.
- **Description:** 140-158 characters; the answer itself with a specific number or name in the first clause
  (`npm run audit:seo` checks for a digit before the first `.`, `:` or `;`).
- **H1 matches the query; the first paragraph and the "<H1>: The Short Answer" box answer it.**
- **Rewrite before expanding:** a page with impressions and CTR under 2% gets a title/description rewrite (max 2 per
  daily run, then wait 7 days) before new siblings are written.

## Process rules

- Every run starts from today's Bing API (`apikey`) and Vercel numbers (`.claude/skills/daily-publish/SKILL.md`).
- Every new page links its **pillar plus 2+ siblings** (in `related` and in the body), and the pillar and siblings
  get a reciprocal link back.
- Gates before push: `npm run build` (includes the link check), `npm run check:links`, `node scripts/qa-content.mjs`,
  `npm run audit:seo` (no new rows in the failure lists).
- Log every run in `docs/daily-log.md`.

## Updating this file

A format is **proven** on this site after **14 days and 5+ live pages** of that format. Then compare its
search visitors per page (Vercel) and CTR (Bing) with the site average:

- At or above average: mark it proven here with the numbers and keep writing it.
- Clearly below average (under half) with impressions: move it to STOP with the numbers.
- No impressions yet: leave the playbook rule in place and check again in 7 days.

Write the date and the numbers next to every change.

## Change log

| Date | Change |
|---|---|
| 2026-11-27 | Created from the portfolio playbook, the site's first Vercel/Bing numbers and the Bing keyword research. |
| 2026-11-28 | Added the Honest Reviewers roundup formula (Bing head-term titles, count + year H1, list-first order) from its Vercel and Bing numbers; applied to 26 roundups. |
