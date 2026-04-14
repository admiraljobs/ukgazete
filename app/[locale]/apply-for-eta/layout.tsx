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

  const applyTitles: Record<string, string> = {
    en: 'UK Visa ETA Application — Apply Online',
    fr: 'Demande de Visa ETA Royaume-Uni — Postuler en ligne',
    bg: 'UK Visa ETA Заявление — Кандидатствайте онлайн',
    tr: 'İngiltere Vize ETA Başvurusu — Çevrimiçi Başvurun',
    ar: 'طلب تأشيرة ETA المملكة المتحدة — تقديم عبر الإنترنت',
  };

  const applyDescriptions: Record<string, string> = {
    en: 'Start your UK Visa ETA application online. Complete the guided form in minutes — expert review included before submission to UK authorities.',
    fr: 'Commencez votre demande de visa ETA Royaume-Uni en ligne. Formulaire guidé, vérification experte incluse avant soumission.',
    bg: 'Започнете вашата UK Visa ETA заявка онлайн. Ръководен формуляр с експертна проверка преди подаване.',
    tr: 'İngiltere Vize ETA başvurunuzu çevrimiçi başlatın. Adım adım rehberli form, uzman incelemesi dahil.',
    ar: 'ابدأ طلب تأشيرة ETA المملكة المتحدة عبر الإنترنت. نموذج إرشادي مع مراجعة الخبراء قبل التقديم.',
  };

  return {
    title: applyTitles[locale] || applyTitles.en,
    description: applyDescriptions[locale] || applyDescriptions.en,
    alternates: buildAlternates('/apply-for-eta'),
    openGraph: {
      title: `${applyTitles[locale] || applyTitles.en} | ${SITE_NAME}`,
      description: applyDescriptions[locale] || applyDescriptions.en,
    },
  };
}

export default function ApplyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
