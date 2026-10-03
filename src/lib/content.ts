import { getCollection, type CollectionEntry } from 'astro:content';
import { site } from '../config/site';

type WithStatus = { data: { status: 'draft' | 'review' | 'published' } };
type StatusCollection = 'topics' | 'flashcards' | 'quizzes' | 'videos' | 'notes' | 'resources' | 'products' | 'news';

/**
 * Should this entry be LISTED on the site (menus, cards, index pages, sitemap, links from other pages)?
 * Drafts are listed only while `showDrafts` is on.
 * Note: every entry still gets its own page (a private preview with a Draft banner, hidden from
 * search engines) so new content can be reviewed at its address before publishing.
 */
export function isVisible(entry: WithStatus): boolean {
  return entry.data.status === 'published' || site.features.showDrafts;
}

export function isDraft(entry: WithStatus): boolean {
  return entry.data.status !== 'published';
}

/** Every entry of a collection, published or not: used to build pages, including private previews. */
export async function getAll<C extends StatusCollection>(collection: C): Promise<CollectionEntry<C>[]> {
  return (await getCollection(collection)) as CollectionEntry<C>[];
}

/** All visible entries of a collection, sorted by title. */
export async function getVisible<C extends StatusCollection>(collection: C): Promise<CollectionEntry<C>[]> {
  const entries = (await getCollection(collection)) as CollectionEntry<C>[];
  return entries
    .filter((e) => isVisible(e as unknown as WithStatus))
    .sort((a, b) => String((a.data as { title: string }).title).localeCompare((b.data as { title: string }).title));
}

/** Visible news items, newest first. */
export async function getNews() {
  const items = await getCollection('news', isVisible);
  return items.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

export async function getAreas() {
  const areas = await getCollection('areas');
  return areas.sort((a, b) => a.data.order - b.data.order);
}

export async function getTopics() {
  const topics = await getCollection('topics', isVisible);
  return topics.sort((a, b) => a.data.order - b.data.order);
}

export async function getTopicsByArea(areaId: string) {
  return (await getTopics()).filter((t) => t.data.area.id === areaId);
}

/** Topics that use a given video / deck / quiz / notes / resource (for "Used in" links). */
export async function getTopicsUsing(
  field: 'video' | 'flashcards' | 'quiz' | 'notes' | 'resources',
  id: string,
) {
  return (await getTopics()).filter((t) => {
    const value = t.data[field];
    if (Array.isArray(value)) return value.some((ref) => ref.id === id);
    return value?.id === id;
  });
}

/** Previous and next topic within the same subject area. */
export async function getPrevNext(topic: CollectionEntry<'topics'>) {
  const siblings = await getTopicsByArea(topic.data.area.id);
  const i = siblings.findIndex((t) => t.id === topic.id);
  if (i === -1) return { prev: undefined, next: undefined }; // unlisted preview
  return { prev: siblings[i - 1], next: siblings[i + 1] };
}

export const levelLabel: Record<CollectionEntry<'topics'>['data']['level'], string> = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
};

export const levelRank = { beginner: 1, intermediate: 2, advanced: 3 } as const;

export const resourceTypeLabel: Record<CollectionEntry<'resources'>['data']['type'], string> = {
  worksheet: 'Worksheet',
  'cheat-sheet': 'Cheat sheet',
  'formula-sheet': 'Formula sheet',
  'revision-sheet': 'Revision sheet',
  'practice-test': 'Practice test',
  notes: 'Notes',
};
