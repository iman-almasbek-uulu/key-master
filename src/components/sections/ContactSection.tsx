import { Clock, MapPin, MessageCircle, Navigation, Send } from 'lucide-react'

import { Container } from '@/src/components/ui/container'
import { CustomButton } from '@/src/components/ui/custom-button'
import { Section } from '@/src/components/ui/section'
import { contactLinks, defaultWhatsAppLink } from '@/src/config/links'
import { contactPhones } from '@/src/config/site'
import { getCopy, type Locale } from '@/src/i18n/site-copy'

export function ContactSection({ locale }: { locale: Locale }) {
  const copy = getCopy(locale)
  const address = copy.contact.streetAddress
  const city = copy.contact.cityName
  return (
    <Section
      id="contacts"
      className="bg-[#0b0d10] py-14 md:py-20"
    >
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl md:text-4xl">
              {copy.contact.title}
            </h2>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-zinc-400 sm:text-base">
              {copy.contact.intro}
            </p>

            <div className="mt-7 rounded-2xl border border-white/10 bg-[#12161b] p-5 sm:p-6">
              <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-zinc-500">
                {copy.contact.phone}
              </p>
              <div className="mt-2 grid gap-3 sm:grid-cols-2">
                {contactPhones.map((phone) => (
                  <div key={phone.id} className="min-w-0">
                    <span className="block text-xs font-semibold text-sky-300">{phone.operator}</span>
                    <a
                      href={phone.href}
                      aria-label={`${phone.operator}: ${phone.display}`}
                      className="mt-0.5 inline-flex text-lg font-semibold tracking-tight text-white transition-colors hover:text-sky-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 sm:text-xl"
                    >
                      {phone.display}
                    </a>
                  </div>
                ))}
              </div>

              <dl className="mt-6 space-y-4 border-t border-white/[0.07] pt-5">
                <div className="flex items-start gap-3">
                  <Clock
                    size={18}
                    className="mt-0.5 shrink-0 text-sky-300"
                    aria-hidden="true"
                  />
                  <div>
                    <dt className="text-xs uppercase tracking-[0.14em] text-zinc-500">
                      {copy.contact.hours}
                    </dt>
                    <dd className="mt-1 text-sm text-zinc-200">
                      {copy.contact.hoursValue}
                    </dd>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin
                    size={18}
                    className="mt-0.5 shrink-0 text-sky-300"
                    aria-hidden="true"
                  />
                  <div>
                    <dt className="text-xs uppercase tracking-[0.14em] text-zinc-500">
                      {copy.contact.address}
                    </dt>
                    <dd className="mt-1 text-sm leading-relaxed text-zinc-200">
                      {address}
                      <br />
                      {city}
                    </dd>
                  </div>
                </div>
              </dl>

              <div className="mt-6 grid gap-2.5 sm:grid-cols-2">
                <CustomButton
                  href={defaultWhatsAppLink(locale)}
                  size="md"
                  className="w-full"
                >
                  <MessageCircle
                    size={17}
                    aria-hidden="true"
                  />
                  {copy.whatsapp}
                </CustomButton>
                <CustomButton
                  href={contactLinks.route}
                  variant="outline"
                  size="md"
                  className="w-full"
                >
                  <Navigation
                    size={17}
                    aria-hidden="true"
                  />
                  {copy.contact.route}
                </CustomButton>
              </div>

              <a
                href={contactLinks.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex min-h-10 items-center gap-2 rounded-lg text-sm text-zinc-400 transition-colors hover:text-sky-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300"
              >
                <Send
                  size={15}
                  aria-hidden="true"
                />
                {copy.contact.telegram}
              </a>
            </div>
          </div>

          <figure className="flex h-full flex-col">
            <div className="relative min-h-[320px] flex-1 overflow-hidden rounded-2xl border border-white/10 bg-[#12161b] sm:min-h-[380px] lg:min-h-[460px]">
              <iframe
                title={`${copy.contact.mapTitle}: ${address}, ${city}`}
                src={locale === 'ky' ? `${contactLinks.mapEmbed}&hl=ky` : contactLinks.mapEmbed}
                width="600"
                height="450"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 h-full w-full"
              />
            </div>
            <figcaption className="mt-3 max-w-xl text-xs leading-relaxed text-zinc-500">
              {copy.contact.mapCaption}: {address}, {city}. {copy.contact.mapHint}
            </figcaption>
          </figure>
        </div>
      </Container>
    </Section>
  )
}
