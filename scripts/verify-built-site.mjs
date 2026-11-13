import assert from 'node:assert/strict'
import { existsSync, readFileSync, statSync } from 'node:fs'
import { join } from 'node:path'

const outDir = join(process.cwd(), 'out')
const publicSite = JSON.parse(readFileSync(join(process.cwd(), 'src', 'config', 'public-site.json'), 'utf8'))
const normalizeBasePath = (value) => {
  const trimmed = value.trim().replace(/^\/+|\/+$/g, '')
  return trimmed ? `/${trimmed}` : ''
}
const deploymentBase = normalizeBasePath(
  process.env.NEXT_PUBLIC_BASE_PATH ??
    (process.env.NEXT_DEPLOYMENT_TARGET === 'github-pages' ? '/key-master' : ''),
)
const canonicalSite = new URL(process.env.NEXT_PUBLIC_SITE_URL ?? publicSite.url)
canonicalSite.pathname = `${canonicalSite.pathname.replace(/\/+$/, '')}/`
const pages = [
  { locale: 'ru', path: 'index.html', alternate: 'ky', image: 'og-autozamok.jpg' },
  { locale: 'ky', path: join('ky', 'index.html'), alternate: 'ru', image: 'og-autozamok.jpg' },
]
const failures = []
const check = (condition, message) => {
  if (!condition) failures.push(message)
}
const decodeHtml = (value) =>
  value
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
const stripTags = (value) =>
  decodeHtml(value)
    .replace(/<!--[^]*?-->/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
const attr = (tag, name) =>
  tag.match(new RegExp(`\\b${name}="([^"]*)"`, 'i'))?.[1] ?? ''
const normalizePath = (value) => value.replace(/\/+$/, '')

check(existsSync(join(outDir, 'index.html')), 'Не найден RU HTML в корне out')
check(existsSync(join(outDir, 'ky', 'index.html')), 'Не найден KY HTML в out/ky')

const htmlByLocale = new Map()
for (const page of pages) {
  const filePath = join(outDir, page.path)
  if (!existsSync(filePath)) continue
  const html = readFileSync(filePath, 'utf8')
  htmlByLocale.set(page.locale, html)
  const text = stripTags(html)
  const expectedHreflangs = new Map()
  const head = html.match(/<head[^>]*>([^]*?)<\/head>/i)?.[1] ?? ''
  const linkTags = [...head.matchAll(/<link\b[^>]*>/gi)].map(([tag]) => tag)
  const canonical = linkTags.find((tag) => /\brel="canonical"/i.test(tag))
  const canonicalUrl = canonical ? attr(canonical, 'href') : ''
  const parsedCanonical = canonicalUrl ? new URL(canonicalUrl) : null
  const hreflangTags = linkTags.filter((tag) => /\brel="alternate"/i.test(tag))
  const alternates = new Map(hreflangTags.map((tag) => [attr(tag, 'hreflang'), attr(tag, 'href')]))
  const title = head.match(/<title[^>]*>([^]*?)<\/title>/i)?.[1] ?? ''
  const description = head.match(/<meta\s+name="description"\s+content="([^"]*)"/i)?.[1] ??
    head.match(/<meta\s+content="([^"]*)"\s+name="description"/i)?.[1] ?? ''
  const h1s = [...html.matchAll(/<h1\b[^>]*>([^]*?)<\/h1>/gi)]
  const jsonLd = [...html.matchAll(/<script\s+type="application\/ld\+json">([^]*?)<\/script>/gi)]
    .map(([, content]) => {
      try {
        return JSON.parse(content)
      } catch {
        check(false, `${page.locale}: JSON-LD должен быть корректным JSON`)
        return null
      }
    })
    .filter(Boolean)
  const business = jsonLd.find((entry) => entry['@type'] === 'Locksmith')
  const faqSchema = jsonLd.find((entry) => entry['@type'] === 'FAQPage')
  const canonicalBase = normalizePath(canonicalSite.pathname)
  const expectedRu = canonicalSite.toString()
  const expectedKy = new URL('ky/', canonicalSite).toString()
  const expectedCanonical = page.locale === 'ru' ? expectedRu : expectedKy
  const expectedLanguagePath = page.locale === 'ru' ? expectedKy : expectedRu

  check(html.includes(`<html lang="${page.locale}">`), `${page.locale}: неверный lang документа`)
  check(h1s.length === 1, `${page.locale}: должен быть ровно один H1`)
  check(text.length > 1200, `${page.locale}: основной текст должен присутствовать в HTML без JavaScript`)
  check(Boolean(canonicalUrl), `${page.locale}: canonical отсутствует`)
  check(canonicalUrl === expectedCanonical, `${page.locale}: canonical должен вести на эту страницу (${expectedCanonical})`)
  check(alternates.size === 3, `${page.locale}: должны быть ровно три hreflang-ссылки`)
  check(alternates.get('ru') === expectedRu, `${page.locale}: hreflang ru должен вести на русскую страницу`)
  check(alternates.get('ky') === expectedKy, `${page.locale}: hreflang ky должен вести на кыргызскую страницу`)
  check(alternates.get('x-default') === expectedRu, `${page.locale}: x-default должен вести на русскую страницу`)
  check(alternates.get(page.locale) === canonicalUrl, `${page.locale}: hreflang должен включать текущую страницу`)
  check(alternates.get(page.alternate) === expectedLanguagePath, `${page.locale}: языковые страницы должны ссылаться друг на друга`)
  check(stripTags(title).length > 0 && stripTags(title).length <= 60, `${page.locale}: title должен быть осмысленным и не длиннее 60 символов`)
  check(stripTags(title).includes('autozamok'), `${page.locale}: title должен содержать autozamok`)
  check(
    stripTags(title) === (page.locale === 'ru'
      ? 'Автоключи в Бишкеке — изготовление и ремонт | autozamok'
      : 'Бишкекте унаа ачкычтарын жасоо жана оңдоо | autozamok'),
    `${page.locale}: неверный SEO title`,
  )
  check(text.includes('autozamok'), `${page.locale}: autozamok должен быть виден в шапке и подвале`)
  const headerLabel = page.locale === 'ru' ? 'autozamok Бишкек — на главную' : 'autozamok Бишкек — башкы бет'
  const footerLabel = page.locale === 'ru' ? 'autozamok Бишкек — наверх' : 'autozamok Бишкек — жогору'
  check(html.includes(`aria-label="${headerLabel}"`), `${page.locale}: доступная подпись шапки должна оставаться локализованной`)
  check(html.includes(`aria-label="${footerLabel}"`), `${page.locale}: доступная подпись подвала должна оставаться локализованной`)
  check(description.length > 0 && decodeHtml(description).length <= 160, `${page.locale}: description должен быть не длиннее 160 символов`)
  if (page.locale === 'ky') {
    check(stripTags(h1s[0]?.[1] ?? '') === 'Бишкекте унаа ачкычтарын жасоо жана оңдоо', 'ky: неверный H1')
    check(decodeHtml(description) === 'Бишкекте унаа ачкычтарын жасоо жана оңдоо. Чиптүү ачкычтын көчүрмөсүн жасайбыз, унааны ачабыз, смарт-ачкычты оңдойбуз. Бишкекке жана чет жакасына барабыз.', 'ky: неверный SEO description')
  }
  check(head.includes(`property="og:locale" content="${page.locale === 'ru' ? 'ru_KG' : 'ky_KG'}"`), `${page.locale}: неверный Open Graph locale`)
  check(head.includes(`property="og:url" content="${expectedCanonical}"`), `${page.locale}: Open Graph должен указывать на текущий адрес`)
  check(head.includes(`name="twitter:card" content="summary_large_image"`), `${page.locale}: должна быть Twitter Card с большим изображением`)
  check(head.includes(`property="og:title" content="${decodeHtml(stripTags(title))}"`), `${page.locale}: Open Graph title должен соответствовать title`)
  check(head.includes(`name="twitter:title" content="${decodeHtml(stripTags(title))}"`), `${page.locale}: Twitter title должен соответствовать title`)
  check(head.includes(page.image), `${page.locale}: неверное Open Graph изображение`)
  check(head.includes('property="og:image:width" content="1200"'), `${page.locale}: неверная ширина Open Graph изображения`)
  check(head.includes('property="og:image:height" content="630"'), `${page.locale}: неверная высота Open Graph изображения`)
  const ogImageUrl = head.match(/<meta\s+property="og:image"\s+content="([^"]+)"/i)?.[1]
  if (ogImageUrl) {
    const ogImagePath = new URL(ogImageUrl).pathname.replace(`${canonicalBase}/`, '')
    check(existsSync(join(outDir, ogImagePath)), `${page.locale}: файл Open Graph изображения должен существовать`)
  } else {
    check(false, `${page.locale}: Open Graph изображение отсутствует`)
  }
  check(jsonLd.length === 2 && business && faqSchema, `${page.locale}: должны быть Locksmith и FAQPage JSON-LD`)

  if (business) {
    const serviceEntries = business.hasOfferCatalog?.itemListElement ?? []
    check(business['@id']?.endsWith('#business'), `${page.locale}: ID бизнеса должен быть стабильным`)
    check(business.name === 'autozamok', `${page.locale}: данные мастерской должны содержать autozamok`)
    check(business.telephone === '+996704499678', `${page.locale}: основной телефон JSON-LD должен совпадать с контактами`)
    const contactPhones = business.contactPoint?.map((point) => point.telephone) ?? []
    check(contactPhones.includes('+996704499678') && contactPhones.includes('+996553465056'), `${page.locale}: JSON-LD должен содержать оба номера в ContactPoint`)
    check(business.sameAs?.includes('https://wa.me/996704499678') && business.sameAs?.includes('https://t.me/battali'), `${page.locale}: sameAs должен содержать реальные контакты`)
    check(business.hasMap === 'https://www.google.com/maps/dir/?api=1&destination=42.874412%2C74.521848', `${page.locale}: ссылка на карту должна быть в Locksmith JSON-LD`)
    check(business.areaServed?.name === (page.locale === 'ru' ? 'Бишкек и пригород' : 'Бишкек жана анын чет жакасы'), `${page.locale}: зона выезда JSON-LD должна быть локализована и ограничена Бишкеком и пригородом`)
    check(serviceEntries.length === 7 && serviceEntries.every((service) => service['@type'] === 'Service' && service.name && service.description), `${page.locale}: JSON-LD должен содержать семь локализованных реальных услуг типа Service`)
    check(serviceEntries.some((service) => service.name === (page.locale === 'ru' ? 'Автовскрытие' : 'Унааны ачуу')), `${page.locale}: автовскрытие должно быть локализовано в каталоге услуг`)
    for (const service of serviceEntries) {
      check(text.includes(service.name), `${page.locale}: название услуги JSON-LD должно быть на странице`)
      check(text.includes(service.description), `${page.locale}: описание услуги JSON-LD должно быть на странице`)
    }
    check(!('priceRange' in business) && !('aggregateRating' in business), `${page.locale}: не должно быть неподтверждённых цены или рейтинга`)
  }

  if (faqSchema) {
    const faqText = text
    const questions = faqSchema.mainEntity ?? []
    check(questions.length === 7, `${page.locale}: FAQPage должен совпадать с семью видимыми вопросами`)
    for (const question of questions) {
      check(faqText.includes(question.name), `${page.locale}: вопрос JSON-LD должен быть видимым на странице`)
      check(faqText.includes(question.acceptedAnswer?.text ?? '\0'), `${page.locale}: ответ JSON-LD должен быть видимым на странице`)
    }
  }

  check(page.locale === 'ru' ? text.includes('в Бишкеке') : text.includes('Бишкекте'), `${page.locale}: заголовок должен называть город`)
  check(text.includes(page.locale === 'ru' ? 'Проспект Дэн Сяопина, 457к' : 'Дэн Сяопин проспекти, 457к'), `${page.locale}: адрес мастерской должен быть локализован`)
  if (page.locale === 'ky') {
    check(text.includes('Устакананын дареги — Бишкек, Дэн Сяопин проспекти, 457к.'), 'ky: FAQ должен показывать полный адрес мастерской')
  }
  check(text.includes(page.locale === 'ru' ? 'Ежедневно с 9:00 до 21:00' : 'Күн сайын саат 9:00дөн 21:00гө чейин'), `${page.locale}: часы работы должны быть показаны на нужном языке`)
  check(['Ford', 'Chevrolet', 'Daewoo'].every((brand) => text.includes(brand)), `${page.locale}: в списке марок должны быть Ford, Chevrolet и Daewoo`)
  check(!/<meta\s+name="keywords"/i.test(head), `${page.locale}: не должно быть meta keywords`)
  check(!/стоимость|цена|цены|гаранти|30 минут|10\+ лет|5000\+|по регионам/i.test(text), `${page.locale}: найдены запрещённые цены или неподтверждённые обещания`)
  check(!/продажа ключей|иммобилайзер|круглосуточ/i.test(text), `${page.locale}: найдена неподтверждённая услуга`)
  check(text.includes('0704 499 678') && text.includes('0553 465 056'), `${page.locale}: оба номера должны быть видны на странице`)
  check(html.includes('href="tel:+996704499678"') && html.includes('href="tel:+996553465056"'), `${page.locale}: оба номера должны звонить по корректным tel-ссылкам`)
  check(text.includes('О!') && text.includes('MEGA'), `${page.locale}: операторы номеров должны быть подписаны`)

  const anchors = [...html.matchAll(/<a\b[^>]*>/gi)].map(([tag]) => ({ tag, href: attr(tag, 'href') }))
  const languageHrefs = anchors.map(({ href }) => href)
  check(languageHrefs.includes(`${deploymentBase}/`) && languageHrefs.includes(`${deploymentBase}/ky/`), `${page.locale}: переключатель должен содержать ссылки на оба языка с локальным basePath`)
  const whatsapp = anchors.filter(({ href }) => href.startsWith('https://wa.me/'))
  check(whatsapp.length >= 5, `${page.locale}: должны остаться ссылки WhatsApp из основных разделов`)
  check(whatsapp.some(({ tag }) => attr(tag, 'aria-label') === 'WhatsApp'), `${page.locale}: кнопка WhatsApp в первом экране должна иметь точную доступную подпись`)
  check(whatsapp.every(({ href }) => href.startsWith('https://wa.me/996704499678?text=')), `${page.locale}: все черновики должны вести на текущий номер`)
  for (const { href } of whatsapp) {
    let draft = ''
    try {
      draft = decodeURIComponent(href.split('?text=')[1] ?? '')
    } catch {
      check(false, `${page.locale}: черновик WhatsApp должен быть корректно закодирован`)
    }
    check(page.locale === 'ru' ? draft.includes('Марка, модель и год автомобиля') : draft.includes('маркасы, модели жана чыгарылган жылы'), `${page.locale}: черновик WhatsApp должен просить данные автомобиля на нужном языке`)
    check(!/стоимость|цена|баасы/i.test(draft), `${page.locale}: в черновике WhatsApp не должно быть цены`)
  }
  const serviceTopics = page.locale === 'ru'
    ? [
        'Изготовление ключей и дубликатов',
        'Изготовление по замку при потере всех ключей',
        'Ремонт автомобильных ключей',
        'Программирование чипов',
        'Ремонт и замена смарт-ключей',
        'Выезд по Бишкеку и пригороду',
        'Автовскрытие',
      ]
    : [
        'Ачкыч жасоо жана көчүрмөсү',
        'Бардык ачкыч жоголсо, кулпудан жасоо',
        'Авто ачкычты оңдоо',
        'Чипти программалоо',
        'Смарт-ачкычты оңдоо жана алмаштыруу',
        'Бишкекке жана чет жакасына чыгуу',
        'Унааны ачуу',
      ]
  const serviceActionLabel = page.locale === 'ru' ? 'Уточнить в WhatsApp' : 'WhatsApp аркылуу тактоо'
  const serviceInquiries = anchors.filter(({ tag }) =>
    decodeHtml(attr(tag, 'aria-label')).startsWith(`${serviceActionLabel}: `),
  )
  check(serviceInquiries.length === 7, `${page.locale}: у каждой из семи услуг должна быть своя кнопка уточнения`)
  const visibleServiceActionCount = [...html.matchAll(/<a\b[^>]*>[\s\S]*?<\/a>/gi)].filter(([markup]) => {
    const tag = markup.match(/^<a\b[^>]*>/i)?.[0] ?? ''
    return (
      decodeHtml(attr(tag, 'aria-label')).startsWith(`${serviceActionLabel}: `) &&
      stripTags(markup).includes(serviceActionLabel)
    )
  }).length
  check(visibleServiceActionCount === 7, `${page.locale}: полный текст кнопки должен быть виден у каждой из семи услуг`)
  for (const topic of serviceTopics) {
    const inquiry = serviceInquiries.find(({ tag }) => decodeHtml(attr(tag, 'aria-label')) === `${serviceActionLabel}: ${topic}`)
    check(Boolean(inquiry), `${page.locale}: должна быть доступная кнопка для услуги «${topic}»`)
    if (inquiry) {
      let draft = ''
      try {
        draft = decodeURIComponent(inquiry.href.split('?text=')[1] ?? '')
      } catch {
        check(false, `${page.locale}: черновик услуги «${topic}» должен быть корректно закодирован`)
      }
      check(draft.includes(topic), `${page.locale}: черновик должен спрашивать именно об услуге «${topic}»`)
      check(
        page.locale === 'ru' ? draft.startsWith(`Здравствуйте! Интересует: ${topic}.`) : draft.startsWith(`Саламатсызбы! ${topic} боюнча`),
        `${page.locale}: черновик услуги «${topic}» должен быть локализован`,
      )
    }
  }
  const imageTags = [...html.matchAll(/<img\b[^>]*>/gi)].map(([tag]) => tag)
  check(imageTags.length >= 1, `${page.locale}: фоновое изображение должно быть отрисовано в HTML`)
  check(imageTags.every((tag) => /\salt="/.test(tag)), `${page.locale}: у изображений должен быть alt`)
  check(html.includes('hero-locksmith-wide.webp') && html.includes('hero-locksmith-phone.webp'), `${page.locale}: первый экран должен использовать оба существующих фоновых изображения`)
  check(!/href="#"/.test(html), `${page.locale}: не должно быть пустых ссылок`)

  const iconLinks = linkTags.filter((tag) => /rel="(?:icon|apple-touch-icon)"/.test(tag))
  check(iconLinks.length >= 2, `${page.locale}: должны быть значок и Apple touch icon`)
  for (const tag of iconLinks) {
    const iconPath = new URL(attr(tag, 'href'), 'http://local.test').pathname
    check(iconPath.startsWith(`${deploymentBase}/`), `${page.locale}: локальный значок должен учитывать basePath сборки`)
    check(existsSync(join(outDir, iconPath.slice(deploymentBase.length).replace(/^\/+/, ''))), `${page.locale}: файл значка должен существовать`)
  }

  const resourceTags = [...html.matchAll(/<(?:script|link|img|source)\b[^>]*>/gi)].map(([tag]) => tag)
  for (const tag of resourceTags) {
    const rawUrl = attr(tag, 'src') || attr(tag, 'href') || attr(tag, 'srcset').split(/[ ,]/)[0]
    if (!rawUrl || !rawUrl.startsWith('/') || rawUrl.startsWith('//')) continue
    const resourcePath = new URL(rawUrl, 'http://local.test').pathname
    check(resourcePath.startsWith(`${deploymentBase}/`), `${page.locale}: локальные ресурсы должны учитывать basePath сборки (${resourcePath})`)
    const outputPath = resourcePath.slice(deploymentBase.length).replace(/^\/+/, '')
    if (resourcePath.includes('/_next/') || resourcePath.includes('/images/generated/')) {
      check(existsSync(join(outDir, outputPath)), `${page.locale}: файл ресурса должен существовать (${resourcePath})`)
    }
  }
}

const ruHtml = htmlByLocale.get('ru') ?? ''
const ruCanonical = ruHtml.match(/<link\b[^>]*rel="canonical"[^>]*>/i)?.[0]
const ruCanonicalUrl = ruCanonical ? new URL(attr(ruCanonical, 'href')) : null
const kyCanonical = htmlByLocale.get('ky')?.match(/<link\b[^>]*rel="canonical"[^>]*>/i)?.[0]
const kyCanonicalUrl = kyCanonical ? new URL(attr(kyCanonical, 'href')) : null
const sitemapPath = join(outDir, 'sitemap.xml')
const robotsPath = join(outDir, 'robots.txt')
check(existsSync(sitemapPath), 'В корне out должен быть sitemap.xml')
check(existsSync(robotsPath), 'В корне out должен быть robots.txt')
if (existsSync(sitemapPath) && ruCanonicalUrl && kyCanonicalUrl) {
  const sitemap = readFileSync(sitemapPath, 'utf8')
  check(sitemap.includes(`<loc>${ruCanonicalUrl.toString()}</loc>`), 'Sitemap должен содержать русскую страницу')
  check(sitemap.includes(`<loc>${kyCanonicalUrl.toString()}</loc>`), 'Sitemap должен содержать кыргызскую страницу')
  check(sitemap.includes('hreflang="ru"') && sitemap.includes('hreflang="ky"') && sitemap.includes('hreflang="x-default"'), 'Sitemap должен содержать взаимные варианты языков')
  const robots = readFileSync(robotsPath, 'utf8')
  check(/User-agent:\s*\*/i.test(robots) && /Allow:\s*\//i.test(robots), 'robots.txt должен разрешать обход страниц')
  check(robots.includes(new URL('sitemap.xml', ruCanonicalUrl).toString()), 'robots.txt должен указывать на публичный sitemap')
}

if (failures.length) {
  console.error('Проверка готовых RU/KY страниц не пройдена:')
  for (const failure of failures) console.error(`- ${failure}`)
  process.exit(1)
}

console.log('Готовые RU/KY страницы, SEO, JSON-LD, sitemap и WhatsApp проверены.')
