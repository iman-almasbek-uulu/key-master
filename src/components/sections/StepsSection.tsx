import { Container } from '@/src/components/ui/container'
import { Reveal } from '@/src/components/ui/reveal'
import { Section } from '@/src/components/ui/section'
import { getCopy, type Locale } from '@/src/i18n/site-copy'

export function StepsSection({ locale }: { locale: Locale }) {
  const copy = getCopy(locale)
  return (
    <Section id="steps" className="border-b border-white/[0.06] bg-[#0b0d10] py-14 md:py-20">
      <Container>
        <Reveal className="max-w-2xl">
          <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl md:text-4xl">
            {copy.steps.title}
          </h2>
        </Reveal>
        <ol className="mt-5 grid gap-0 md:grid-cols-2 md:gap-x-8">
          {copy.steps.items.map(([title, description], index) => {
            return (
              <li key={title} className="border-t border-white/[0.08] py-3.5">
                <Reveal delay={index * 50} className="flex items-start gap-3.5">
                  <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-sky-300/30 text-xs font-semibold tabular-nums text-sky-300">
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="text-sm font-semibold leading-snug text-white sm:text-base">{title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-zinc-400">{description}</p>
                  </div>
                </Reveal>
              </li>
            )
          })}
        </ol>
      </Container>
    </Section>
  )
}
