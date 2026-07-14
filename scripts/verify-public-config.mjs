import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'

const root = new URL('..', import.meta.url)
const read = (path) => readFile(new URL(path, root), 'utf8')

const [site, links, hero, socialLinks, layout] = await Promise.all([
  read('src/config/site.ts'),
  read('src/config/links.ts'),
  read('src/components/sections/Hero.tsx'),
  read('src/components/ui/social-links.tsx'),
  read('src/app/layout.tsx'),
])

assert.match(
  site,
  /phone:\s*'\+996704499678'/,
  'Телефон должен быть полным и пригодным для tel:-ссылок',
)
assert.match(
  site,
  /workingHours:\s*'Ежедневно с 9:00 до 21:00'/,
  'График должен быть единым',
)
assert.match(
  site,
  /url:\s*'https:\/\/iman-almasbek-uulu\.github\.io\/key-master\/'/,
  'Публичный URL должен соответствовать публикации',
)
assert.doesNotMatch(
  links,
  /your_handle|EVA-%D0%BF%D0%BE%D0%BB%D0%B8%D0%BA%D0%BE%D0%B2/i,
  'В публичных ссылках не должно быть заглушек или чужого бизнеса',
)
assert.doesNotMatch(
  hero,
  /value: '24\/7'/,
  'Hero не должен противоречить официальному графику',
)
assert.doesNotMatch(
  socialLinks,
  /Instagram/,
  'Неподтверждённый Instagram не должен отображаться',
)
assert.match(
  layout,
  /openingHours: 'Mo-Su 09:00-21:00'/,
  'Schema.org-график должен совпадать с сайтом',
)

console.log('Публичные контакты, ссылки и график проверены.')
