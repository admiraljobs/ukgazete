/**
 * Renders a JSON-LD structured data script tag.
 * Works in both server and client components.
 */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// ── Schema builders ───────────────────────────────────────────────────────────

export function buildWebsiteSchema(siteUrl: string, siteName: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteName,
    url: siteUrl,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${siteUrl}/status?ref={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };
}

export function buildServiceSchema(siteUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'UK ETA Application Service',
    description:
      'Professional UK Electronic Travel Authorisation application service. Expert review, fast processing, available in 5 languages.',
    provider: {
      '@type': 'Organization',
      name: 'UK ETA Service',
      url: siteUrl,
    },
    serviceType: 'Travel Authorisation',
    areaServed: 'Worldwide',
    offers: {
      '@type': 'Offer',
      price: '79.00',
      priceCurrency: 'GBP',
      availability: 'https://schema.org/InStock',
    },
  };
}

export function buildFaqSchema(faqs: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };
}

export function buildReviewSchema(siteUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'UK ETA Service',
    url: siteUrl,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '2400',
      bestRating: '5',
      worstRating: '1',
    },
    review: [
      {
        '@type': 'Review',
        author: { '@type': 'Person', name: 'Ahmed Al-Rashidi' },
        reviewRating: { '@type': 'Rating', ratingValue: '5' },
        reviewBody:
          'The process was incredibly smooth. I had my ETA approved within 2 days.',
      },
      {
        '@type': 'Review',
        author: { '@type': 'Person', name: 'Sophie Marchand' },
        reviewRating: { '@type': 'Rating', ratingValue: '5' },
        reviewBody:
          'Le formulaire était très clair et le service en français est parfait. ETA reçu rapidement!',
      },
      {
        '@type': 'Review',
        author: { '@type': 'Person', name: 'Mehmet Yıldız' },
        reviewRating: { '@type': 'Rating', ratingValue: '5' },
        reviewBody:
          'Çok hızlı ve güvenilir bir hizmet. 3 gün içinde ETA\'m onaylandı.',
      },
    ],
  };
}

export function buildArticleSchema({
  title,
  description,
  slug,
  publishedAt,
  siteUrl,
}: {
  title: string;
  description: string;
  slug: string;
  publishedAt: string;
  siteUrl: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    url: `${siteUrl}/blog/${slug}`,
    datePublished: publishedAt,
    dateModified: publishedAt,
    publisher: {
      '@type': 'Organization',
      name: 'UK ETA Service',
      url: siteUrl,
    },
    author: {
      '@type': 'Organization',
      name: 'UK ETA Service',
    },
  };
}
