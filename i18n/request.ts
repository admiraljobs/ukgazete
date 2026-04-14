import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';
import { DOMAIN_CONFIGS, localesFromDomains } from '@/lib/domains';

export const locales = localesFromDomains as string[];
export type Locale = string;

export const localeNames: Record<string, string> = Object.fromEntries(
  DOMAIN_CONFIGS.map((d) => [d.defaultLocale, d.label])
);

export const rtlLocales: string[] = ['ar'];

export function isRtl(locale: string): boolean {
  return rtlLocales.includes(locale);
}

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = await requestLocale;

  if (!locale || !locales.includes(locale)) {
    notFound();
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
