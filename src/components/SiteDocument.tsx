import { Inter, Roboto_Condensed } from 'next/font/google'

import type { ReactNode } from 'react'

import '@/src/app/globals.css'
import { structuredData } from '@/src/config/localized-metadata'
import { type Locale, getCopy } from '@/src/i18n/site-copy'

const inter = Inter({
  subsets: ['latin', 'cyrillic', 'cyrillic-ext'],
  display: 'swap',
  variable: '--font-body',
})
const displayFont = Roboto_Condensed({
  weight: '800',
  subsets: ['latin', 'cyrillic', 'cyrillic-ext'],
  display: 'swap',
  variable: '--font-display',
})

export function SiteDocument({
  locale,
  children,
}: {
  locale: Locale
  children: ReactNode
}) {
  const copy = getCopy(locale)
  return (
    <html lang={copy.htmlLang}>
      <body className={`${inter.variable} ${displayFont.variable}`}>
        <a
          href="#main"
          className="sr-only rounded-lg bg-brand px-4 py-3 font-bold text-ink focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70]"
        >
          {copy.skipLink}
        </a>
        {children}
        {structuredData(locale).map((data) => (
          <script
            key={data['@type']}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
          />
        ))}
      </body>
    </html>
  )
}
