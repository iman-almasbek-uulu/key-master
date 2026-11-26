import { contactLinks, defaultWhatsAppLink } from '@/src/config/links'
import { type Locale, getCopy } from '@/src/i18n/site-copy'

/** Закреплённые кнопки «Позвонить» и «WhatsApp» внизу экрана, только на телефоне. */
export function MobileContactBar({ locale }: { locale: Locale }) {
  const copy = getCopy(locale)

  return (
    <nav
      aria-label={copy.mobileContactLabel}
      className="fixed inset-x-0 bottom-0 z-40 flex gap-2 border-t border-[#343A41] bg-ink px-3 py-2.5 pb-[max(0.625rem,env(safe-area-inset-bottom))] desk:hidden"
    >
      <a
        href={contactLinks.call}
        className="flex min-h-[52px] flex-1 items-center justify-center rounded-xl bg-brand font-bold text-ink"
      >
        {copy.call}
      </a>
      <a
        href={defaultWhatsAppLink(locale)}
        target="_blank"
        rel="noopener noreferrer"
        className="flex min-h-[52px] flex-1 items-center justify-center rounded-xl bg-wa font-bold text-[#06210F]"
      >
        {copy.whatsappShort}
      </a>
    </nav>
  )
}
