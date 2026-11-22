import type { APIRoute } from 'astro';
import { SITE } from '../data/site';
import { articles, products, brands } from '../lib/data';
import type { Article } from '../lib/types';

/** Site guide for AI agents (llmstxt.org), in the same shape as our best-performing site. */
export const GET: APIRoute = () => {
  const live = articles.filter((a) => !a.draft);
  const list = (as: Article[]) => as.map((a) => `- [${a.title}](${SITE.url}/${a.slug}.md): ${a.metaDescription}`);
  const lines = [
    `# ${SITE.name}`,
    '',
    `> ${SITE.description} Every article is available as plain Markdown by adding \`.md\` to its URL (the home page is \`/index.md\`).`,
    '',
    `Free to read, with no account or paywall; the site earns affiliate commissions on qualifying purchases, which do not change its verdicts. ${live.length} guides, ${products.length} products and ${brands.length} brands tracked. Contact: ${SITE.email}.`,
    '',
    '## Core pages',
    '',
    `- [Home](${SITE.url}/index.md): ${SITE.description}`,
    `- [How we test and score](${SITE.url}/how-we-test/)`,
    `- [Editorial policy](${SITE.url}/editorial-policy/)`,
    `- [About](${SITE.url}/about/)`,
    `- [Affiliate disclosure](${SITE.url}/affiliate-disclosure/)`,
    '',
    '## Topic hubs',
    '',
    `- [All best lists](${SITE.url}/best-of/)`,
    `- [All guides](${SITE.url}/guides/)`,
    `- [Brand reviews](${SITE.url}/reviews/)`,
    `- [Product database](${SITE.url}/gear/)`,
    `- [Brands](${SITE.url}/brands/)`,
    `- [Head-to-head comparisons](${SITE.url}/compare/)`,
    `- [Glossary](${SITE.url}/glossary/)`,
    '',
    '## Best lists',
    '',
    ...list(live.filter((a) => a.kind === 'roundup')),
    '',
    '## Brand reviews',
    '',
    ...list(live.filter((a) => a.kind === 'review')),
    '',
    '## Guides',
    '',
    ...list(live.filter((a) => a.kind === 'guide')),
    '',
  ];
  return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
