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

/**
 * The online editor (/admin) may save an empty optional field as '' or null.
 * Treat those as "not set", so a blank box never breaks the build.
 */
const isBlank = (v: unknown) => v === '' || v === null;
const blank = <T extends z.ZodType>(schema: T) => z.preprocess((v) => (isBlank(v) ? undefined : v), schema.optional());
const list = <T extends z.ZodType>(item: T) => z.preprocess((v) => (isBlank(v) ? undefined : v), z.array(item).default([]));

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
    prerequisites: list(reference('topics')),
    related: list(reference('topics')),
    video: blank(reference('videos')),
    notes: blank(reference('notes')),
    flashcards: blank(reference('flashcards')),
    quiz: blank(reference('quizzes')),
    resources: list(reference('resources')),
    references: list(reference('references')),
    /** Optional curriculum tags for later (e.g. ['ap', 'ib']). Leave empty for general content. */
    curricula: list(z.string()),
    status,
    /** true = drafted or converted with assistance; must be reviewed by you before publishing. */
    assisted: z.boolean().default(false),
    lastReviewed: blank(z.coerce.date()),
    updated: blank(z.coerce.date()),
  }),
});

/** Flashcard decks: src/content/flashcards/<deck>.yaml */
const flashcards = defineCollection({
  loader: glob({ pattern: '**/*.{yaml,yml}', base: './src/content/flashcards' }),
  schema: z.object({
    title: z.string(),
    description: blank(z.string()),
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
          tags: list(z.string()),
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
    description: blank(z.string()),
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
    videoId: blank(z.string()),
    duration: blank(z.string()), // e.g. "PT6M30S" (6 min 30 s)
    uploadDate: blank(z.coerce.date()),
    keyPoints: list(z.string()),
    level: blank(level),
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
    pdf: blank(z.string()),
    status,
    assisted: z.boolean().default(false),
    lastReviewed: blank(z.coerce.date()),
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
    file: blank(z.string()),
    /** Optional separate answer key PDF (free resources only). */
    answerKey: blank(z.string()),
    /** Small preview image in /public/previews/ */
    preview: blank(z.string()),
    pages: blank(z.number()),
    /** Premium resources point to a product instead of a file. */
    product: blank(reference('products')),
    status,
  }),
});

/**
 * Printable worksheets and answer keys, written as text: src/content/printables/<name>.mdx
 * Each becomes a print-ready page at /print/<name>/ and a PDF via `npm run pdfs`.
 */
const printables = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/printables' }),
  schema: z.object({
    title: z.string(),
    subtitle: blank(z.string()),
    kind: z.enum(['worksheet', 'answer-key']).default('worksheet'),
    level,
    /** Suggested time, e.g. "30 minutes". */
    time: blank(z.string()),
    /** Show Name / Class / Date lines at the top. */
    nameLines: z.boolean().default(true),
    status,
    assisted: z.boolean().default(false),
  }),
});

/** Premium products (sold on an external platform later): src/content/products/<slug>.yaml */
const products = defineCollection({
  loader: glob({ pattern: '**/*.{yaml,yml}', base: './src/content/products' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    /** Shown exactly as written, e.g. "US$9". Leave empty until decided. */
    price: blank(z.string()),
    /** External checkout link (added in the monetization stage). */
    checkoutUrl: blank(z.url()),
    includes: list(z.string()),
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
    url: blank(z.url()),
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
    updated: blank(z.coerce.date()),
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
  printables,
  references,
  pages,
};
