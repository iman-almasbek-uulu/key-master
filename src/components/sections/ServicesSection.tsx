import { Container } from '@/src/components/ui/container'
import { serviceInquiry } from '@/src/config/links'
import { services } from '@/src/data/services'
import { type Locale, getCopy } from '@/src/i18n/site-copy'

export function ServicesSection({ locale }: { locale: Locale }) {
  const copy = getCopy(locale)

  return (
    <section
      id="services"
      className="bg-white py-12 text-ink desk:py-20"
    >
      <Container>
        <h2 className="section-title text-[clamp(32px,10.25vw,40px)] desk:text-[clamp(44px,4.44vw,64px)]">
          {copy.servicesSection.title}
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-x-14 desk:mt-10 desk:grid-cols-2">
          {services.map(({ id }) => {
            const service = copy.services[id]
            return (
              <article
                key={id}
                className="relative flex flex-col gap-1.5 border-t-2 border-ink py-[18px]"
              >
                <h3 className="section-title text-2xl leading-[1.05] desk:text-[30px]">
                  {service.title}
                </h3>
                <p className="text-[15px] leading-normal text-[#3F4750]">
                  {service.description}
                </p>
                <a
                  href={serviceInquiry(service.title, locale)}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${copy.servicesSection.inquire}: ${service.title}`}
                  className="w-fit text-sm font-bold underline after:absolute after:inset-0 hover:text-[#3F4750]"
                >
                  {copy.servicesSection.inquire}
                </a>
              </article>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
