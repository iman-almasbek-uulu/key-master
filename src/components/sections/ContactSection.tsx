import { Container } from '@/src/components/ui/container'
import { contactLinks, defaultWhatsAppLink } from '@/src/config/links'
import { contactPhones } from '@/src/config/site'
import { type Locale, getCopy } from '@/src/i18n/site-copy'

export function ContactSection({ locale }: { locale: Locale }) {
  const copy = getCopy(locale)

  return (
    <section
      id="contacts"
      className="bg-ink py-12 text-white desk:py-20"
    >
      <Container>
        <h2 className="section-title text-[clamp(32px,10.25vw,40px)] desk:text-[clamp(44px,4.44vw,64px)]">
          {copy.contact.title}
        </h2>
        <p className="mt-6 max-w-3xl text-[17px] text-[#C3C9D0] desk:mt-10">
          {copy.contact.intro}
        </p>

        <div className="mt-6 flex flex-col gap-6 desk:mt-10 desk:gap-5">
          {contactPhones.map((phone) => (
            <a
              key={phone.id}
              href={phone.href}
              aria-label={`${phone.operator}: ${phone.display}`}
              className="flex w-fit flex-col transition-colors hover:text-brand"
            >
              <span className="text-[13px] font-bold text-brand">
                {phone.operator} · {copy.call}
              </span>
              <span className="section-title text-[clamp(40px,12.3vw,48px)] leading-[1.1] desk:text-[clamp(52px,5vw,72px)]">
                {phone.display}
              </span>
            </a>
          ))}
        </div>

        <div className="mt-6 flex flex-col gap-3 desk:mt-10 desk:flex-row">
          <a
            href={defaultWhatsAppLink(locale)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-14 items-center justify-center rounded-[14px] border-2 border-wa bg-wa px-7 text-base font-bold text-[#06210F] transition-opacity hover:opacity-90"
          >
            {copy.whatsapp}
          </a>
          <a
            href={contactLinks.telegram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={copy.contact.telegram}
            className="flex min-h-14 items-center justify-center rounded-[14px] border-2 border-[#5A636E] px-7 text-base font-bold text-white transition-colors hover:border-white"
          >
            Telegram
          </a>
        </div>
      </Container>
    </section>
  )
}
