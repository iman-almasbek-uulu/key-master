import { siteConfig } from '@/src/config/site'

const whatsappNumber = siteConfig.phone.replace(/\D/g, '')

export const contactLinks = {
  call: `tel:${siteConfig.phone}`,
  whatsapp: `https://wa.me/${whatsappNumber}`,
  telegram: 'https://t.me/battali',
  route:
    'https://www.google.com/maps/dir/?api=1&destination=42.874412%2C74.521848',
  mapEmbed:
    'https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d665.3788696188325!2d74.52215277697081!3d42.874415550338306!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNDLCsDUyJzI3LjkiTiA3NMKwMzEnMTguNyJF!5e1!3m2!1sru!2skg!4v1772969722839!5m2!1sru!2skg',
} as const

// Kept as an alias for existing components that import socialLinks.
export const socialLinks = {
  whatsapp: contactLinks.whatsapp,
  telegram: contactLinks.telegram,
  googleMaps: contactLinks.route,
} as const

export const defaultWhatsAppMessage = {
  ru: 'Здравствуйте! Пишу с сайта. Хочу уточнить по автоключу. Марка, модель и год автомобиля: ',
  ky: 'Саламатсызбы! Сайттан жазып жатам. Авто ачкыч боюнча маалымат алгым келет. Унаанын маркасы, модели жана чыгарылган жылы: ',
} as const

export function whatsappWithMessage(message: string) {
  return `${contactLinks.whatsapp}?text=${encodeURIComponent(message.trim())}`
}

export function serviceInquiry(topic: string, locale: 'ru' | 'ky') {
  return whatsappWithMessage(
    locale === 'ky'
      ? `Саламатсызбы! ${topic} боюнча маалымат алгым келет. Тактоо үчүн унаанын маркасы, модели жана чыгарылган жылы: `
      : `Здравствуйте! Интересует: ${topic}. Подскажите, пожалуйста. Марка, модель и год автомобиля: `,
  )
}

export function defaultWhatsAppLink(locale: 'ru' | 'ky') {
  return whatsappWithMessage(defaultWhatsAppMessage[locale])
}
