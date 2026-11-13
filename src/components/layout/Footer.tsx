import { MessageCircle, Send } from 'lucide-react'

import { Container } from '@/src/components/ui/container'
import { contactLinks, defaultWhatsAppLink } from '@/src/config/links'
import { siteConfig } from '@/src/config/site'
import { getCopy, type Locale } from '@/src/i18n/site-copy'

export function Footer({ locale }: { locale: Locale }) {
  const copy = getCopy(locale)
  const footerNav = copy.nav.map((label, index) => ({
    href: ['#services', '#steps', '#faq', '#contacts'][index],
    label,
  }))
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-white/[0.07] bg-[#080a0c] pb-28 pt-10 md:pb-10">
      <Container>
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between md:gap-12">
          <div className="max-w-sm">
            <a
              href="#top"
              className="inline-flex items-center rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300"
              aria-label={copy.footer.homeLabel}
            >
              <span className="brand-wordmark text-[13px] tracking-[0.14em] text-zinc-100">
                {siteConfig.name}
              </span>
            </a>
            <p className="mt-4 text-sm leading-relaxed text-zinc-500">
              {copy.footer.description}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:gap-14">
            <div>
              <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-zinc-500">
                {copy.footer.navigation}
              </p>
              <ul className="mt-3 space-y-2">
                {footerNav.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className="text-sm text-zinc-400 transition-colors hover:text-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-zinc-500">
                {copy.footer.contact}
              </p>
              <ul className="mt-3 space-y-2">
                <li>
                  <a
                    href={contactLinks.call}
                    className="text-sm text-zinc-400 transition-colors hover:text-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300"
                  >
                    {copy.call}
                  </a>
                </li>
                <li>
                  <a
                    href={defaultWhatsAppLink(locale)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm text-zinc-400 transition-colors hover:text-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300"
                  >
                    <MessageCircle
                      size={14}
                      aria-hidden="true"
                    />
                    {copy.whatsappShort}
                  </a>
                </li>
                <li>
                  <a
                    href={contactLinks.telegram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm text-zinc-400 transition-colors hover:text-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300"
                  >
                    <Send
                      size={14}
                      aria-hidden="true"
                    />
                    Telegram
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-9 flex flex-col gap-2 border-t border-white/[0.07] pt-5 text-xs text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {currentYear} {siteConfig.name}
          </p>
          <p>{copy.contact.hoursValue}</p>
        </div>
      </Container>
    </footer>
  )
}
