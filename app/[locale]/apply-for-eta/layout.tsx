import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { SITE_NAME, buildAlternates } from '@/lib/seo';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'header' });

  const applyDescriptions: Record<string, string> = {
    en: 'Start your UK ETA application online. Complete the guided form in minutes — expert review included before submission.',
    fr: 'Commencez votre demande d\'AVE Royaume-Uni en ligne. Formulaire guidé, vérification experte incluse.',
    bg: 'Започнете вашето заявление за UK ETA онлайн. Ръководен формуляр с експертна проверка.',
    tr: 'İngiltere ETA başvurunuzu çevrimiçi başlatın. Adım adım rehberli form, uzman incelemesi dahil.',
    ar: 'ابدأ طلب تصريح السفر الإلكتروني للمملكة المتحدة عبر الإنترنت. نموذج إرشادي مع مراجعة الخبراء.',
  };

  return {
    title: t('nav.apply'),
    description: applyDescriptions[locale] || applyDescriptions.en,
    alternates: buildAlternates('/apply-for-eta'),
    openGraph: {
      title: `${t('nav.apply')} | ${SITE_NAME}`,
      description: applyDescriptions[locale] || applyDescriptions.en,
    },
  };
}

export default function ApplyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
