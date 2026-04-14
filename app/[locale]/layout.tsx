import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { locales, isRtl } from '@/i18n/request';
import { FormProvider } from '@/lib/form-context';
import { SITE_URL, SITE_NAME, buildAlternates } from '@/lib/seo';
import '../globals.css';

interface RootLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: RootLayoutProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'header' });

  const localeToOgLocale: Record<string, string> = {
    en: 'en_GB',
    fr: 'fr_FR',
    bg: 'bg_BG',
    tr: 'tr_TR',
    ar: 'ar_AE',
  };

  const descriptions: Record<string, string> = {
    en: 'Apply for your UK Visa ETA (Electronic Travel Authorisation) online. Fast, secure UK visa application service — most approved within 3 working days.',
    fr: 'Demandez votre visa ETA Royaume-Uni (Autorisation de Voyage Électronique) en ligne. Service rapide et sécurisé, approuvé en 3 jours ouvrables.',
    bg: 'Кандидатствайте за UK Visa ETA онлайн. Бърза и сигурна услуга за UK виза — одобрение до 3 работни дни.',
    tr: 'İngiltere Vize ETA başvurunuzu çevrimiçi yapın. Hızlı ve güvenli İngiltere vize başvuru hizmeti — 3 iş günü içinde onay.',
    ar: 'تقدم بطلب تأشيرة ETA المملكة المتحدة عبر الإنترنت. خدمة تأشيرة UK سريعة وآمنة — الموافقة خلال 3 أيام عمل.',
  };

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      template: `%s | ${SITE_NAME}`,
      default: t('title'),
    },
    description: descriptions[locale] || descriptions.en,
    keywords: [
      'UK visa ETA', 'UK ETA', 'UK visa application', 'Electronic Travel Authorisation',
      'UK travel visa', 'ETA application', 'UK entry visa', 'apply UK visa online',
    ],
    authors: [{ name: SITE_NAME }],
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true },
    },
    // Homepage canonical — sub-pages override this with their own layout/metadata
    alternates: buildAlternates(),
    openGraph: {
      type: 'website',
      siteName: SITE_NAME,
      locale: localeToOgLocale[locale] || 'en_GB',
      title: t('title'),
      description: descriptions[locale] || descriptions.en,
      url: SITE_URL,
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: descriptions[locale] || descriptions.en,
    },
  };
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function RootLayout({ children, params }: RootLayoutProps) {
  const { locale } = await params;
  const messages = await getMessages();
  const dir = isRtl(locale) ? 'rtl' : 'ltr';

  return (
    <html lang={locale} dir={dir} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-screen">
        <NextIntlClientProvider messages={messages}>
          <FormProvider>
            {children}
          </FormProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
