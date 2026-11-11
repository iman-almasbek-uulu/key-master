import { Inter } from 'next/font/google'
import type { ReactNode } from 'react'

import '@/src/app/globals.css'
import { structuredData } from '@/src/config/localized-metadata'
import { getCopy, type Locale } from '@/src/i18n/site-copy'

const inter = Inter({ subsets: ['latin', 'cyrillic', 'cyrillic-ext'] })

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
      <body className={inter.className}>
        <a
          href="#main"
          className="sr-only rounded-lg bg-sky-300 px-4 py-3 font-medium text-slate-950 focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70]"
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
