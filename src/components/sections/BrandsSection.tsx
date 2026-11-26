import { Container } from '@/src/components/ui/container'
import { type Locale, brandGroups, getCopy } from '@/src/i18n/site-copy'

export function BrandsSection({ locale }: { locale: Locale }) {
  const copy = getCopy(locale)

  return (
    <section
      id="brands"
      className="bg-ink py-12 text-white desk:py-20"
    >
      <Container>
        <h2 className="section-title text-[clamp(32px,10.25vw,40px)] desk:text-[clamp(44px,4.44vw,64px)]">
          {copy.brands.title}
        </h2>
        <p className="mt-6 max-w-3xl text-base text-[#C3C9D0] desk:mt-10">
          {copy.brands.description}
        </p>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[#A7AFB8]">
          {copy.brands.detail}
        </p>

        <div className="mt-6 flex flex-col gap-5 desk:mt-10">
          {brandGroups.map((group) => (
            <div
              key={group.id}
              className="flex flex-col items-start gap-2 border-t border-[#343A41] pt-[18px] desk:flex-row desk:items-baseline desk:gap-8"
            >
              <h3 className="text-sm font-bold text-brand desk:w-[220px] desk:flex-none">
                {copy.brands.groups[group.id]}
              </h3>
              <ul className="flex flex-wrap gap-x-5 gap-y-1.5 desk:gap-x-10 desk:gap-y-2">
                {group.brands.map((brand) => (
                  <li
                    key={brand}
                    className="section-title text-[26px] desk:text-[clamp(30px,2.78vw,40px)]"
                  >
                    {brand}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
