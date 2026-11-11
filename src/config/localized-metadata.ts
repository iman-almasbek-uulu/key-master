import type { Metadata } from 'next'

import { assetPath, pageUrl, siteConfig } from '@/src/config/site'
import { contactLinks } from '@/src/config/links'
import { services } from '@/src/data/services'
import { getCopy, getFaq, type Locale } from '@/src/i18n/site-copy'

const workshopImage = new URL('images/generated/hero-locksmith-wide.webp', siteConfig.url).toString()

export function metadataFor(locale: Locale): Metadata {
  const copy = getCopy(locale)
  const currentUrl = pageUrl(locale)
  const imageDimensions = { width: 1536, height: 1024 }

  return {
    title: copy.title,
    description: copy.description,
    authors: [{ name: siteConfig.name }],
    creator: siteConfig.name,
    publisher: siteConfig.name,
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: currentUrl,
      languages: {
        ru: pageUrl('ru'),
        ky: pageUrl('ky'),
        'x-default': pageUrl('ru'),
      },
    },
    icons: {
      icon: [
        {
          url: assetPath('/images/generated/favicon-32.png'),
          sizes: '32x32',
          type: 'image/png',
        },
      ],
      apple: [
        {
          url: assetPath('/images/generated/apple-touch-icon.png'),
          sizes: '180x180',
          type: 'image/png',
        },
      ],
    },
    openGraph: {
      type: 'website',
      locale: locale === 'ru' ? 'ru_KG' : 'ky_KG',
      alternateLocale: [locale === 'ru' ? 'ky_KG' : 'ru_KG'],
      url: currentUrl,
      title: copy.title,
      description: copy.description,
      siteName: siteConfig.name,
      images: [
        {
          url: workshopImage,
          ...imageDimensions,
          alt: copy.ogAlt,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: copy.title,
      description: copy.description,
      images: [workshopImage],
    },
  }
}

export function structuredData(locale: Locale) {
  const copy = getCopy(locale)
  const faq = getFaq(locale)
  const localizedServices = services.map((service) => ({
    '@type': 'Service',
    name: copy.services[service.id].title,
    description: copy.services[service.id].description,
    areaServed: {
      '@type': 'Place',
      name: copy.areaServed,
    },
  }))
  const streetAddress = copy.contact.streetAddress
  const locality = copy.contact.cityName

  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Locksmith',
      '@id': `${siteConfig.url}#business`,
      name: siteConfig.name,
      description: copy.description,
      url: siteConfig.url,
      image: workshopImage,
      telephone: siteConfig.phone,
      sameAs: [contactLinks.whatsapp, contactLinks.telegram],
      hasMap: contactLinks.route,
      address: {
        '@type': 'PostalAddress',
        streetAddress,
        addressLocality: locality,
        addressCountry: 'KG',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 42.874412,
        longitude: 74.521848,
      },
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: [
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
            'Sunday',
          ],
          opens: '09:00',
          closes: '21:00',
        },
      ],
      areaServed: {
        '@type': 'Place',
        name: copy.areaServed,
      },
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: locale === 'ky' ? 'Кызматтар' : 'Услуги мастерской',
        itemListElement: localizedServices,
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faq.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
    },
  ]
}
