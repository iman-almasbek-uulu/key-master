import { Clock, MessageCircle, Phone } from 'lucide-react'

import { Container } from '@/src/components/ui/container'
import { defaultWhatsAppLink } from '@/src/config/links'
import { assetPath, contactPhones, siteConfig } from '@/src/config/site'
import { getCopy, type Locale } from '@/src/i18n/site-copy'

export function Hero({ locale }: { locale: Locale }) {
  const copy = getCopy(locale)
  return (
    <section
      id="top"
      className="relative isolate min-h-[calc(100svh-4rem)] overflow-hidden border-b border-white/[0.06] bg-[#0b0d10] md:min-h-[calc(100svh-4.75rem)]"
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
        <span className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(11,13,16,0.94)_0%,rgba(11,13,16,0.78)_52%,rgba(11,13,16,0.56)_100%)]" />
      </div>

      <Container className="relative z-10 flex min-h-[inherit] items-center justify-center py-6 sm:py-10">
        <div className="w-full min-w-0 max-w-[780px] text-center">
          <h1 className="hero-enter text-balance text-[1.8rem] leading-[1.12] tracking-[-0.025em] text-zinc-50 sm:text-[2.5rem] lg:text-[3rem]">
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

          <p className="brand-wordmark hero-enter hero-enter-delay-1 mt-1 text-[3.25rem] leading-[0.98] tracking-[-0.035em] text-sky-300 sm:text-[4.1rem] lg:text-[5.25rem]">
            {siteConfig.name}
          </p>

          <div className="hero-enter hero-enter-delay-2 mx-auto mt-4 grid w-full max-w-[760px] gap-2 sm:mt-5 md:grid-cols-3">
            {contactPhones.map((phone) => (
              <a
                key={phone.id}
                href={phone.href}
                aria-label={`${copy.call}: ${phone.display}`}
                className="group flex min-h-12 min-w-0 w-full items-center gap-2 rounded-xl border border-white/10 bg-[#151b21] px-3 text-zinc-50 transition-colors hover:border-sky-300/35 hover:bg-[#1a2229] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b0d10]"
              >
                <Phone size={17} aria-hidden="true" className="shrink-0 text-[#79cefa]" />
                <span className="min-w-0 flex-1 whitespace-nowrap text-sm font-semibold tabular-nums tracking-[0.01em] transition-colors group-hover:text-sky-100 sm:text-[15px]">
                  {phone.display}
                </span>
                <span className="shrink-0 text-xs text-zinc-400 transition-colors group-hover:text-zinc-200 sm:text-[13px]">
                  {copy.call}
                </span>
              </a>
            ))}
            <a
              href={defaultWhatsAppLink(locale)}
              aria-label="WhatsApp"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex min-h-12 w-full items-center justify-center gap-2 rounded-xl border border-[#8cdbb0]/30 bg-[#173428] px-3 text-zinc-50 transition-colors hover:border-[#8cdbb0]/55 hover:bg-[#1c4031] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8cdbb0] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b0d10]"
            >
              <MessageCircle size={18} aria-hidden="true" className="shrink-0 text-[#8cdbb0]" />
              <span className="text-sm font-semibold transition-colors group-hover:text-white sm:text-[15px]">
                {copy.whatsappShort}
              </span>
            </a>
          </div>

          <p className="hero-enter hero-enter-delay-2 mx-auto mt-3 flex max-w-full items-center justify-center gap-2 text-center text-sm leading-snug text-zinc-100/90">
            <Clock size={16} className="shrink-0 text-sky-300" aria-hidden="true" />
            {copy.contact.hoursValue}
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
