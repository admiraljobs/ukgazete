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
  return {
    title: t('title'),
    description: t('subtitle'),
    alternates: buildAlternates('/blog'),
    openGraph: {
      title: `${t('title')} | ${SITE_NAME}`,
      description: t('subtitle'),
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
