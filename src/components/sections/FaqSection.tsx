import { Container } from '@/src/components/ui/container'
import { type Locale, getCopy, getFaq } from '@/src/i18n/site-copy'

export function FaqSection({ locale }: { locale: Locale }) {
  const copy = getCopy(locale)
  const faqItems = getFaq(locale)

  return (
    <section
      id="faq"
      className="bg-fog py-12 text-ink desk:py-20"
    >
      <Container>
        <h2 className="section-title text-[clamp(32px,10.25vw,40px)] desk:text-[clamp(44px,4.44vw,64px)]">
          {copy.faq.title}
        </h2>

        {/* Ответы лежат в HTML: <details> открывается без скриптов */}
        <div className="mt-6 flex flex-col desk:mt-10">
          {faqItems.map((item) => (
            <details
              key={item.id}
              className="group border-t border-[#C9CED4] last:border-b"
            >
              <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-4 py-2 text-base font-bold desk:text-xl">
                {item.question}
                <span
                  aria-hidden="true"
                  className="shrink-0 text-[26px] leading-none"
                >
                  <span className="group-open:hidden">+</span>
                  <span className="hidden group-open:inline">−</span>
                </span>
              </summary>
              <p className="max-w-[900px] pb-5 text-[15px] leading-relaxed text-[#3F4750]">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  )
}
