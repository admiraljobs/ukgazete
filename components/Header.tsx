'use client';

import { useTranslations, useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { Shield, Globe, HelpCircle } from 'lucide-react';
import { locales, localeNames, Locale } from '@/i18n/request';
import { cn } from '@/lib/utils';

export function Header() {
  const t = useTranslations('header');
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();

  const handleLanguageChange = (newLocale: string) => {
    const segments = pathname.split('/');
    segments[1] = newLocale;
    router.push(segments.join('/'));
  };

  return (
    <header className="bg-surface-card/50 backdrop-blur-lg border-b border-brand-royal/30 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo / Title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-brand-accent to-brand-muted flex items-center justify-center">
              <span className="text-surface-dark font-display font-bold text-lg md:text-xl">UK</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="font-display font-bold text-white text-lg md:text-xl">{t('title')}</h1>
              <p className="text-brand-light/60 text-xs md:text-sm">{t('subtitle')}</p>
            </div>
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-2 md:gap-4">
            {/* Security badge */}
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-muted/10 border border-brand-muted/20">
              <Shield className="w-4 h-4 text-brand-accent" />
              <span className="text-xs text-brand-muted">{t('securityBadge')}</span>
            </div>

            {/* Language switcher */}
            <div className="relative">
              <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-surface-elevated/50 border border-brand-royal/30 hover:border-brand-muted/50 transition-colors">
                <Globe className="w-4 h-4 text-brand-accent" />
                <select
                  value={locale}
                  onChange={(e) => handleLanguageChange(e.target.value)}
                  className="bg-transparent text-brand-light text-sm focus:outline-none cursor-pointer appearance-none pr-6"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2366fcf1' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 0 center',
                  }}
                >
                  {locales.map((loc) => (
                    <option key={loc} value={loc} className="bg-surface-dark text-brand-light">
                      {localeNames[loc]}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Help button */}
            <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-surface-elevated/50 border border-brand-royal/30 hover:border-brand-muted/50 transition-colors text-brand-light text-sm">
              <HelpCircle className="w-4 h-4 text-brand-accent" />
              <span className="hidden sm:inline">{t('support')}</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
