import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { isRtl, Locale } from '@/i18n/request';
import { FormProvider } from '@/lib/form-context';
import '../globals.css';

export const metadata: Metadata = {
  title: 'UK ETA Application | Electronic Travel Authorisation Service',
  description: 'Apply for your UK Electronic Travel Authorisation (ETA) quickly and securely.',
  keywords: ['UK ETA', 'Electronic Travel Authorisation', 'UK Visa', 'Travel to UK'],
};

interface RootLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function RootLayout({ children, params }: RootLayoutProps) {
  const { locale } = await params;
  const messages = await getMessages();
  const dir = isRtl(locale as Locale) ? 'rtl' : 'ltr';

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