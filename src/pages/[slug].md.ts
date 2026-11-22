import type { APIRoute } from 'astro';
import { articles, getProduct } from '../lib/data';
import { SITE } from '../data/site';
import { amazonUrl } from '../lib/amazon';
import type { Article } from '../lib/types';

/** Plain-markdown copy of each article for LLM crawlers (linked via rel="alternate" type="text/markdown"). */
export function getStaticPaths() {
  return articles.map((a) => ({ params: { slug: a.slug }, props: { article: a } }));
}

export const GET: APIRoute = ({ props }) => {
  const a = (props as { article: Article }).article;
  if (a.kind === 'guide') {
    // Same order as the HTML guide layout (GuidePage.astro).
    const g: string[] = [`# ${a.h1}`, '', `> ${a.metaDescription}`, '', `Source: ${SITE.url}/${a.slug}/ · Updated ${a.updated} · By ${SITE.author}`, ''];
    g.push(`## ${a.h1.split(':')[0].trim()}: The Short Answer`, '', a.quickAnswer ?? '', '', a.intro, '');
    a.sections.forEach((s) => g.push(`## ${s.heading}`, '', s.body, ''));
    if (a.picks?.length) {
      g.push(`## ${a.picksHeading ?? 'Our Picks'}`, '');
      a.picks.forEach((pk, i) => { const p = getProduct(pk.product); g.push(`### ${i + 1}. ${p.name} (${pk.award})`, '', pk.body, ''); });
    }
    if (a.mistakes?.length) { g.push('## Common Mistakes to Avoid', ''); a.mistakes.forEach((m) => g.push(`### ${m.title}`, '', m.body, '')); }
    g.push('## The Bottom Line', '', a.bottomLine, '');
    if (a.faqs.length) { g.push('## Frequently Asked Questions', ''); a.faqs.forEach((f) => g.push(`### ${f.q}`, '', f.a, '')); }
    return new Response(g.join('\n'), { headers: { 'Content-Type': 'text/markdown; charset=utf-8' } });
  }
  const out: string[] = [`# ${a.displayH1 ?? a.h1}`, '', `> ${a.metaDescription}`, '', `Source: ${SITE.url}/${a.slug}/ · Updated ${a.updated} · ${SITE.author}`, '', a.intro, ''];
  if (a.quickAnswer) out.push('## Quick answer', '', a.quickAnswer, '');
  const picks = a.picks ?? [];
  const method = picks.length && a.kind !== 'guide' ? a.sections.find((s) => /^How We /i.test(s.heading)) : undefined;
  const rest = a.sections.filter((s) => s !== method);
  const lead = a.kind === 'roundup' ? [] : rest.filter((s) => s.position === 'before');
  const guidance = a.kind === 'roundup' ? rest : rest.filter((s) => s.position !== 'before');
  lead.forEach((s) => out.push(`## ${s.heading}`, '', s.body, ''));
  if (picks.length > 1) {
    out.push('## Compare the picks', '', '| Pick | Best for | Skip it if | Score | Price |', '|---|---|---|---|---|');
    picks.forEach((pk) => { const p = getProduct(pk.product); out.push(`| ${pk.award}: ${p.name} | ${p.bestFor} | ${p.skipIf} | ${p.score}/100 | ${p.priceBand} |`); });
    out.push('');
  }
  if (method) out.push(`## ${method.heading}`, '', method.body, '');
  if (picks.length) {
    out.push(`## ${a.listName ? `The ${a.picks.length} Best ${a.listName}, Compared & Ranked` : (a.picksHeading ?? 'Our picks')}`, '');
    picks.forEach((pk, i) => {
      const p = getProduct(pk.product);
      out.push(`### ${i + 1}. ${p.name} (${pk.award})`, '', `Score: ${p.score}/100 · ${p.priceBand} · [Check price](${amazonUrl(p)})`, '', pk.body, '', `Skip it if: ${p.skipIf}`, '');
    });
  }
  if (a.kind === 'roundup' && a.mentions?.length) {
    out.push('## Notable mentions', '');
    a.mentions.forEach((m) => { const p = getProduct(m.product); out.push(`### ${p.name}`, '', `Score: ${p.score}/100 · ${p.priceBand}`, '', m.body, ''); });
  }
  guidance.forEach((s) => out.push(`## ${s.heading}`, '', s.body, ''));
  out.push('## The Bottom Line', '', a.bottomLine, '');
  if (a.faqs.length) { out.push('## FAQ', ''); a.faqs.forEach((f) => out.push(`### ${f.q}`, '', f.a, '')); }
  if (a.updates?.length) { out.push('## Recent updates', ''); a.updates.forEach((u) => out.push(`- ${u.date}: ${u.note}`)); out.push(''); }
  return new Response(out.join('\n'), { headers: { 'Content-Type': 'text/markdown; charset=utf-8' } });
};
