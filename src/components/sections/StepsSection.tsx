import { CheckCircle, KeyRound, MessageSquare, Search } from 'lucide-react'

import { Container } from '@/src/components/ui/container'
import { Reveal } from '@/src/components/ui/reveal'
import { Section } from '@/src/components/ui/section'
import { getCopy, type Locale } from '@/src/i18n/site-copy'

const icons = [MessageSquare, Search, KeyRound, CheckCircle]

export function StepsSection({ locale }: { locale: Locale }) {
  const copy = getCopy(locale)
  return (
    <Section id="steps" className="border-b border-white/[0.06] bg-[#0b0d10] py-14 md:py-20">
      <Container>
        <Reveal className="max-w-2xl">
          <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl md:text-4xl">
            {copy.steps.title}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-zinc-400 sm:text-base">
            {copy.steps.intro}
          </p>
        </Reveal>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {copy.steps.items.map(([title, description], index) => {
            const Icon = icons[index]
            return (
              <Reveal key={title} delay={index * 70}>
                <div className="flex h-full flex-col rounded-2xl border border-white/10 bg-[#101419] p-5 transition-colors hover:border-sky-300/25">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-sky-300">
                      <Icon size={19} aria-hidden="true" />
                    </span>
                    <span className="text-[11px] font-medium tracking-[0.22em] text-zinc-500">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <h3 className="mt-5 text-base font-semibold leading-snug text-white">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-400">{description}</p>
                </div>
              </Reveal>
            )
          })}
        </div>
        <Reveal className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-2 border-t border-white/[0.07] pt-5 text-xs text-zinc-500 sm:text-[13px]">
          {copy.steps.facts.map((fact) => (
            <span key={fact}>{fact}</span>
          ))}
        </Reveal>
      </Container>
    </Section>
  )
}
