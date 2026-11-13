import type { MetadataRoute } from 'next'

import { pageUrl } from '@/src/config/site'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const alternates = {
    languages: {
      ru: pageUrl('ru'),
      ky: pageUrl('ky'),
      'x-default': pageUrl('ru'),
    },
  }
  const lastModified = new Date()
  return [
    { url: pageUrl('ru'), lastModified, changeFrequency: 'monthly', priority: 1, alternates },
    { url: pageUrl('ky'), lastModified, changeFrequency: 'monthly', priority: 0.9, alternates },
  ]
}
