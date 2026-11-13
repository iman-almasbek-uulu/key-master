import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import { readFile } from 'node:fs/promises'

const root = new URL('..', import.meta.url)
const read = (path) => readFile(new URL(path, root), 'utf8')
const [site, publicSite, links, nextConfig, copy, services, faq, hero, metadata, sitemap, header, footer] =
  await Promise.all([
    read('src/config/site.ts'),
    read('src/config/public-site.json'),
    read('src/config/links.ts'),
    read('next.config.js'),
    read('src/i18n/site-copy.ts'),
    read('src/data/services.ts'),
    read('src/data/faq.ts'),
    read('src/components/sections/Hero.tsx'),
    read('src/config/localized-metadata.ts'),
    read('src/app/sitemap.ts'),
    read('src/components/layout/Header.tsx'),
    read('src/components/layout/Footer.tsx'),
  ])

assert.match(publicSite, /"url":\s*"https:\/\/autozamok\.kg\/"/)
assert.match(site, /defaultSiteUrl = publicSite\.url/)
assert.match(site, /number:\s*'\+996704499678'[\s\S]*display:\s*'0704 499 678'[\s\S]*operator:\s*'О!'[\s\S]*href:\s*'tel:\+996704499678'/)
assert.match(site, /number:\s*'\+996553465056'[\s\S]*display:\s*'0553 465 056'[\s\S]*operator:\s*'MEGA'[\s\S]*href:\s*'tel:\+996553465056'/)
assert.match(site, /phone:\s*contactPhones\[0\]\.number/)
assert.match(site, /workingHours:\s*'Ежедневно с 9:00 до 21:00'/)
assert.match(site, /address:\s*'Проспект Дэн Сяопина, 457к'/)
assert.match(site, /NEXT_PUBLIC_BASE_PATH/)
assert.match(site, /NEXT_DEPLOYMENT_TARGET === 'github-pages'/)
assert.match(links, /telegram:\s*'https:\/\/t\.me\/battali'/)
assert.match(links, /destination=42\.874412%2C74\.521848/)
assert.match(links, /wa\.me\/\$\{whatsappNumber\}/)
assert.match(links, /Унаанын маркасы, модели жана чыгарылган жылы/)
assert.doesNotMatch(links, /стоимость|цена|баасы|баа\s*:/i)
assert.match(links, /https:\/\/www\.google\.com\/maps\/embed\?/)
assert.match(nextConfig, /NEXT_PUBLIC_BASE_PATH/)
assert.match(nextConfig, /NEXT_DEPLOYMENT_TARGET === 'github-pages'/)
assert.match(nextConfig, /basePath,?/)
assert.match(metadata, /sameAs: \[contactLinks\.whatsapp, contactLinks\.telegram\]/)
assert.match(metadata, /contactPoint: contactPhones\.map/)
assert.match(metadata, /hasMap: contactLinks\.route/)
assert.match(metadata, /url: assetPath\('\/images\/generated\/favicon-32\.png'\)/)
assert.match(site, /name:\s*'autozamok'/)
assert.doesNotMatch(site, /shortName:/)
assert.match(copy, /Автоключи в Бишкеке — изготовление и ремонт \| \$\{siteConfig\.name\}/)
assert.match(copy, /Бишкекте унаа ачкычтарын жасоо жана оңдоо \| \$\{siteConfig\.name\}/)
assert.match(copy, /\$\{siteConfig\.name\} Бишкек — на главную/)
assert.match(copy, /\$\{siteConfig\.name\} Бишкек — башкы бет/)
assert.match(header, /\{siteConfig\.name\}/)
assert.match(footer, /\{siteConfig\.name\}/)
assert.doesNotMatch(`${header}\n${footer}`, /logo-mark\.webp|БИШКЕК/)
assert.match(metadata, /title: copy\.title/)
assert.match(metadata, /hero-locksmith-wide\.webp/)
assert.match(copy, /Чиптүү ачкычтын көчүрмөсүн жасайбыз, ачкычты оңдойбуз жана чипти программалайбыз\./)
assert.match(copy, /Унаанын бардык ачкычтары жоголсо, кулпусуна карап жаңы ачкыч жасап беребиз\./)
assert.match(copy, /Смарт-ачкычты оңдойбуз же жаңысына алмаштырабыз\./)
assert.match(copy, /Устакана кайда жана кайсы жерлерге барасыздар\?/)
assert.match(copy, /Устакананын дареги — \$\{locationDetails\.ky\.cityName\}, \$\{locationDetails\.ky\.streetAddress\}\./)
assert.match(copy, /Бизге чалыңыз, WhatsApp же Telegram аркылуу жазыңыз/)
assert.match(copy, /htmlLang: 'ru'/)
assert.match(copy, /htmlLang: 'ky'/)
assert.match(copy, /«Кыргызча»|Кыргызча/)
assert.match(copy, /Русский/)
assert.match(copy, /Бишкек жана анын чет жакасы/)
assert.match(copy, /Чипти программалоо|Чипти программалоо/)
assert.match(copy, /Откроем автомобиль, если ключи остались внутри или потерялись/)
assert.match(copy, /Ачкыч салондо калып же жоголуп калса, унааны ачып беребиз/)
assert.match(copy, /Ford/)
assert.match(copy, /Chevrolet/)
assert.match(copy, /Daewoo/)
assert.doesNotMatch(`${copy}\n${services}\n${faq}`, /30 минут|10\+ лет|5000\+|гарантию|стоимость услуг|продажа ключей|по регионам/i)
assert.match(services, /'manufacturing'/)
assert.match(services, /'repair'/)
assert.match(services, /'programming'/)
assert.match(services, /'recovery'/)
assert.match(services, /'smart'/)
assert.match(services, /'on-site'/)
assert.match(services, /'unlocking'/)
assert.match(faq, /interface FaqItem/)
assert.match(hero, /hero-locksmith-wide\.webp/)
assert.match(hero, /hero-locksmith-phone\.webp/)
assert.match(metadata, /hreflang|languages:/)
assert.match(metadata, /FAQPage/)
assert.match(sitemap, /pageUrl\('ru'\)/)
assert.match(sitemap, /pageUrl\('ky'\)/)

for (const [env, expectedPath] of [
  [{}, ''],
  [{ NEXT_PUBLIC_SITE_URL: 'https://key-master.test/canonical/nested/' }, ''],
  [{ NEXT_DEPLOYMENT_TARGET: 'github-pages' }, '/key-master'],
  [{ NEXT_PUBLIC_BASE_PATH: '' }, ''],
  [{ NEXT_DEPLOYMENT_TARGET: 'github-pages', NEXT_PUBLIC_BASE_PATH: '' }, ''],
  [{ NEXT_DEPLOYMENT_TARGET: 'github-pages', NEXT_PUBLIC_BASE_PATH: '/preview/site/' }, '/preview/site'],
]) {
  const result = spawnSync(
    process.execPath,
    ['-e', 'process.stdout.write(require("./next.config.js").basePath)'],
    {
      cwd: new URL('..', import.meta.url),
      encoding: 'utf8',
      env: {
        ...process.env,
        NEXT_PUBLIC_BASE_PATH: undefined,
        NEXT_DEPLOYMENT_TARGET: undefined,
        ...env,
      },
    },
  )
  assert.equal(result.status, 0, result.stderr)
  assert.equal(result.stdout, expectedPath, `Wrong asset base path for ${JSON.stringify(env)}`)
}

console.log('Локальные контакты, тексты RU/KY и конфигурация адресов проверены.')
