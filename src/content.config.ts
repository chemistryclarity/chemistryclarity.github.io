/**
 * Content rules ("schemas").
 * Every content file is checked against these rules when the site builds.
 * If a file breaks a rule (missing title, a link to a topic that doesn't exist,
 * a quiz answer that isn't one of the choices…), the build stops with a message
 * and the live site stays on its last good version.
 */
import { defineCollection, reference } from 'astro:content';
import { glob, file } from 'astro/loaders';
import { z } from 'astro/zod';

const level = z.enum(['beginner', 'intermediate', 'advanced']);
/** draft = work in progress · review = waiting for your check · published = live */
const status = z.enum(['draft', 'review', 'published']).default('draft');
const access = z.enum(['free', 'premium']).default('free');

/** Subject areas, e.g. "Acids & Bases". One list in areas.yaml. */
const areas = defineCollection({
  loader: file('src/content/areas/areas.yaml'),
  schema: z.object({
    title: z.string(),
    /** 3-letter tile code. Avoid real element symbols. */
    code: z.string().min(2).max(4),
    description: z.string(),
    order: z.number(),
    hue: z.enum(['teal', 'blue', 'indigo', 'violet', 'rose', 'amber', 'green', 'slate']),
  }),
});

/** One file per chemistry concept: src/content/topics/<slug>.mdx */
const topics = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/topics' }),
  schema: z.object({
    title: z.string(),
    /** The main question this page answers, e.g. "What is a mole in chemistry?" */
    question: z.string(),
    /** 1–2 sentences, used for search results and cards (aim for 120–160 characters). */
    description: z.string().max(200),
    area: reference('areas'),
    level,
    /** Position inside its area (used for previous/next links). */
    order: z.number(),
    prerequisites: z.array(reference('topics')).default([]),
    related: z.array(reference('topics')).default([]),
    video: reference('videos').optional(),
    notes: reference('notes').optional(),
    flashcards: reference('flashcards').optional(),
    quiz: reference('quizzes').optional(),
    resources: z.array(reference('resources')).default([]),
    references: z.array(reference('references')).default([]),
    /** Optional curriculum tags for later (e.g. ['ap', 'ib']). Leave empty for general content. */
    curricula: z.array(z.string()).default([]),
    status,
    /** true = drafted or converted with assistance; must be reviewed by you before publishing. */
    assisted: z.boolean().default(false),
    lastReviewed: z.coerce.date().optional(),
    updated: z.coerce.date().optional(),
  }),
});

/** Flashcard decks: src/content/flashcards/<deck>.yaml */
const flashcards = defineCollection({
  loader: glob({ pattern: '**/*.{yaml,yml}', base: './src/content/flashcards' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    level,
    access,
    status,
    assisted: z.boolean().default(false),
    cards: z
      .array(
        z.object({
          /** Never change an id once published (saved progress will rely on it). */
          id: z.string(),
          front: z.string(),
          back: z.string(),
          tags: z.array(z.string()).default([]),
        }),
      )
      .min(1),
  }),
});

/** Quizzes: src/content/quizzes/<quiz>.yaml */
const quizzes = defineCollection({
  loader: glob({ pattern: '**/*.{yaml,yml}', base: './src/content/quizzes' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    level,
    access,
    status,
    assisted: z.boolean().default(false),
    questions: z
      .array(
        z
          .object({
            id: z.string(),
            prompt: z.string(),
            choices: z.array(z.string()).min(2).max(6),
            /** The correct choice, copied exactly. */
            answer: z.string(),
            explanation: z.string(),
            difficulty: z.enum(['easy', 'medium', 'hard']).default('medium'),
          })
          .refine((q) => q.choices.includes(q.answer), {
            message: 'The answer must exactly match one of the choices.',
          }),
      )
      .min(1),
  }),
});

/** Videos (hosted on YouTube, never in this repository): src/content/videos/<slug>.md */
const videos = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/videos' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    provider: z.enum(['youtube']).default('youtube'),
    /** The ID from the YouTube link (youtube.com/watch?v=THIS_PART). Leave out until uploaded. */
    videoId: z.string().optional(),
    duration: z.string().optional(), // e.g. "PT6M30S" (6 min 30 s)
    uploadDate: z.coerce.date().optional(),
    keyPoints: z.array(z.string()).default([]),
    level: level.optional(),
    status,
  }),
});

/** Lecture notes, read online + print + optional PDF: src/content/notes/<slug>.mdx */
const notes = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/notes' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    level,
    access,
    /** Optional PDF in /public/downloads/ or a GitHub Releases link. */
    pdf: z.string().optional(),
    status,
    assisted: z.boolean().default(false),
    lastReviewed: z.coerce.date().optional(),
  }),
});

/** Printables and downloads: src/content/resources/<slug>.yaml */
const resources = defineCollection({
  loader: glob({ pattern: '**/*.{yaml,yml}', base: './src/content/resources' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    type: z.enum(['worksheet', 'cheat-sheet', 'formula-sheet', 'revision-sheet', 'practice-test', 'notes']),
    level,
    access,
    /** Free resources: path in /public/downloads/ or a GitHub Releases URL. Never put premium files here. */
    file: z.string().optional(),
    /** Small preview image in /public/previews/ */
    preview: z.string().optional(),
    pages: z.number().optional(),
    /** Premium resources point to a product instead of a file. */
    product: reference('products').optional(),
    status,
  }),
});

/** Premium products (sold on an external platform later): src/content/products/<slug>.yaml */
const products = defineCollection({
  loader: glob({ pattern: '**/*.{yaml,yml}', base: './src/content/products' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    /** Shown exactly as written, e.g. "US$9". Leave empty until decided. */
    price: z.string().optional(),
    /** External checkout link (added in the monetization stage). */
    checkoutUrl: z.url().optional(),
    includes: z.array(z.string()).default([]),
    /** true = clearly labelled example, not a real product. */
    placeholder: z.boolean().default(true),
    status,
  }),
});

/** Reusable citations: one list in references.yaml, cited by id from topics. */
const references = defineCollection({
  loader: file('src/content/references/references.yaml'),
  schema: z.object({
    citation: z.string(),
    url: z.url().optional(),
  }),
});

/** Simple pages (About, Editorial Standards, Privacy…): src/content/pages/<slug>.md */
const pages = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/pages' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    /** Pages that need professional/legal review before launch. */
    needsLegalReview: z.boolean().default(false),
    updated: z.coerce.date().optional(),
  }),
});

export const collections = {
  areas,
  topics,
  flashcards,
  quizzes,
  videos,
  notes,
  resources,
  products,
  references,
  pages,
};
