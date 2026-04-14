import createMiddleware from 'next-intl/middleware';
import { localesFromDomains } from './lib/domains';

export default createMiddleware({
  locales: localesFromDomains,
  defaultLocale: 'en',
  // English has no prefix (/about), other languages get a prefix (/fr/about, /bg/about)
  localePrefix: 'as-needed',
});

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
