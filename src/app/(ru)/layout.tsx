import type { ReactNode } from 'react'

import { SiteDocument } from '@/src/components/SiteDocument'
import { metadataFor } from '@/src/config/localized-metadata'

export const metadata = metadataFor('ru')

export default function RussianLayout({ children }: { children: ReactNode }) {
  return <SiteDocument locale="ru">{children}</SiteDocument>
}
