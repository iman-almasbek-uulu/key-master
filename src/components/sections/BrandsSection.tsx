import { Container } from '@/src/components/ui/container'
import { Reveal } from '@/src/components/ui/reveal'
import { Section } from '@/src/components/ui/section'
import { brandNames, getCopy, type Locale } from '@/src/i18n/site-copy'

export function BrandsSection({ locale }: { locale: Locale }) {
  const copy = getCopy(locale)
  return (
    <Section
      id="brands"
      className="border-b border-white/[0.06] bg-[#0b0d10] py-14 md:py-20"
    >
      <Container>
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start lg:gap-16">
          <Reveal>
            <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl md:text-4xl">
              {copy.brands.title}
            </h2>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-zinc-400 sm:text-base">
              {copy.brands.description}
            </p>
          </Reveal>

          <Reveal delay={80}>
            <ul className="flex flex-wrap gap-2">
              {brandNames.map((brand) => (
                <li
                  key={brand}
                  className="rounded-lg border border-white/10 bg-white/[0.03] px-3.5 py-2 text-sm text-zinc-300 transition-colors hover:border-sky-300/25 hover:text-zinc-100"
                >
                  {brand}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Container>
    </Section>
  )
}
