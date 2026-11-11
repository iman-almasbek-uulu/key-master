'use client'

import { MessageCircle, Phone } from 'lucide-react'
import { useEffect, useState } from 'react'

import { contactLinks, defaultWhatsAppLink } from '@/src/config/links'
import { getCopy, type Locale } from '@/src/i18n/site-copy'

export function MobileContactBar({ locale }: { locale: Locale }) {
  const copy = getCopy(locale)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const sentinel = document.getElementById('hero-end')
    if (!sentinel) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(!entry.isIntersecting && entry.boundingClientRect.top < 0)
      },
      { threshold: 0 },
    )

    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [])

  if (!isVisible) return null

  return (
    <nav
      aria-label={copy.mobileContactLabel}
      className="bar-enter fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-[#0b0d10]/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl md:hidden"
    >
      <div className="mx-auto grid max-w-md grid-cols-2 gap-2 px-3 py-2.5">
        <a
          href={contactLinks.call}
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#34b9fe] px-3 text-sm font-semibold text-[#06121a] transition-colors hover:bg-[#67ccff] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-200 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b0d10]"
        >
          <Phone
            size={17}
            aria-hidden="true"
          />
          {copy.call}
        </a>
        <a
          href={defaultWhatsAppLink(locale)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/[0.04] px-3 text-sm font-semibold text-zinc-100 transition-colors hover:bg-white/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b0d10]"
        >
          <MessageCircle
            size={17}
            aria-hidden="true"
          />
          {copy.whatsappShort}
        </a>
      </div>
    </nav>
  )
}
