/**
 * Sitemap for search engines. Lists only pages that are ready:
 * published content, index pages that contain published content, and site pages.
 * Drafts never appear here, even while `showDrafts` is on.
 */
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { getAreas } from '../lib/content';
import { absoluteUrl } from '../lib/url';
import { newsletterEnabled } from '../config/site';

const published = <T extends { data: { status: string } }>(e: T) => e.data.status === 'published';

export const GET: APIRoute = async () => {
  const topics = await getCollection('topics', published);
  const areas = (await getAreas()).filter((a) => topics.some((t) => t.data.area.id === a.id));
  const pages = await getCollection('pages');

  // Sections with their own pages: /<section>/ and /<section>/<id>/
  const sections = [
    { base: 'videos', items: await getCollection('videos', published) },
    { base: 'notes', items: await getCollection('notes', published) },
    { base: 'flashcards', items: await getCollection('flashcards', published) },
    { base: 'quizzes', items: await getCollection('quizzes', published) },
    { base: 'resources', items: await getCollection('resources', published) },
  ];

  const entries: { path: string; lastmod?: Date }[] = [
    { path: '/' },
    { path: '/learn/' },
    ...(newsletterEnabled ? [{ path: '/newsletter/' }] : []),
    ...areas.map((a) => ({ path: `/learn/${a.id}/` })),
    ...topics.map((t) => ({ path: `/chemistry/${t.id}/`, lastmod: t.data.updated ?? t.data.lastReviewed })),
    ...sections.flatMap(({ base, items }) =>
      items.length ? [{ path: `/${base}/` }, ...items.map((i) => ({ path: `/${base}/${i.id}/` }))] : [],
    ),
    ...pages.map((p) => ({ path: `/${p.id}/`, lastmod: p.data.updated })),
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries
  .map(
    (e) =>
      `  <url><loc>${absoluteUrl(e.path)}</loc>${e.lastmod ? `<lastmod>${e.lastmod.toISOString().slice(0, 10)}</lastmod>` : ''}</url>`,
  )
  .join('\n')}
</urlset>
`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
