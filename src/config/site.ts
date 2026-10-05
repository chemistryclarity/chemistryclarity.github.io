/**
 * ─────────────────────────────────────────────────────────────
 *  SITE SETTINGS — the one place to change brand-wide details.
 * ─────────────────────────────────────────────────────────────
 *  Edit the values below, commit, and push. Every page updates.
 *  Keep personal information out of this file: it is public.
 */
import social from './social.json';

export const site = {
  name: 'Chemistry Clarity',
  tagline: 'Chemistry, made clear.',
  description:
    'Clear, visual explanations of chemistry concepts with worked examples, flashcards, quizzes and printable study resources.',

  /** Live address (custom domain; the old chemistryclarity.github.io address redirects here). */
  url: 'https://chemistryclarity.com',
  base: '/',

  language: 'en',
  locale: 'en_US',

  /** Shown as the author/publisher everywhere. */
  publisher: 'Chemistry Clarity',

  contact: {
    email: 'hello@chemistryclarity.com',
  },

  /** Social media links: edit in the online editor (Site settings → Social media links) or in social.json. Empty = hidden. */
  social: social as Record<string, string>,

  copyrightStart: 2026,

  /** Printed at the bottom of every page of worksheets and notes PDFs. YOUR DECISION: how may teachers use them? */
  printableNotice: 'Free for personal and classroom use. Not for resale.',

  /** Default image used when a page is shared on social media (path inside /public). */
  defaultShareImage: '/og-default.png',

  /**
   * Feature switches. Turn a feature on only when it is ready.
   *  - showDrafts: show `status: draft` content on the live site with a DRAFT banner
   *    (hidden from search engines). Set to false before public launch.
   */
  features: {
    showDrafts: false,
    newsletter: true,
    shop: true,
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
  doubleOptIn: boolean;
  frequency: string;
  minimumAge: number;
} = {
  provider: 'mailerlite',
  formAction: 'https://assets.mailerlite.com/jsonp/2680786/forms/200289109581760489/subscribe',
  emailField: 'fields[email]',
  /** Leave empty ('') to ask for email only. */
  nameField: '',
  /** Extra hidden values some services require (copied from their embed code). */
  hiddenFields: { 'ml-submit': '1', anticsrf: 'true' },
  /** true once double opt-in (confirmation email) is switched on in the email service. */
  doubleOptIn: false,
  /** Shown on the sign-up page, e.g. 'About twice a month'. Leave empty to hide. */
  frequency: '',
  /** LEGAL REVIEW: minimum age for signing up without parental permission. */
  minimumAge: 16,
};

/**
 * VISITOR STATISTICS (Cloudflare Web Analytics: free, cookieless).
 * Paste the token from Cloudflare (Analytics & Logs → Web Analytics → your site → "Manage site").
 * Leave empty to turn statistics off. The token is public by design (not a password).
 */
export const analytics = {
  cloudflareToken: '533eacbacb8d447baa345050fee46123',
};

/** True only when the switch is on AND the form is connected. */
export const newsletterEnabled = site.features.newsletter && newsletter.formAction !== '';
