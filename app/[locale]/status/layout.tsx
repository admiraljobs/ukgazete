import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { SITE_NAME, buildAlternates } from '@/lib/seo';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'statusPage' });

  const titles: Record<string, string> = {
    en: 'Check UK Visa ETA Application Status',
    fr: 'Vérifier le statut de votre demande de Visa ETA Royaume-Uni',
    bg: 'Проверете статуса на вашата UK Visa ETA заявка',
    tr: 'İngiltere Vize ETA Başvuru Durumunu Kontrol Edin',
    ar: 'تحقق من حالة طلب تأشيرة ETA المملكة المتحدة',
  };

  const descs: Record<string, string> = {
    en: 'Track your UK Visa ETA application in real time. Enter your reference number to check the latest status of your UK visa application.',
    fr: 'Suivez votre demande de visa ETA Royaume-Uni en temps réel avec votre numéro de référence.',
    bg: 'Проследете вашата UK Visa ETA заявка в реално време с вашия референтен номер.',
    tr: 'Referans numaranızla İngiltere Vize ETA başvurunuzu gerçek zamanlı takip edin.',
    ar: 'تتبع طلب تأشيرة ETA المملكة المتحدة في الوقت الفعلي برقم المرجع الخاص بك.',
  };

  return {
    title: titles[locale] || titles.en,
    description: descs[locale] || descs.en,
    alternates: buildAlternates('/status'),
    openGraph: {
      title: `${titles[locale] || titles.en} | ${SITE_NAME}`,
      description: descs[locale] || descs.en,
    },
  };
}

export default function StatusLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
