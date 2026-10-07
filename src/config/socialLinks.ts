import { site } from './site';

/** Social media profiles, in display order. Edit the addresses in the online editor (Site settings → Social media links). */
const platforms: { key: string; label: string; blurb: string }[] = [
  { key: 'linkedin', label: 'LinkedIn', blurb: 'News, new lessons and resources for teachers and students.' },
  { key: 'youtube', label: 'YouTube', blurb: 'Short videos that explain chemistry step by step.' },
  { key: 'facebook', label: 'Facebook', blurb: 'Updates, free worksheets and study tips.' },
  { key: 'instagram', label: 'Instagram', blurb: 'Quick chemistry ideas and revision cards.' },
  { key: 'tiktok', label: 'TikTok', blurb: 'Bite-sized chemistry explanations.' },
  { key: 'x', label: 'X', blurb: 'New lessons and chemistry news as they happen.' },
  { key: 'threads', label: 'Threads', blurb: 'Conversations about learning and teaching chemistry.' },
  { key: 'pinterest', label: 'Pinterest', blurb: 'Printable summaries and diagrams to save.' },
];

/** Only the profiles that have an address are shown anywhere on the site. */
export function socialLinks() {
  return platforms
    .map((p) => ({ ...p, href: (site.social[p.key] ?? '').trim() }))
    .filter((p) => p.href);
}
