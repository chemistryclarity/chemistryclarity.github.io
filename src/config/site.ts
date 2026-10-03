/**
 * ─────────────────────────────────────────────────────────────
 *  SITE SETTINGS — the one place to change brand-wide details.
 * ─────────────────────────────────────────────────────────────
 *  Edit the values below, commit, and push. Every page updates.
 *  Keep personal information out of this file: it is public.
 */
export const site = {
  name: 'Chemistry Clarity',
  tagline: 'Chemistry, made clear.',
  description:
    'Clear, visual explanations of chemistry concepts with worked examples, flashcards, quizzes and printable study resources.',

  /** Live address. If a custom domain is added later, change `url` (and keep `base` as '/'). */
  url: 'https://chemistryclarity.github.io',
  base: '/',

  language: 'en',
  locale: 'en_US',

  /** Shown as the author/publisher everywhere. */
  publisher: 'Chemistry Clarity',

  contact: {
    email: 'chemistryclarityforyou@gmail.com',
  },

  /** Leave a value empty ('') to hide that link. */
  social: {
    youtube: '',
    instagram: '',
    tiktok: '',
    x: '',
  },

  copyrightStart: 2026,

  /** Default image used when a page is shared on social media (path inside /public). */
  defaultShareImage: '/og-default.png',

  /**
   * Feature switches. Turn a feature on only when it is ready.
   *  - showDrafts: show `status: draft` content on the live site with a DRAFT banner
   *    (hidden from search engines). Set to false before public launch.
   */
  features: {
    showDrafts: true,
    newsletter: false,
    shop: false,
    ads: false,
    search: false,
  },
} as const;

export type Site = typeof site;

/**
 * NEWSLETTER SETTINGS
 * The sign-up form sends addresses straight to your email service; nothing is stored on this site.
 * To go live: copy these values from your email service's "embedded form" code
 * (see docs/newsletter.md), then set `features.newsletter: true` above.
 * The form address is public by design. It is NOT a password or API key.
 */
export const newsletter: {
  provider: '' | 'mailerlite' | 'kit' | 'buttondown' | 'other';
  formAction: string;
  emailField: string;
  nameField: string;
  hiddenFields: Record<string, string>;
  frequency: string;
  minimumAge: number;
} = {
  provider: '',
  formAction: '',
  emailField: 'email',
  /** Leave empty ('') to ask for email only. */
  nameField: '',
  /** Extra hidden values some services require (copied from their embed code). */
  hiddenFields: {},
  /** Shown on the sign-up page, e.g. 'About twice a month'. Leave empty to hide. */
  frequency: '',
  /** LEGAL REVIEW: minimum age for signing up without parental permission. */
  minimumAge: 16,
};

/** True only when the switch is on AND the form is connected. */
export const newsletterEnabled = site.features.newsletter && newsletter.formAction !== '';
