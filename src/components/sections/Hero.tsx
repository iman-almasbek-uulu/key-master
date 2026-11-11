import { Clock, MessageCircle, Phone } from 'lucide-react'

import { Container } from '@/src/components/ui/container'
import { CustomButton } from '@/src/components/ui/custom-button'
import { contactLinks, defaultWhatsAppLink } from '@/src/config/links'
import { assetPath } from '@/src/config/site'
import { getCopy, type Locale } from '@/src/i18n/site-copy'

export function Hero({ locale }: { locale: Locale }) {
  const copy = getCopy(locale)
  return (
    <section
      id="top"
      className="relative isolate min-h-[680px] overflow-hidden border-b border-white/[0.06] bg-[#0b0d10] md:min-h-[540px] lg:min-h-[620px]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        <picture className="absolute inset-0 block">
          <source
            media="(min-width: 768px)"
            srcSet={assetPath('/images/generated/hero-locksmith-wide.webp')}
            type="image/webp"
          />
          <img
            src={assetPath('/images/generated/hero-locksmith-phone.webp')}
            alt=""
            fetchPriority="high"
            className="h-full w-full object-cover object-[center_bottom]"
          />
        </picture>
        <span className="absolute inset-0 bg-gradient-to-b from-[#0b0d10]/65 via-[#0b0d10]/10 via-55% to-transparent md:bg-gradient-to-r md:from-[#0b0d10]/75 md:via-[#0b0d10]/35 md:via-50% md:to-transparent" />
      </div>

      <Container className="relative z-10 flex min-h-[680px] items-start md:min-h-[540px] md:items-center lg:min-h-[620px]">
        <div className="min-w-0 max-w-2xl py-7 sm:py-12 md:py-16 lg:py-20">
          <h1 className="hero-enter text-balance text-[1.95rem] leading-[1.08] tracking-[-0.03em] text-zinc-50 sm:text-[2.75rem] lg:text-[3.45rem] xl:text-[3.8rem]">
            {copy.hero.cityFirst ? (
              <>
                <span className="text-sky-300">{copy.hero.city}</span>{' '}
                {copy.hero.title}
              </>
            ) : (
              <>
                {copy.hero.title}{' '}
                <span className="text-sky-300">{copy.hero.city}</span>
              </>
            )}
          </h1>

          <p className="hero-enter hero-enter-delay-1 mt-4 max-w-xl text-[15px] leading-relaxed text-zinc-100/90 sm:mt-5 sm:text-lg">
            {copy.hero.description}
          </p>

          <p className="hero-enter hero-enter-delay-1 mt-4 flex items-center gap-2.5 text-sm text-zinc-100 sm:mt-5">
            <Clock
              size={17}
              className="shrink-0 text-sky-300"
              aria-hidden="true"
            />
            <span>{copy.contact.hoursValue}</span>
          </p>

          <div className="hero-enter hero-enter-delay-2 mt-5 grid gap-2.5 sm:mt-7 sm:flex sm:flex-wrap sm:gap-3">
            <CustomButton
              href={contactLinks.call}
              size="lg"
              className="w-full sm:w-auto"
            >
              <Phone
                size={18}
                aria-hidden="true"
              />
              {copy.call}
            </CustomButton>
            <CustomButton
              href={defaultWhatsAppLink(locale)}
              variant="outline"
              size="lg"
              className="w-full sm:w-auto"
            >
              <MessageCircle
                size={18}
                aria-hidden="true"
              />
              {copy.whatsapp}
            </CustomButton>
          </div>

          <p className="hero-enter hero-enter-delay-2 mt-4 max-w-lg text-xs leading-relaxed text-zinc-100/75 sm:text-[13px]">
            {copy.hero.note}
          </p>
        </div>
      </Container>

      <div
        id="hero-end"
        aria-hidden="true"
        className="absolute bottom-0 left-0 h-px w-px"
      />
    </section>
  )
}
