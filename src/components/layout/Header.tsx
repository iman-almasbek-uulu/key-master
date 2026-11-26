import { Logo } from '@/src/components/ui/logo'
import { localePath } from '@/src/config/site'
import { type Locale, getCopy } from '@/src/i18n/site-copy'

const navTargets = ['#services', '#steps', '#faq', '#contacts']

/** Шапка лежит поверх первого экрана, как в дизайне. На телефоне только логотип и язык. */
export function Header({ locale }: { locale: Locale }) {
  const copy = getCopy(locale)
  const languages = [
    { id: 'ru', label: 'РУС' },
    { id: 'ky', label: 'КЫР' },
  ] as const

  return (
    <header className="flex h-[70px] items-start justify-between gap-2 pt-3.5 desk:h-[88px] desk:items-center desk:pt-0">
      <a
        href="#top"
        aria-label={copy.homeLabel}
        className="block w-[346px] max-w-[calc(100%-100px)] rounded-sm desk:w-[clamp(240px,23.5vw,338px)]"
      >
        <Logo className="h-auto w-full" />
      </a>

      <nav
        aria-label={copy.navLabel}
        className="hidden items-center gap-[clamp(20px,2.78vw,40px)] desk:flex"
      >
        {copy.nav.map((label, index) => (
          <a
            key={navTargets[index]}
            href={navTargets[index]}
            className="rounded-sm text-[15px] font-semibold text-[#D5DAE0] transition-colors hover:text-brand"
          >
            {label}
          </a>
        ))}
      </nav>

      <nav
        aria-label={`${copy.languageLabel}: ${copy.language.ru} / ${copy.language.ky}`}
        className="flex shrink-0 gap-0.5"
      >
        {languages.map((language) => (
          <a
            key={language.id}
            href={localePath(language.id)}
            lang={language.id}
            aria-label={copy.language[language.id]}
            aria-current={locale === language.id ? 'page' : undefined}
            className={`flex min-h-11 min-w-11 items-center justify-center rounded-sm text-[13px] font-bold transition-colors hover:text-white ${
              locale === language.id ? 'text-brand' : 'text-[#8F98A3]'
            }`}
          >
            {language.label}
          </a>
        ))}
      </nav>
    </header>
  )
}
