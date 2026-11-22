import type { APIRoute } from 'astro';
import { SITE } from '../data/site';

/** Same crawler groups as our best-performing site on Bing: search and answer engines in, scrapers out. */
export const GET: APIRoute = () => {
  const body = `# robots.txt for ${SITE.url.replace('https://', '')}
# Site guide for AI agents: ${SITE.url}/llms.txt
# AI usage policy: ${SITE.url}/ai.txt
# Every article also has a Markdown twin at the same path + .md

# AI search and user-requested fetches: these let answer engines cite the site.
User-agent: OAI-SearchBot
User-agent: ChatGPT-User
User-agent: Claude-SearchBot
User-agent: Claude-User
User-agent: PerplexityBot
User-agent: Perplexity-User
Allow: /

# AI training crawlers allowed on public pages.
User-agent: GPTBot
User-agent: ClaudeBot
User-agent: Google-Extended
User-agent: Applebot-Extended
Allow: /

# AI training crawlers not allowed. This does not affect citations by the search bots above.
User-agent: CCBot
User-agent: Bytespider
Disallow: /

User-agent: *
Allow: /

Sitemap: ${SITE.url}/sitemap-index.xml
`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
