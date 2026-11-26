import { Container } from '@/src/components/ui/container'
import { siteConfig } from '@/src/config/site'
import { type Locale, getCopy } from '@/src/i18n/site-copy'

export function Footer({ locale }: { locale: Locale }) {
  const copy = getCopy(locale)
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-[#343A41] bg-ink pb-28 pt-8 text-sm text-[#A7AFB8] desk:pb-8">
      <Container className="flex flex-col justify-between gap-2 desk:flex-row">
        <p>{copy.footer.description}</p>
        <p>
          © {currentYear}{' '}
          <a
            href="#top"
            aria-label={copy.footer.homeLabel}
            className="rounded-sm hover:text-white"
          >
            {siteConfig.name}
          </a>
        </p>
      </Container>
    </footer>
  )
}
