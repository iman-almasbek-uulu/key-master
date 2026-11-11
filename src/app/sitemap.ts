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
  return [
    { url: pageUrl('ru'), alternates },
    { url: pageUrl('ky'), alternates },
  ]
}
