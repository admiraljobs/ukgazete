import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { blogPosts } from '@/lib/blog';
import { Clock, ArrowRight } from 'lucide-react';
import { SITE_NAME, buildAlternates } from '@/lib/seo';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'blog' });
  const blogTitles: Record<string, string> = {
    en: 'UK Visa & ETA Guides — Travel Tips & Application News',
    fr: 'Guides Visa & ETA Royaume-Uni — Conseils de voyage',
    bg: 'UK Visa и ETA ръководства — Съвети за пътуване',
    tr: 'İngiltere Vize & ETA Rehberleri — Seyahat İpuçları',
    ar: 'أدلة تأشيرة وETA المملكة المتحدة — نصائح السفر',
  };

  const blogDescs: Record<string, string> = {
    en: 'Expert guides on UK visa ETA applications, eligibility, documents, and travel tips. Everything you need to plan your trip to the UK.',
    fr: 'Guides experts sur les demandes de visa ETA Royaume-Uni, l\'éligibilité et les conseils de voyage.',
    bg: 'Експертни ръководства за UK visa ETA заявки, изисквания и съвети за пътуване.',
    tr: 'İngiltere vize ETA başvuruları, uygunluk ve seyahat ipuçları hakkında uzman rehberler.',
    ar: 'أدلة الخبراء حول طلبات تأشيرة ETA المملكة المتحدة ومتطلباتها ونصائح السفر.',
  };

  return {
    title: blogTitles[locale] || blogTitles.en,
    description: blogDescs[locale] || blogDescs.en,
    alternates: buildAlternates('/blog'),
    openGraph: {
      title: `${blogTitles[locale] || blogTitles.en} | ${SITE_NAME}`,
      description: blogDescs[locale] || blogDescs.en,
    },
  };
}

export default async function BlogPage() {
  const t = await getTranslations('blog');

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="py-16 md:py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-brand-accent/5 via-transparent to-transparent" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-display font-bold text-brand-dark mb-4">
                {t('title')}
              </h1>
              <p className="text-xl text-brand-light/70">{t('subtitle')}</p>
            </div>
          </div>
        </section>

        {/* Articles grid */}
        <section className="py-12 pb-24">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {blogPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group bg-surface-card border border-brand-royal rounded-2xl p-6 flex flex-col gap-4 hover:shadow-md hover:border-brand-accent/30 transition-all duration-300"
                >
                  {/* Category badge */}
                  <span className="inline-block self-start px-3 py-1 rounded-full bg-brand-accent/10 text-brand-accent text-xs font-medium">
                    {post.category}
                  </span>

                  {/* Title */}
                  <h2 className="text-lg font-semibold text-brand-dark group-hover:text-brand-accent transition-colors leading-snug">
                    {post.title}
                  </h2>

                  {/* Description */}
                  <p className="text-brand-light text-sm leading-relaxed flex-1">
                    {post.description}
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-2 border-t border-brand-royal/40">
                    <div className="flex items-center gap-1.5 text-brand-muted text-xs">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{post.readingMinutes} {t('minRead')}</span>
                    </div>
                    <span className="text-brand-accent text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                      {t('readMore')} <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
