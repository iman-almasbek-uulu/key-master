import publicSite from '@/src/config/public-site.json'

const defaultSiteUrl = publicSite.url

function normalizeSiteUrl(value: string) {
  return value.endsWith('/') ? value : `${value}/`
}

export const siteConfig = {
  name: 'autozamok',
  city: 'Бишкек',
  phone: '+996704499678',
  phoneDisplay: '+996 704 499 678',
  workingHours: 'Ежедневно с 9:00 до 21:00',
  workingHoursShort: '9:00–21:00',
  url: normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL ?? defaultSiteUrl),
  address: 'Проспект Дэн Сяопина, 457к',
} as const

function normalizeBasePath(value: string) {
  const trimmed = value.trim().replace(/^\/+|\/+$/g, '')
  return trimmed ? `/${trimmed}` : ''
}

export const basePath =
  process.env.NEXT_PUBLIC_BASE_PATH !== undefined
    ? normalizeBasePath(process.env.NEXT_PUBLIC_BASE_PATH)
    : process.env.NEXT_DEPLOYMENT_TARGET === 'github-pages'
      ? '/key-master'
      : ''

export { defaultSiteUrl }

/**
 * Path to a file from /public. Next.js prefixes framework assets automatically,
 * but plain <img> sources need the deployment base path added by hand.
 */
export function assetPath(path: string) {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`

  return `${basePath}${normalizedPath}`
}

export function pageUrl(locale: 'ru' | 'ky') {
  return locale === 'ky'
    ? new URL('ky/', siteConfig.url).toString()
    : siteConfig.url
}

export function localePath(locale: 'ru' | 'ky') {
  return `${basePath}${locale === 'ky' ? '/ky/' : '/'}` || '/'
}

export const ogImageUrl = new URL(
  'images/generated/og-key-master.jpg',
  siteConfig.url,
).toString()
