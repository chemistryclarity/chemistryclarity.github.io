import { site } from '../config/site';

/**
 * Build an internal link that respects the site's base path.
 * Always use this for internal links so the site keeps working
 * if it ever moves to a sub-folder or a custom domain.
 *   url('/learn/')  →  '/learn/'
 */
export function url(path = '/'): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const clean = path.startsWith('/') ? path : `/${path}`;
  return `${base}${clean}`;
}

/** Absolute URL (for canonical links, sitemaps, social sharing). */
export function absoluteUrl(path = '/'): string {
  return new URL(url(path), site.url).href;
}

export const routes = {
  home: () => url('/'),
  learn: () => url('/learn/'),
  area: (id: string) => url(`/learn/${id}/`),
  topic: (id: string) => url(`/chemistry/${id}/`),
  page: (id: string) => url(`/${id}/`),
};
