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
    en: 'Apply for your UK Electronic Travel Authorisation (ETA) quickly and securely. Expert review, fast approval, available in 5 languages.',
    fr: 'Demandez votre Autorisation de Voyage Électronique (AVE) pour le Royaume-Uni rapidement et en toute sécurité.',
    bg: 'Кандидатствайте за UK Electronic Travel Authorisation (ETA) бързо и сигурно. Експертна проверка, бързо одобрение.',
    tr: 'İngiltere Elektronik Seyahat İzni (ETA) başvurunuzu hızlı ve güvenli bir şekilde yapın.',
    ar: 'تقدم بطلب تصريح السفر الإلكتروني للمملكة المتحدة بسرعة وأمان. مراجعة خبراء وموافقة سريعة.',
  };

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      template: `%s | ${SITE_NAME}`,
      default: t('title'),
    },
    description: descriptions[locale] || descriptions.en,
    keywords: [
      'UK ETA', 'Electronic Travel Authorisation', 'UK travel permit',
      'UK visa', 'ETA application', 'travel to UK',
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
