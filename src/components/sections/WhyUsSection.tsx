import { Cpu, KeyRound, MapPin, Wrench } from 'lucide-react'

import { Container } from '@/src/components/ui/container'
import { Reveal } from '@/src/components/ui/reveal'
import { Section } from '@/src/components/ui/section'
import { getCopy, type Locale } from '@/src/i18n/site-copy'

const icons = [KeyRound, Wrench, Cpu, MapPin]

export function WhyUsSection({ locale }: { locale: Locale }) {
  const copy = getCopy(locale)
  return (
    <Section id="why-us" className="border-b border-white/[0.06] bg-[#0d1014] py-14 md:py-20">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <Reveal>
            <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl md:text-4xl">
              {copy.why.title}
            </h2>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-zinc-400 sm:text-base">
              {copy.why.intro}
            </p>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2">
            {copy.why.items.map(([title, description], index) => {
              const Icon = icons[index]
              return (
                <Reveal key={title} delay={index * 70}>
                  <div className="flex h-full items-start gap-4 rounded-2xl border border-white/10 bg-[#12161b] p-5 transition-colors hover:border-sky-300/25 sm:p-6">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-sky-300">
                      <Icon size={19} aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-white">{title}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-zinc-400">{description}</p>
                    </div>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </Container>
    </Section>
  )
}
