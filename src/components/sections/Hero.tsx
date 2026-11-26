import { Header } from '@/src/components/layout/Header'
import { OpenStatus } from '@/src/components/ui/open-status'
import {
  contactLinks,
  defaultWhatsAppLink,
  whatsappWithMessage,
} from '@/src/config/links'
import { assetPath, contactPhones } from '@/src/config/site'
import { type Locale, getCopy } from '@/src/i18n/site-copy'

const phoneButton =
  'flex flex-col items-center justify-center rounded-[14px] border-2 border-brand text-center transition-transform active:scale-[0.99]'
const phoneNumber =
  'whitespace-nowrap font-display font-extrabold leading-[1.1]'

export function Hero({ locale }: { locale: Locale }) {
  const copy = getCopy(locale)
  const { hero } = copy
  const [first, second] = contactPhones
  const [lineA, lineB, lineC] = hero.headline

  return (
    <section
      id="top"
      className="relative h-[844px] overflow-hidden bg-panel text-white desk:h-[660px]"
    >
      <div className="hero-photo absolute left-1/2 top-[120px] h-[698px] w-full max-w-[560px] -translate-x-1/2 overflow-hidden desk:left-auto desk:right-0 desk:top-10 desk:h-[530px] desk:w-[min(640px,44.5vw)] desk:max-w-none desk:translate-x-0">
        <picture>
          <source
            media="(min-width: 1100px)"
            srcSet={assetPath('/images/generated/hero-locksmith-wide.webp')}
            type="image/webp"
          />
          <img
            src={assetPath('/images/generated/hero-locksmith-phone.webp')}
            alt={hero.imageAlt}
            fetchPriority="high"
            className="h-full w-full object-cover desk:absolute desk:right-0 desk:top-1/2 desk:h-auto desk:w-[146%] desk:max-w-none desk:-translate-y-1/2"
          />
        </picture>
      </div>

      <div className="relative z-10 mx-auto h-full w-full max-w-[560px] px-5 desk:max-w-[1440px] desk:px-[clamp(40px,5.56vw,80px)]">
        <Header locale={locale} />

        <div className="flex flex-col gap-[9px] desk:mt-4 desk:w-[min(760px,52.8vw)] desk:gap-3.5">
          <OpenStatus
            open={hero.open}
            closed={hero.closed}
            fallback={copy.contact.hoursValue}
          />

          <p
            className={`font-display font-extrabold uppercase leading-[.92] desk:text-[clamp(56px,6.11vw,88px)] desk:leading-[.9] ${
              hero.headlineLastBlock
                ? 'text-[clamp(38px,12.3vw,48px)]'
                : 'text-[clamp(40px,12.8vw,50px)]'
            }`}
          >
            {lineA}
            <br className="desk:hidden" /> {lineB}
            <br className="hidden desk:block" />{' '}
            <span
              className={`text-brand ${hero.headlineLastBlock ? 'block desk:inline' : ''}`}
            >
              {lineC}
            </span>
          </p>

          <h1 className="text-balance text-lg font-bold leading-snug text-white desk:text-[22px]">
            {hero.cityFirst ? (
              <>
                {hero.city} {hero.title}
              </>
            ) : (
              <>
                {hero.title} {hero.city}
              </>
            )}
          </h1>

          <p className="max-w-[340px] text-[15px] leading-normal text-[#D5DAE0] desk:max-w-[620px] desk:text-lg desk:leading-normal">
            <span className="desk:hidden">{hero.leadShort}</span>
            <span className="hidden desk:inline">{hero.lead}</span>
          </p>

          <div className="mt-1 grid grid-cols-2 gap-2 desk:grid-cols-3 desk:gap-3">
            <a
              href={first.href}
              aria-label={`${copy.call}: ${first.display}`}
              className={`${phoneButton} col-span-2 h-[68px] bg-brand text-ink desk:col-span-1 desk:h-[76px]`}
            >
              <span className="text-xs font-bold">{copy.call}</span>
              <span
                className={`${phoneNumber} text-[34px] desk:text-[clamp(24px,2.64vw,38px)]`}
              >
                {first.display}
              </span>
            </a>
            <a
              href={second.href}
              aria-label={`${copy.call}: ${second.display}`}
              className={`${phoneButton} h-[60px] bg-ink/85 text-white desk:h-[76px]`}
            >
              <span className="text-xs font-bold">{copy.call}</span>
              <span
                className={`${phoneNumber} text-[clamp(21px,6.4vw,25px)] desk:text-[clamp(24px,2.64vw,38px)]`}
              >
                {second.display}
              </span>
            </a>
            <a
              href={defaultWhatsAppLink(locale)}
              aria-label="WhatsApp"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-[60px] flex-col items-center justify-center rounded-[14px] border-2 border-wa bg-wa text-center text-[#06210F] transition-transform active:scale-[0.99] desk:h-[76px]"
            >
              <span className="text-xs font-bold">{hero.writeIn}</span>
              <span
                className={`${phoneNumber} text-[clamp(21px,6.4vw,25px)] desk:text-[clamp(22px,2.22vw,32px)]`}
              >
                WhatsApp
              </span>
            </a>
          </div>

          <a
            href={contactLinks.mapSearch}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute bottom-2.5 left-4 right-4 flex min-h-9 items-center justify-center text-xs text-[#C3C9D0] hover:text-white desk:static desk:min-h-8 desk:justify-start desk:text-sm"
          >
            {hero.addressLine} · {hero.onMap}
          </a>
        </div>
      </div>

      <ul className="absolute inset-x-[calc(clamp(40px,5.56vw,80px)-28px)] bottom-0 hidden h-24 border-t border-[#343A41] desk:flex">
        {hero.situations.map((item, index) => (
          <li
            key={item.title}
            className={`flex flex-1 ${index > 0 ? 'border-l border-[#343A41]' : ''}`}
          >
            <a
              href={whatsappWithMessage(item.draft)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center gap-5 px-7 transition-colors hover:bg-white/[0.04]"
            >
              <span
                aria-hidden="true"
                className="font-display text-[44px] font-extrabold text-brand"
              >
                {index + 1}
              </span>
              <span className="flex flex-col gap-1">
                <span className="text-[clamp(15px,1.25vw,18px)] font-bold">
                  {item.title}
                </span>
                <span className="text-sm text-[#B5BDC6]">{item.text}</span>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}
