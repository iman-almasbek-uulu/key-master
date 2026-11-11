import {
  ArrowUpRight,
  Cpu,
  KeyRound,
  MapPin,
  MessageCircle,
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

const scenarios: { serviceId: ServiceId; icon: LucideIcon }[] = [
  { serviceId: 'recovery', icon: ShieldCheck },
  { serviceId: 'manufacturing', icon: KeyRound },
  { serviceId: 'repair', icon: Wrench },
]
const remainingServiceIds: ServiceId[] = ['programming', 'smart', 'on-site']

function InquiryLink({
  topic,
  label,
  locale,
}: {
  topic: string
  label: string
  locale: Locale
}) {
  const copy = getCopy(locale)
  return (
    <a
      href={serviceInquiry(topic, locale)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${copy.servicesSection.inquire}: ${label}`}
      className="inline-flex min-h-11 items-center gap-2 rounded-lg text-sm font-semibold text-sky-300 transition-colors hover:text-sky-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300"
    >
      <MessageCircle size={16} aria-hidden="true" />
      {copy.servicesSection.inquire}
      <ArrowUpRight size={15} aria-hidden="true" />
    </a>
  )
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
    <Section id="services" className="border-b border-white/[0.06] bg-[#0d1014] py-14 md:py-20">
      <Container>
        <Reveal className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl md:text-4xl">
              {copy.servicesSection.title}
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-zinc-400 md:text-right">
            {copy.servicesSection.description}
          </p>
        </Reveal>

        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {scenarios.map((scenario, index) => {
            const service = localizedServices[scenario.serviceId]
            const title = copy.servicesSection.scenarios[index]
            const Icon = scenario.icon
            return (
              <Reveal key={scenario.serviceId} delay={index * 70}>
                <article className="flex h-full flex-col rounded-2xl border border-white/10 bg-[#12161b] p-5 transition-colors hover:border-sky-300/30 sm:p-6">
                  <div className="flex justify-end">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-sky-300">
                      <Icon size={19} aria-hidden="true" />
                    </span>
                  </div>
                  <h3 className="mt-5 text-xl font-semibold tracking-tight text-white">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-400">{service.description}</p>
                  <div className="mt-auto pt-5">
                    <InquiryLink topic={`${title} — ${service.title.toLowerCase()}`} label={title} locale={locale} />
                  </div>
                </article>
              </Reveal>
            )
          })}
        </div>

        <Reveal className="mt-10 md:mt-12">
          <div className="flex flex-col gap-1 border-b border-white/10 pb-4 sm:flex-row sm:items-end sm:justify-between">
            <h3 className="text-lg font-semibold text-white">{copy.servicesSection.otherServices}</h3>
          </div>
          <div className="divide-y divide-white/[0.07]">
            {remainingServiceIds.map((id) => {
              const service = localizedServices[id]
              const Icon = serviceIcons[service.icon] ?? KeyRound
              return (
                <div key={id} className="grid gap-3 py-5 sm:grid-cols-[1fr_auto] sm:items-center sm:gap-8">
                  <div className="flex min-w-0 items-start gap-3.5">
                    <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-sky-300">
                      <Icon size={17} aria-hidden="true" />
                    </span>
                    <div className="min-w-0">
                      <h4 className="text-base font-semibold text-zinc-100">{service.title}</h4>
                      <p className="mt-1 text-sm leading-relaxed text-zinc-400">{service.description}</p>
                    </div>
                  </div>
                  <InquiryLink topic={service.title} label={service.title} locale={locale} />
                </div>
              )
            })}
          </div>
        </Reveal>
      </Container>
    </Section>
  )
}
