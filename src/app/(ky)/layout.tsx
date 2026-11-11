import type { ReactNode } from 'react'

import { SiteDocument } from '@/src/components/SiteDocument'
import { metadataFor } from '@/src/config/localized-metadata'

export const metadata = metadataFor('ky')

export default function KyrgyzLayout({ children }: { children: ReactNode }) {
  return <SiteDocument locale="ky">{children}</SiteDocument>
}
