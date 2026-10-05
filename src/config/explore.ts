/**
 * The three Explore sections (special topics). Titles and introductions shown on the
 * Explore pages and in the menu. Articles live in src/content/explore/.
 */
export const exploreSections = {
  'natural-products': {
    title: 'Natural Products',
    menuLabel: 'Natural Products & Drug Discovery',
    eyebrow: 'Stories from nature',
    intro:
      'Many of our most important medicines began as molecules made by plants, fungi and microbes. These are the stories of how chemists found them, worked out their structures and turned them into drugs.',
    hue: 'green',
  },
  'organic-mechanisms': {
    title: 'Organic Mechanisms',
    menuLabel: 'Organic Reactions & Mechanisms',
    eyebrow: 'How reactions really happen',
    intro:
      'Step-by-step guides to the organic reactions and mechanisms students find hardest, with curved arrows, the reasons behind each step, and where the reactions are used.',
    hue: 'violet',
  },
  chemists: {
    title: 'Chemist Profiles',
    menuLabel: 'Profiles of Famous Chemists',
    eyebrow: 'The people behind the chemistry',
    intro:
      'The lives and work of chemists who changed the subject: their key contributions and discoveries, and the prizes they won, all with dates.',
    hue: 'amber',
  },
} as const;

export type ExploreSection = keyof typeof exploreSections;
export const exploreSectionIds = Object.keys(exploreSections) as ExploreSection[];
