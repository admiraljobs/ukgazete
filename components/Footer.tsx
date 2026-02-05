'use client';

import { useTranslations } from 'next-intl';
import { Shield, Lock } from 'lucide-react';

export function Footer() {
  const t = useTranslations('footer');
  const year = new Date().getFullYear();

  return (
    <footer className="bg-surface-card/30 border-t border-brand-royal/20 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Security badges */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-brand-light/50 text-sm">
              <Shield className="w-4 h-4 text-brand-muted" />
              <span>SSL Secured</span>
            </div>
            <div className="flex items-center gap-2 text-brand-light/50 text-sm">
              <Lock className="w-4 h-4 text-brand-muted" />
              <span>GDPR Compliant</span>
            </div>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6 text-sm">
            <a href="/privacy" className="text-brand-light/60 hover:text-brand-accent transition-colors">
              {t('privacy')}
            </a>
            <a href="/terms" className="text-brand-light/60 hover:text-brand-accent transition-colors">
              {t('terms')}
            </a>
            <a href="/contact" className="text-brand-light/60 hover:text-brand-accent transition-colors">
              {t('contact')}
            </a>
          </div>
        </div>

        {/* Copyright & Disclaimer */}
        <div className="mt-6 pt-6 border-t border-brand-royal/10 text-center">
          <p className="text-brand-light/40 text-sm">{t('copyright', { year })}</p>
          <p className="text-brand-light/30 text-xs mt-2">{t('disclaimer')}</p>
        </div>
      </div>
    </footer>
  );
}
