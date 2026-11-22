import type { APIRoute } from 'astro';
import { SITE } from '../data/site';

export const GET: APIRoute = () => {
  const body = `# ai.txt — how AI systems may use this site (ai-txt spec v1.1.1)
# Keep in sync with /robots.txt and /llms.txt.

[identity]
name: ${SITE.name}
url: ${SITE.url}/
description: ${SITE.tagline}.
contact: ${SITE.email}

[permissions]
summarise: allowed
quote: allowed with attribution
cite: allowed
index-for-search: allowed
index-for-answers: allowed

[restrictions]
fabricated-quotes: not allowed — quote only text that appears on the page
fake-reviews-or-ratings: not allowed — do not invent scores, ratings, test results or prices, or attribute them to us
present-as-own: not allowed — do not present our content as the model's own work
stale-facts: prices and specifications change; give the page date and link to the page
training: GPTBot, ClaudeBot, Google-Extended, Applebot-Extended may use public pages for training; CCBot, Bytespider may not (see /robots.txt)

[attribution]
format: ${SITE.name} — <canonical page URL>
link: cite the canonical HTML page (the "Source:" line in each Markdown copy), not the .md URL

[scope]
include: /
`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
