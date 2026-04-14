import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { SITE_NAME, buildAlternates } from '@/lib/seo';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'contactPage' });

  const titles: Record<string, string> = {
    en: 'Contact UK Visa ETA Support',
    fr: 'Contacter le support Visa ETA Royaume-Uni',
    bg: 'Свържете се с поддръжката за UK Visa ETA',
    tr: 'İngiltere Vize ETA Destek ile İletişime Geçin',
    ar: 'تواصل مع دعم تأشيرة ETA المملكة المتحدة',
  };

  const descs: Record<string, string> = {
    en: 'Get help with your UK Visa ETA application. Contact our support team for questions about your UK visa status, eligibility, or application.',
    fr: 'Obtenez de l\'aide pour votre demande de visa ETA Royaume-Uni. Contactez notre équipe de support.',
    bg: 'Получете помощ за вашата UK Visa ETA заявка. Свържете се с нашия екип за поддръжка.',
    tr: 'İngiltere Vize ETA başvurunuz için yardım alın. Destek ekibimizle iletişime geçin.',
    ar: 'احصل على مساعدة بشأن طلب تأشيرة ETA المملكة المتحدة. تواصل مع فريق الدعم لدينا.',
  };

  return {
    title: titles[locale] || titles.en,
    description: descs[locale] || descs.en,
    alternates: buildAlternates('/contact'),
    openGraph: {
      title: `${titles[locale] || titles.en} | ${SITE_NAME}`,
      description: descs[locale] || descs.en,
    },
  };
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
