import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import './globals.css'
import { socialLinks } from '@/src/config/links'
import { siteConfig } from '@/src/config/site'

const inter = Inter({ subsets: ['latin', 'cyrillic'] })

export const metadata: Metadata = {
  title: `${siteConfig.name} — Ремонт и изготовление автоключей`,
  description: siteConfig.description,
  keywords: [
    'автоключи',
    'изготовление ключей',
    'ремонт автоключей',
    'программирование чипов',
    'Бишкек',
    'ключи зажигания',
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  metadataBase: new URL(siteConfig.url),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    url: siteConfig.url,
    title: `${siteConfig.name} — Ремонт и изготовление автоключей`,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: '@/public/logo2.png',
        width: 1200,
        height: 630,
        alt: `Логотип ${siteConfig.name}`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.name} — Ремонт и изготовление автоключей`,
    description: siteConfig.description,
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: siteConfig.name,
  description: siteConfig.description,
  url: siteConfig.url,
  telephone: siteConfig.phone,
  address: {
    '@type': 'PostalAddress',
    addressLocality: siteConfig.city,
    addressCountry: 'KG',
  },
  openingHours: 'Mo-Su 09:00-21:00',
  sameAs: [socialLinks.instagram, socialLinks.whatsapp, socialLinks.telegram],
  priceRange: '$$',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <body className={inter.className}>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  )
}
