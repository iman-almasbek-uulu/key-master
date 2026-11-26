import { Footer } from '@/src/components/layout/Footer'
import { MobileContactBar } from '@/src/components/layout/MobileContactBar'
import { BrandsSection } from '@/src/components/sections/BrandsSection'
import { ContactSection } from '@/src/components/sections/ContactSection'
import { FaqSection } from '@/src/components/sections/FaqSection'
import { Hero } from '@/src/components/sections/Hero'
import { ServicesSection } from '@/src/components/sections/ServicesSection'
import { StepsSection } from '@/src/components/sections/StepsSection'
import { WhereSection } from '@/src/components/sections/WhereSection'
import type { Locale } from '@/src/i18n/site-copy'

// Порядок блоков из дизайна: первый экран, где мы, услуги, как работаем, марки, вопросы, контакты
export function SitePage({ locale }: { locale: Locale }) {
  return (
    <>
      <main id="main">
        <Hero locale={locale} />
        <WhereSection locale={locale} />
        <ServicesSection locale={locale} />
        <StepsSection locale={locale} />
        <BrandsSection locale={locale} />
        <FaqSection locale={locale} />
        <ContactSection locale={locale} />
      </main>
      <Footer locale={locale} />
      <MobileContactBar locale={locale} />
    </>
  )
}
