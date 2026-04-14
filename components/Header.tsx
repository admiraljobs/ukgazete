'use client';

import { useTranslations, useLocale } from 'next-intl';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Shield, Globe, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { DOMAIN_CONFIGS } from '@/lib/domains';
import { cn } from '@/lib/utils';

export function Header() {
  const t = useTranslations('header');
  const locale = useLocale();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLanguageChange = (newLocale: string) => {
    if (newLocale === locale) return;

    // Strip any existing locale prefix from the current path
    const nonDefaultLocales = DOMAIN_CONFIGS
      .map((d) => d.defaultLocale)
      .filter((l) => l !== 'en');

    let basePath = pathname;
    for (const l of nonDefaultLocales) {
      if (pathname.startsWith(`/${l}/`) || pathname === `/${l}`) {
        basePath = pathname.slice(`/${l}`.length) || '/';
        break;
      }
    }

    // English has no prefix; all other locales get /{locale}/path
    const newPath = newLocale === 'en' ? basePath || '/' : `/${newLocale}${basePath || '/'}`;
    window.location.href = newPath;
  };

  const navLinks = [
    { href: '/', label: t('nav.home') },
    { href: '/apply-for-eta', label: t('nav.apply') },
    { href: '/status', label: t('nav.status') },
    { href: '/about', label: t('nav.about') },
    { href: '/blog', label: t('nav.blog') },
    { href: '/contact', label: t('nav.contact') },
  ];

  return (
    <header className="bg-white/90 backdrop-blur-lg border-b border-brand-royal sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo / Title */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-brand-accent to-brand-muted flex items-center justify-center">
              <span className="text-white font-display font-bold text-lg md:text-xl">UK</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="font-display font-bold text-brand-dark text-lg md:text-xl">{t('title')}</h1>
              <p className="text-brand-muted text-xs md:text-sm">{t('subtitle')}</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'text-sm font-medium transition-colors hover:text-brand-accent',
                  pathname === link.href
                    ? 'text-brand-accent'
                    : 'text-brand-light'
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center gap-2 md:gap-4">
            {/* Security badge */}
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-accent/8 border border-brand-accent/20">
              <Shield className="w-4 h-4 text-brand-accent" />
              <span className="text-xs text-brand-accent font-medium">{t('securityBadge')}</span>
            </div>

            {/* Domain / language switcher */}
            <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-surface-elevated border border-brand-royal hover:border-brand-muted/60 transition-colors">
              <Globe className="w-4 h-4 text-brand-accent flex-shrink-0" />
              <select
                value={locale}
                onChange={(e) => handleLanguageChange(e.target.value)}
                className="bg-transparent text-brand-dark text-sm focus:outline-none cursor-pointer appearance-none pr-5"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%231d70b8' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 0 center',
                }}
              >
                {DOMAIN_CONFIGS.map((d) => (
                  <option key={d.defaultLocale} value={d.defaultLocale}>
                    {d.flag} {d.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-surface-elevated text-brand-light"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="lg:hidden py-4 border-t border-brand-royal">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    'px-4 py-3 rounded-lg text-sm font-medium transition-colors',
                    pathname === link.href
                      ? 'bg-brand-accent/10 text-brand-accent'
                      : 'text-brand-light hover:bg-surface-elevated hover:text-brand-dark'
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
