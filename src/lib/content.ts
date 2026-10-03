import { getCollection, type CollectionEntry } from 'astro:content';
import { site } from '../config/site';

type WithStatus = { data: { status: 'draft' | 'review' | 'published' } };
type StatusCollection = 'topics' | 'flashcards' | 'quizzes' | 'videos' | 'notes' | 'resources' | 'products';

/** Should this entry appear on the site? Drafts only appear while `showDrafts` is on. */
export function isVisible(entry: WithStatus): boolean {
  return entry.data.status === 'published' || site.features.showDrafts;
}

export function isDraft(entry: WithStatus): boolean {
  return entry.data.status !== 'published';
}

/** All visible entries of a collection, sorted by title. */
export async function getVisible<C extends StatusCollection>(collection: C): Promise<CollectionEntry<C>[]> {
  const entries = (await getCollection(collection)) as CollectionEntry<C>[];
  return entries
    .filter((e) => isVisible(e as unknown as WithStatus))
    .sort((a, b) => String((a.data as { title: string }).title).localeCompare((b.data as { title: string }).title));
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
