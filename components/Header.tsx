'use client';

import { useTranslations, useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { Shield, Globe, HelpCircle, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { locales, localeNames, Locale } from '@/i18n/request';
import { cn } from '@/lib/utils';

export function Header() {
  const t = useTranslations('header');
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLanguageChange = (newLocale: string) => {
    const segments = pathname.split('/');
    if (locales.includes(segments[1] as Locale)) {
      segments[1] = newLocale;
    } else {
      segments.splice(1, 0, newLocale);
    }
    router.push(segments.join('/') || '/');
  };

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/apply-for-eta', label: 'Apply Now' },
    { href: '/status', label: 'Check Status' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <header className="bg-surface-card/50 backdrop-blur-lg border-b border-brand-royal/30 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo / Title */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-brand-accent to-brand-muted flex items-center justify-center">
              <span className="text-surface-dark font-display font-bold text-lg md:text-xl">UK</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="font-display font-bold text-white text-lg md:text-xl">{t('title')}</h1>
              <p className="text-brand-light/60 text-xs md:text-sm">{t('subtitle')}</p>
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
                  pathname === link.href || pathname === `/${locale}${link.href}`
                    ? 'text-brand-accent'
                    : 'text-brand-light/70'
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center gap-2 md:gap-4">
            {/* Security badge - hidden on mobile */}
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

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-surface-elevated/50 text-brand-light"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="lg:hidden py-4 border-t border-brand-royal/30">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    'px-4 py-3 rounded-lg text-sm font-medium transition-colors',
                    pathname === link.href || pathname === `/${locale}${link.href}`
                      ? 'bg-brand-accent/10 text-brand-accent'
                      : 'text-brand-light/70 hover:bg-surface-elevated/50 hover:text-brand-light'
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
