import type { APIRoute } from 'astro';
import { SITE } from '../data/site';
import { articles, products, articleUrl } from '../lib/data';

/** Markdown twin of the home page (/index.md), referenced from llms.txt. */
export const GET: APIRoute = () => {
  const live = articles.filter((a) => !a.draft);
  const roundups = live.filter((a) => a.kind === 'roundup');
  const out = [
    `# ${SITE.name}`,
    '',
    `> ${SITE.description}`,
    '',
    `Source: ${SITE.url}/`,
    '',
    '## Best lists',
    '',
    ...roundups.map((a) => `- [${a.title}](${SITE.url}${articleUrl(a)}): ${a.metaDescription}`),
    '',
    `## Top 10 of the ${products.length} products we track`,
    '',
    '| # | Product | Score | Price |',
    '|---|---|---|---|',
    ...products.slice(0, 10).map((p, i) => `| ${i + 1} | [${p.name}](${SITE.url}/gear/${p.slug}/) | ${p.score}/100 | ${p.priceBand} |`),
    '',
    '## Guides and brand reviews',
    '',
    ...live.filter((a) => a.kind !== 'roundup').map((a) => `- [${a.title}](${SITE.url}${articleUrl(a)})`),
    '',
  ];
  return new Response(out.join('\n'), { headers: { 'Content-Type': 'text/markdown; charset=utf-8' } });
};
