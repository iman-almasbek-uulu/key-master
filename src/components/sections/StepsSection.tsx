import { Container } from '@/src/components/ui/container'
import { type Locale, getCopy } from '@/src/i18n/site-copy'

export function StepsSection({ locale }: { locale: Locale }) {
  const copy = getCopy(locale)

  return (
    <section
      id="steps"
      className="bg-brand py-12 text-ink desk:py-20"
    >
      <Container>
        <h2 className="section-title text-[clamp(32px,10.25vw,40px)] desk:text-[clamp(44px,4.44vw,64px)]">
          {copy.steps.title}
        </h2>
        <ol className="mt-6 grid grid-cols-1 gap-7 desk:mt-10 desk:grid-cols-4 desk:gap-x-10">
          {copy.steps.items.map(([title, description], index) => (
            <li
              key={title}
              className="flex gap-[18px] desk:flex-col desk:gap-3"
            >
              <span
                aria-hidden="true"
                className="section-title text-[56px] leading-[.9] desk:text-[clamp(64px,6.67vw,96px)]"
              >
                {index + 1}
              </span>
              <div className="flex flex-col gap-1.5">
                <h3 className="section-title text-[26px] leading-tight">
                  {title}
                </h3>
                <p className="text-[15px] leading-[1.55]">{description}</p>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  )
}
