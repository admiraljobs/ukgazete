'use client';

import { useTranslations } from 'next-intl';
import { Header } from '@/components/Header';
import { ProgressBar } from '@/components/ProgressBar';
import { FormWizard } from '@/components/FormWizard';
import { Footer } from '@/components/Footer';

export default function ApplyPage() {
  const t = useTranslations();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8 max-w-4xl">
        <ProgressBar />
        <FormWizard />
      </main>

      <Footer />
    </div>
  );
}
