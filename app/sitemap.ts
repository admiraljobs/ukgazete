import { MetadataRoute } from 'next';
import { SITE_URL, LOCALE_CONFIGS, STATIC_PATHS } from '@/lib/seo';
import { getAllSlugs } from '@/lib/blog';

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  // Static pages
  for (const pagePath of STATIC_PATHS) {
    const priority =
      pagePath === '' ? 1.0 :
      pagePath === '/apply-for-eta' ? 0.9 :
      ['/about', '/contact', '/blog'].includes(pagePath) ? 0.7 :
      0.5;

    const changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] =
      pagePath === '' || pagePath === '/apply-for-eta' ? 'weekly' :
      pagePath === '/blog' ? 'daily' :
      'monthly';

    for (const locale of LOCALE_CONFIGS) {
      entries.push({
        url: `${SITE_URL}${locale.path}${pagePath}`,
        lastModified: new Date(),
        changeFrequency,
        priority,
      });
    }
  }

  // Blog article pages — all slugs × all locales
  for (const slug of getAllSlugs()) {
    for (const locale of LOCALE_CONFIGS) {
      entries.push({
        url: `${SITE_URL}${locale.path}/blog/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.6,
      });
    }
  }

  return entries;
}
