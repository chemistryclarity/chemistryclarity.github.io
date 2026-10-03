import { getCollection, type CollectionEntry } from 'astro:content';
import { site } from '../config/site';

type WithStatus = { data: { status: 'draft' | 'review' | 'published' } };

/** Should this entry appear on the site? Drafts only appear while `showDrafts` is on. */
export function isVisible(entry: WithStatus): boolean {
  return entry.data.status === 'published' || site.features.showDrafts;
}

export function isDraft(entry: WithStatus): boolean {
  return entry.data.status !== 'published';
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

export const levelLabel: Record<CollectionEntry<'topics'>['data']['level'], string> = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
};

export const levelRank = { beginner: 1, intermediate: 2, advanced: 3 } as const;
