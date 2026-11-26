import { Container } from '@/src/components/ui/container'
import { contactLinks } from '@/src/config/links'
import { type Locale, getCopy } from '@/src/i18n/site-copy'

export function WhereSection({ locale }: { locale: Locale }) {
  const copy = getCopy(locale)
  const address = copy.contact.streetAddress
  const city = copy.contact.cityName

  return (
    <section
      id="where"
      className="bg-ink py-8 text-white desk:py-14"
    >
      <Container>
        <div className="flex flex-col gap-5 desk:flex-row desk:items-center desk:gap-16">
          <div className="flex flex-col gap-5 desk:w-[clamp(340px,30.6vw,440px)] desk:flex-none">
            <h2 className="section-title text-[clamp(32px,10.25vw,40px)] desk:text-[clamp(44px,4.44vw,64px)]">
              {copy.where.title}
            </h2>
            <div className="flex flex-col gap-1.5">
              <span className="text-[13px] text-[#A7AFB8]">
                {copy.contact.address}
              </span>
              <span className="text-lg font-bold desk:text-[22px]">
                {address}, {city}
              </span>
            </div>
            <div className="flex flex-col gap-1.5">
              <span className="text-[13px] text-[#A7AFB8]">
                {copy.contact.hours}
              </span>
              <span className="text-lg font-bold desk:text-[22px]">
                {copy.contact.hoursValue}
              </span>
            </div>
            <div className="flex">
              <a
                href={contactLinks.route2gis}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-14 items-center justify-center rounded-[14px] border-2 border-brand bg-brand px-7 text-base font-bold text-ink transition-opacity hover:opacity-90"
              >
                {copy.contact.route}
              </a>
            </div>
          </div>

          <iframe
            title={`${copy.contact.mapTitle}: ${address}, ${city}`}
            src={
              locale === 'ky'
                ? `${contactLinks.mapEmbed}&hl=ky`
                : contactLinks.mapEmbed
            }
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-[300px] w-full min-w-0 rounded-2xl border-2 border-brand desk:h-[520px] desk:flex-1"
          />
        </div>
      </Container>
    </section>
  )
}
