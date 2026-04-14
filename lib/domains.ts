/**
 * Domain → locale mapping.
 *
 * Add a new entry here whenever you launch a new country site.
 * The middleware and Header language switcher both read from this file.
 *
 * For local development, localhost always resolves to the defaultLocale ('en').
 */

export interface DomainConfig {
  domain: string;
  defaultLocale: string;
  /** Human-readable label shown in the language switcher on that domain */
  label: string;
  /** Flag emoji shown in the switcher */
  flag: string;
}

export const DOMAIN_CONFIGS: DomainConfig[] = [
  {
    domain: 'ukgazete.com',
    defaultLocale: 'en',
    label: 'English',
    flag: '🇬🇧',
  },
  {
    domain: 'ukgazete.bg',
    defaultLocale: 'bg',
    label: 'Български',
    flag: '🇧🇬',
  },
  {
    domain: 'ukgazete.com.tr',
    defaultLocale: 'tr',
    label: 'Türkçe',
    flag: '🇹🇷',
  },
  {
    domain: 'ukgazete.fr',
    defaultLocale: 'fr',
    label: 'Français',
    flag: '🇫🇷',
  },
  {
    domain: 'ukgazete.com',
    defaultLocale: 'ar',
    label: 'العربية',
    flag: '🇦🇪',
  },
  // ── Add new countries here ──────────────────────────────────────────────
  // { domain: 'ukgazete.ro', defaultLocale: 'ro', label: 'Română', flag: '🇷🇴' },
  // { domain: 'ukgazete.pl', defaultLocale: 'pl', label: 'Polski',  flag: '🇵🇱' },
];

/** Locale codes derived from DOMAIN_CONFIGS — used by next-intl */
export const localesFromDomains = DOMAIN_CONFIGS.map((d) => d.defaultLocale);

/**
 * Given the current hostname, return the DomainConfig (or undefined for localhost/unknown).
 * On localhost the caller should fall back to the 'en' domain config.
 */
export function getDomainConfig(hostname: string): DomainConfig | undefined {
  // Strip port for local dev comparison
  const host = hostname.split(':')[0];
  return DOMAIN_CONFIGS.find((d) => d.domain === host || d.domain === hostname);
}

/**
 * Given a locale code, return the domain that serves it as its default.
 */
export function getDomainForLocale(locale: string): string | undefined {
  return DOMAIN_CONFIGS.find((d) => d.defaultLocale === locale)?.domain;
}
