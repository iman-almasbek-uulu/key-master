import {
  Cpu,
  KeyRound,
  MapPin,
  ShieldCheck,
  Wrench,
  type LucideIcon,
} from 'lucide-react'

import { Container } from '@/src/components/ui/container'
import { Reveal } from '@/src/components/ui/reveal'
import { Section } from '@/src/components/ui/section'
import { serviceInquiry } from '@/src/config/links'
import { type ServiceId, services } from '@/src/data/services'
import { getCopy, type Locale } from '@/src/i18n/site-copy'

const serviceIcons: Record<string, LucideIcon> = {
  wrench: Wrench,
  key: KeyRound,
  cpu: Cpu,
  'shield-check': ShieldCheck,
  'map-pin': MapPin,
}

export function ServicesSection({ locale }: { locale: Locale }) {
  const copy = getCopy(locale)
  const localizedServices = Object.fromEntries(
    services.map((service) => [
      service.id,
      { ...service, ...copy.services[service.id] },
    ]),
  ) as Record<ServiceId, (typeof services)[number] & { title: string; description: string }>

  return (
    <Section id="services" className="border-b border-white/[0.06] bg-[#0d1014] py-12 md:py-20">
      <Container>
        <Reveal>
          <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl md:text-4xl">
            {copy.servicesSection.title}
          </h2>
        </Reveal>

        <div className="mt-5 grid gap-x-8 sm:grid-cols-2">
          {services.map((serviceItem) => {
            const service = localizedServices[serviceItem.id]
            const Icon = serviceIcons[service.icon] ?? KeyRound
            return (
              <article key={serviceItem.id} className="grid min-w-0 grid-cols-[18px_minmax(0,1fr)] items-start gap-x-3 border-t border-white/[0.08] py-3.5">
                <Icon size={17} className="row-span-3 mt-0.5 shrink-0 text-sky-300" aria-hidden="true" />
                <h3 className="min-w-0 text-sm font-semibold leading-snug text-zinc-100 sm:text-base">{service.title}</h3>
                <p className="col-start-2 mt-0.5 text-[13px] leading-snug text-zinc-400 sm:text-sm">{service.description}</p>
                <a
                  href={serviceInquiry(service.title, locale)}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${copy.servicesSection.inquire}: ${service.title}`}
                  className="col-start-2 mt-2 inline-flex min-h-9 w-fit max-w-full items-center justify-center rounded-[8px] border border-sky-300/35 px-3 text-xs font-medium text-sky-200 transition-colors hover:border-sky-200/60 hover:bg-sky-300/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0d1014] sm:text-[13px]"
                >
                  {copy.servicesSection.inquire}
                </a>
              </article>
            )
          })}
        </div>
      </Container>
    </Section>
  )
}
