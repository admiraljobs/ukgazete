import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { SITE_NAME, buildAlternates } from '@/lib/seo';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'about' });

  const titles: Record<string, string> = {
    en: 'About Our UK Visa ETA Application Service',
    fr: 'À propos de notre service de Visa ETA Royaume-Uni',
    bg: 'За нашата услуга за UK Visa ETA',
    tr: 'İngiltere Vize ETA Başvuru Hizmetimiz Hakkında',
    ar: 'عن خدمة طلب تأشيرة ETA للمملكة المتحدة',
  };

  const descs: Record<string, string> = {
    en: 'Learn about our UK Visa ETA application service — expert guidance, secure processing, and fast approvals for travellers worldwide.',
    fr: 'Découvrez notre service de demande de visa ETA Royaume-Uni — conseils d\'experts et traitements rapides.',
    bg: 'Научете повече за нашата услуга за UK Visa ETA — експертно ръководство и бърза обработка.',
    tr: 'İngiltere Vize ETA başvuru hizmetimiz hakkında bilgi edinin — uzman rehberlik ve hızlı onay.',
    ar: 'تعرف على خدمة طلب تأشيرة ETA للمملكة المتحدة — إرشادات الخبراء ومعالجة سريعة.',
  };

  return {
    title: titles[locale] || titles.en,
    description: descs[locale] || descs.en,
    alternates: buildAlternates('/about'),
    openGraph: {
      title: `${titles[locale] || titles.en} | ${SITE_NAME}`,
      description: descs[locale] || descs.en,
    },
  };
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
