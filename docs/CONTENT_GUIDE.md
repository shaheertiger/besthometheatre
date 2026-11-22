# Content guide: besthometheaterreview.com

This site copies the page structure of our sister site best-proteinpowder.com, which already gets
Google impressions, and adds what the current top results for home theater keywords
(The Master Switch, RTINGS, CNET, What Hi-Fi) all do. Every page is static Astro, rendered from JSON
in `src/content/`. Types live in `src/lib/types.ts`.

## The ranking playbook (what every page must do)

1. **One page per search intent.** Each article targets one keyword cluster from
   `docs/keyword-map.json`. Primary keyword goes in `title`, `h1`, the first sentence of `intro`, and
   one H2. Work secondary keywords and close variants in naturally (H2s, FAQ questions). No stuffing.
2. **Answer first.** `intro` (2 short paragraphs) states who the page is for and gives the top pick
   in the first 100 words. `quickAnswer` is a 2–4 sentence direct answer that can win a featured
   snippet or AI Overview citation.
3. **"Best for X" picks.** Roundups have 5–8 picks, each with a distinct `award` ("Best Overall",
   "Best Budget", "Best for Small Rooms", "Best Upgrade", "Best for Dolby Atmos"…). Each pick's
   `body` is 150–260 words: why it wins, who it suits, the one trade-off that matters, how it compares to
   the pick above or below. Use concrete numbers from the spec sheet.
4. **Show the maths.** Our angle ("built on the spec sheet") is like the protein site's "built on the
   label": lumens per dollar, throw distance for a real room, watts per channel *at the stated test
   conditions*, how many height channels the receiver can actually power, subwoofer driver size vs room
   volume. Do the calculation in the text.
5. **Page order (Master Google SEO Format + RTINGS).** The template builds this order automatically from
   the JSON, numbering the H2s. It follows the structure of the best-performing RTINGS roundups
   (intro → "How We Test" → picks by price tier and use → Notable Mentions → Recent Updates → All Reviews):
   - Title, H1, author, published + updated dates, `intro` (the immediate recommendation)
   - Shortlist [auto from `picks`: award, product, `bestFor`, score, price band]
   - `quickAnswer`
   - (reviews and guides only) `position: "before"` sections, e.g. "The Short Verdict"
   - **Compare the Picks at a Glance** [auto: best for, skip it if, score, price band]
   - **Evaluation method**: the section whose heading starts with "How We …" is lifted out and shown
     before the picks with a count of models we track. Every roundup and review needs one.
   - The picks [auto `PickBlock`: specs, `skipIf`, `body`, pros/cons]
   - Spec Sheets Side by Side [auto from `comparisonSpecs`]
   - **Notable Mentions** (roundups): `mentions` [{`product`, `body`}], 2–3 unpicked models that fit the
     page's intent. Each body (40–80 words) compares the model to one named, linked pick and says who
     should choose it instead. Omit the key if every relevant product is already a pick.
   - Buying-guide sections (on roundups, `before` sections also move here, after the picks):
     what to look for, PAA questions, budget tiers, setup, who should buy / skip
   - [Common mistakes: `mistakes`, 4–5 items]
   - The Bottom Line: `bottomLine`, 1 paragraph that names the picks again
   - [FAQ: `faqs`, 6–8 items: real PAA-style questions, 40–90 word answers that start with the answer]
   - **Sources and Recent Updates**: `updates` [{`date`, `note`}], newest first. Log only substantive
     changes (a pick replaced, added or removed; a section added) and bump `updated` when you do.
     The sources list is generated.
   - All <Category> We Track (roundups) [auto: every model in the main category, ranked by score]
   - [Related guides: `related`, 3 article slugs], More in hub
6. **Internal links.** Link generously in markdown bodies: to other articles (`/best-home-theater-receiver/`),
   product pages (`/gear/<product-slug>/`), brand pages (`/brands/<brand-slug>/`), tools
   (`/tools/projector-throw-calculator/`, `/tools/viewing-distance-calculator/`) and glossary terms
   (`/glossary/dolby-atmos/`, `/glossary/earc/`, `/glossary/throw-ratio/`, `/glossary/ansi-lumens/`,
   `/glossary/room-correction/`, `/glossary/crossover/`, `/glossary/speaker-sensitivity/`,
   `/glossary/impedance/`, `/glossary/alr-screen/`, `/glossary/hdr/`, `/glossary/pixel-shifting/`,
   `/glossary/lfe/`, `/glossary/hdmi-2-1/`, `/glossary/dts-x/`). Only link to article slugs listed in
   `docs/keyword-map.json`, product slugs in `docs/product-catalog.txt`, and those glossary/tool URLs.
7. **Honesty = E-E-A-T.** Articles are by **Justin Lee** (`AUTHOR` in `src/data/site.ts`, page at
   `/authors/justin-lee/`). We have our own lab in Mississauga, Ontario (`LAB`). A product counts as
   tested **only** when its product JSON has a `tested` record (`date`, `method`, `results`, optional
   `notes`) with real measurements from the lab. Those products get a "Lab tested" badge and a Lab
   Results section automatically, and the article sources list them.
   - For a product with a `tested` record you may write "we tested", "in our lab", "we measured", citing
     the recorded results.
   - For every other product, never write "we tested", "in our testing", "we measured" or "our lab
     results". Write "on paper", "the spec sheet says", "owners report", "independent measurements show"
     (only where widely documented), "we'd pick". Never invent figures; if unsure of a spec, leave it out.
8. **No prices.** Use `priceBand` ("$400–$500" street-price ranges) only. Never quote an exact price
   or a sale. Prices change and Amazon's rules forbid stale prices.
9. **Dates.** `published` and `updated`: "2026-11-17". Write for late 2026 and mention newer models only if
   you are confident they exist.
10. **Style.** Plain US English, short paragraphs (2–4 sentences), second person, confident, specific.
    No fluff ("In today's world…", "Look no further", "elevate your experience", "immersive journey"),
    no emojis in text. Use markdown: **bold** key facts, bullet lists, occasional tables.

## Product JSON (`src/content/products/<category>.json`, an array)

```json
{
  "slug": "klipsch-r-120sw",
  "name": "Klipsch R-120SW",
  "brand": "Klipsch",
  "category": "subwoofer",
  "amazonQuery": "Klipsch R-120SW 12 inch subwoofer",
  "released": "2018",
  "priceBand": "$300–$400",
  "priceTier": 2,
  "score": 78,
  "scores": [{"label": "Output for the money", "value": 84}, {"label": "Low-frequency extension", "value": 70}, {"label": "Build & features", "value": 74}, {"label": "Ease of setup", "value": 82}],
  "summary": "A 12-inch front-firing sub with plenty of output for medium rooms at a budget price, but it rolls off earlier than sealed or ported rivals from SVS.",
  "verdict": "Two to three short paragraphs of markdown...",
  "bestFor": "Medium living rooms on a budget",
  "skipIf": "You want deep, tight bass below 30 Hz for movies",
  "pros": ["...", "...", "..."],
  "cons": ["...", "..."],
  "specs": {"Driver": "12-inch copper-spun", "Amplifier": "200 W RMS / 400 W peak", "Frequency response": "29–120 Hz ±3 dB", "Enclosure": "Front-firing, ported", "Inputs": "LFE RCA, line-level", "Dimensions": "...", "Weight": "..."},
  "keySpecs": ["Driver", "Amplifier", "Frequency response", "Enclosure"],
  "faqs": [{"q": "Is the Klipsch R-120SW good for movies?", "a": "..."}]
}
```

- `category` must be one of the keys in `CATEGORY_LABELS` (`src/data/site.ts`).
- `slug`, `name`, `brand`, `category` and `amazonQuery` come from `docs/product-catalog.txt` (the last column is the query).
- `score` is 0–100 and must be defensible against the other products in the category. Scores of 90+ are rare.
- `specs`: 6–10 entries with consistent keys across a category so comparison tables line up.
  Use these standard keys per category where relevant:
  - projector: `Resolution`, `Brightness`, `Light source`, `Throw ratio`, `HDR`, `Contrast`, `Input lag`, `Smart platform`, `Speakers`
  - screen: `Size`, `Aspect ratio`, `Gain`, `Material`, `Type`, `ALR`, `Frame`
  - receiver: `Channels`, `Power (rated)`, `HDMI inputs`, `8K/4K120 HDMI`, `Room correction`, `Atmos/DTS:X`, `Streaming`, `Pre-outs`
  - amplifier: `Channels`, `Power (rated)`, `Class`, `Inputs`, `Dimensions`, `Weight`
  - subwoofer: `Driver`, `Amplifier`, `Frequency response`, `Enclosure`, `Inputs`, `App/EQ`, `Dimensions`, `Weight`
  - system / soundbar: `Channels`, `Atmos/DTS:X`, `Subwoofer`, `Surrounds`, `Inputs`, `Room correction`, `Streaming`, `Wireless`
  - speakers (bookshelf/tower/center/atmos-speaker/in-wall/high-end/wireless-speaker): `Type`, `Drivers`, `Frequency response`, `Sensitivity`, `Impedance`, `Recommended power`, `Dimensions`
  - tv: `Panel`, `Sizes`, `Refresh rate`, `HDR`, `HDMI 2.1 ports`, `eARC`, `Smart platform`, `Peak brightness`
  - seating: `Type`, `Seats`, `Upholstery`, `Recline`, `Features`, `Dimensions`
  - remote: `Devices`, `Control`, `Hub`, `App`, `Voice`, `Battery`
  - cable: `Gauge`, `Conductor`, `Length`, `Jacket`, `In-wall rated`
  - power: `Outlets`, `Joule rating`, `Clamping voltage`, `Filtering`, `Coax/Ethernet protection`, `Warranty`
  - popcorn: `Type`, `Kettle size`, `Output`, `Power`, `Dimensions`
- `faqs`: 2–4 product-specific questions.

## Article JSON (`src/content/articles/<slug>.json`)

Fields: `slug`, `kind` ("roundup" | "review" | "guide"), `title` (≤ 65 chars, primary keyword first,
add a specific hook, e.g. "Best Home Theater Receiver (2026): 7 AVRs Matched to Your Speakers"),
`metaDescription` (140–158 chars, includes the keyword and a concrete promise), `h1` (short, e.g.
"Best Home Theater Receiver"), `keyword`, `keywords` (6–10 secondary terms), `hub` (category key,
or "guides", or "brands" for brand reviews), `published`, `updated`, `intro`, `quickAnswer`,
`picksHeading` (optional), `picks` [{`product`, `award`, `body`, optional `pros`/`cons` overrides}],
`sections` [{`heading`, `body`, optional `position`: "before"}], `comparisonSpecs` (3–5 spec keys
that exist on the picked products), `mistakes` [{`title`, `body`}], `faqs` [{`q`, `a`}], `related`
(3 article slugs), `bottomLine`, `updates` (dated revision notes), `mentions` (roundups), and `brand` (brand reviews only; must exactly equal the `brand` field of products).

Headings must NOT include numbers; the template adds them. Do not repeat the keyword in every heading.

### Brand reviews (`kind: "review"`, `hub: "brands"`)
Follow the protein site's review structure: sections "The Short Verdict" (before), "Who <Brand> Is"
(before), picks = the brand's lineup (4–6 of its products, award like "Best Bose for Most Rooms"),
then "What <Brand> Does Well", "Where <Brand> Falls Short", "<Brand> vs <main rivals>",
"Who Should Skip <Brand>", mistakes, FAQ, related, bottom line.

### Guides (`kind: "guide"`, `hub: "guides"`)
Same template, usually without picks (or with 3–5 picks if the guide naturally recommends gear).
1,800–3,000 words across 7–10 sections.

## Length targets
Roundups 3,000–4,500 words in total. Brand reviews 2,500–3,500. Product verdicts 150–300 words.
