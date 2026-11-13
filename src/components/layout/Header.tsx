'use client'

import { Menu, MessageCircle, Phone, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

import { Container } from '@/src/components/ui/container'
import { CustomButton } from '@/src/components/ui/custom-button'
import { contactLinks, defaultWhatsAppLink } from '@/src/config/links'
import { localePath, siteConfig } from '@/src/config/site'
import { getCopy, type Locale } from '@/src/i18n/site-copy'

export function Header({ locale }: { locale: Locale }) {
  const copy = getCopy(locale)
  const navItems = copy.nav.map((label, index) => ({
    href: ['#services', '#steps', '#faq', '#contacts'][index],
    label,
  }))
  const [isOpen, setIsOpen] = useState(false)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const firstLinkRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    if (!isOpen) return

    firstLinkRef.current?.focus()

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return

      setIsOpen(false)
      menuButtonRef.current?.focus()
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen])

  const closeMenu = () => setIsOpen(false)

  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.07] bg-[#0b0d10]/90 backdrop-blur-xl">
      <Container className="max-[359px]:!px-3">
        <div className="flex h-16 items-center justify-between gap-1 md:h-[76px] md:gap-6">
          <a
            href="#top"
            className="flex min-w-0 shrink-0 items-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b0d10]"
            aria-label={copy.homeLabel}
          >
            <span className="brand-wordmark whitespace-nowrap text-xs tracking-[0.08em] text-zinc-100 sm:text-sm sm:tracking-[0.14em]">
              {siteConfig.name}
            </span>
          </a>

          <nav
            aria-label={copy.navLabel}
            className="hidden items-center gap-6 xl:flex lg:gap-8"
          >
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-md py-2 text-sm text-zinc-400 transition-colors hover:text-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-1 xl:gap-3">
            <nav
              aria-label={`${copy.languageLabel}: ${copy.language.ru} / ${copy.language.ky}`}
              className="flex h-11 items-center gap-[3px] rounded-full border border-[#31414c] bg-[#10161b] p-[3px]"
            >
              <a
                href={localePath('ru')}
                lang="ru"
                aria-label={copy.language.ru}
                aria-current={locale === 'ru' ? 'page' : undefined}
                className={`inline-flex h-9 w-10 items-center justify-center rounded-full text-[11px] font-bold tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 focus-visible:ring-offset-1 focus-visible:ring-offset-[#0b0d10] ${locale === 'ru' ? 'bg-[#193746] text-[#b9e8ff]' : 'text-zinc-300 hover:bg-white/10 hover:text-white'}`}
              >
                РУС
              </a>
              <a
                href={localePath('ky')}
                lang="ky"
                aria-label={copy.language.ky}
                aria-current={locale === 'ky' ? 'page' : undefined}
                className={`inline-flex h-9 w-10 items-center justify-center rounded-full text-[11px] font-bold tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 focus-visible:ring-offset-1 focus-visible:ring-offset-[#0b0d10] ${locale === 'ky' ? 'bg-[#193746] text-[#b9e8ff]' : 'text-zinc-300 hover:bg-white/10 hover:text-white'}`}
              >
                КЫР
              </a>
            </nav>

            <div className="hidden text-right xl:block">
              <span className="block text-[10px] uppercase tracking-[0.2em] text-zinc-500">
                {copy.daily}
              </span>
              <a
                href={contactLinks.call}
                className="text-sm font-medium text-zinc-200 transition-colors hover:text-sky-300"
              >
                {siteConfig.phoneDisplay}
              </a>
            </div>
            <a
              href={contactLinks.call}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.025] text-zinc-300 transition-colors hover:bg-white/[0.06] hover:text-sky-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 xl:hidden"
              aria-label={copy.call}
            >
              <Phone size={18} aria-hidden="true" />
            </a>
            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setIsOpen((value) => !value)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.025] text-zinc-300 transition-colors hover:bg-white/[0.06] hover:text-sky-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 xl:hidden"
              aria-expanded={isOpen}
              aria-controls="mobile-nav"
              aria-label={isOpen ? copy.closeMenu : copy.openMenu}
            >
              {isOpen ? (
                <X size={18} aria-hidden="true" />
              ) : (
                <Menu size={18} aria-hidden="true" />
              )}
            </button>
            <CustomButton
              href={defaultWhatsAppLink(locale)}
              size="sm"
              className="hidden whitespace-nowrap xl:inline-flex"
            >
              <MessageCircle
                size={16}
                aria-hidden="true"
              />
              {copy.whatsappShort}
            </CustomButton>
          </div>

        </div>
      </Container>

      {isOpen && (
        <div
          id="mobile-nav"
          className="absolute inset-x-0 top-full border-b border-white/10 bg-[#0d1014]/[0.98] shadow-[0_24px_60px_rgba(0,0,0,0.45)] backdrop-blur-xl xl:hidden"
        >
          <Container className="py-4">
            <nav
              aria-label={copy.mobileNavLabel}
              className="grid gap-1"
            >
              {navItems.map((item, index) => (
                <a
                  key={item.href}
                  ref={index === 0 ? firstLinkRef : undefined}
                  href={item.href}
                  onClick={closeMenu}
                  className="rounded-xl px-3 py-3 text-base text-zinc-200 transition-colors hover:bg-white/[0.05] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <div className="mt-3 grid grid-cols-2 gap-2 border-t border-white/10 pt-4">
              <CustomButton
                href={contactLinks.call}
                size="md"
              >
                <Phone
                  size={17}
                  aria-hidden="true"
                />
                {copy.call}
              </CustomButton>
              <CustomButton
                href={defaultWhatsAppLink(locale)}
                variant="outline"
                size="md"
              >
                <MessageCircle
                  size={17}
                  aria-hidden="true"
                />
                {copy.whatsappShort}
              </CustomButton>
            </div>
          </Container>
        </div>
      )}
    </header>
  )
}
