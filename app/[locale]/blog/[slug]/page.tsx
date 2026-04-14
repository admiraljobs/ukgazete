import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { JsonLd, buildArticleSchema } from '@/components/JsonLd';
import { getBlogPost, getAllSlugs } from '@/lib/blog';
import { SITE_URL, SITE_NAME, buildAlternates } from '@/lib/seo';
import { Clock, ArrowRight } from 'lucide-react';

interface Props {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    alternates: buildAlternates(`/blog/${slug}`),
    openGraph: {
      title: `${post.title} | ${SITE_NAME}`,
      description: post.description,
      type: 'article',
      publishedTime: post.publishedAt,
    },
  };
}

export default async function BlogArticlePage({ params }: Props) {
  const { slug, locale } = await params;
  const post = getBlogPost(slug);

  if (!post) notFound();

  const t = await getTranslations({ locale, namespace: 'blog' });

  const articleSchema = buildArticleSchema({
    title: post.title,
    description: post.description,
    slug,
    publishedAt: post.publishedAt,
    siteUrl: SITE_URL,
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <JsonLd data={articleSchema} />

      <main className="flex-1">
        <article className="py-12 md:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              {/* Back link */}
              <Link
                href="/blog"
                className="inline-flex items-center text-brand-accent hover:underline text-sm mb-8"
              >
                {t('backToBlog')}
              </Link>

              {/* Header */}
              <div className="mb-10">
                <span className="inline-block px-3 py-1 rounded-full bg-brand-accent/10 text-brand-accent text-xs font-medium mb-4">
                  {post.category}
                </span>
                <h1 className="text-3xl md:text-4xl font-display font-bold text-brand-dark mb-4 leading-tight">
                  {post.title}
                </h1>
                <p className="text-brand-light text-lg mb-4">{post.description}</p>
                <div className="flex items-center gap-4 text-brand-muted text-sm">
                  <span>
                    {t('publishedOn')}{' '}
                    {new Date(post.publishedAt).toLocaleDateString('en-GB', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {post.readingMinutes} {t('minRead')}
                  </span>
                </div>
              </div>

              {/* Divider */}
              <hr className="border-brand-royal/30 mb-10" />

              {/* Article content */}
              <div
                className="prose-brand"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {/* CTA */}
              <div className="mt-12 p-8 rounded-2xl bg-brand-accent/5 border border-brand-accent/20 text-center">
                <h3 className="text-xl font-semibold text-brand-dark mb-2">
                  Ready to apply for your UK ETA?
                </h3>
                <p className="text-brand-light mb-6">
                  Our service guides you through every step and submits on your behalf.
                </p>
                <Link
                  href="/apply-for-eta"
                  className="btn-primary inline-flex items-center gap-2 group"
                >
                  Start Application
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
