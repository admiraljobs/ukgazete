export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') || 'https://ukgazete.com';

export const SITE_NAME = 'UK ETA Service';

/** All supported locales with their URL prefix and hreflang code */
export const LOCALE_CONFIGS = [
  { code: 'en', hreflang: 'en',    path: ''     },
  { code: 'fr', hreflang: 'fr',    path: '/fr'  },
  { code: 'bg', hreflang: 'bg',    path: '/bg'  },
  { code: 'tr', hreflang: 'tr',    path: '/tr'  },
  { code: 'ar', hreflang: 'ar',    path: '/ar'  },
] as const;

/**
 * All static page paths (without locale prefix).
 * Used by the sitemap generator.
 */
export const STATIC_PATHS = [
  '',               // homepage
  '/apply-for-eta',
  '/status',
  '/about',
  '/contact',
  '/blog',
  '/privacy',
  '/terms',
];

/**
 * Build the `alternates.languages` object for Next.js generateMetadata.
 * Pass the current page path (without locale prefix), e.g. '/about'.
 */
export function buildAlternates(pagePath: string = '') {
  const languages: Record<string, string> = {};

  for (const l of LOCALE_CONFIGS) {
    languages[l.hreflang] = `${SITE_URL}${l.path}${pagePath}`;
  }
  languages['x-default'] = `${SITE_URL}${pagePath}`;

  return {
    canonical: `${SITE_URL}${pagePath}`,
    languages,
  };
}
