import { ExternalLink, MapPin, MessageCircle, Phone, Send } from 'lucide-react'

import { Container } from '@/src/components/ui/container'
import { CustomButton } from '@/src/components/ui/custom-button'
import { Section } from '@/src/components/ui/section'
import { socialLinks } from '@/src/config/links'
import { siteConfig } from '@/src/config/site'

function ContactInfo() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl md:text-4xl font-semibold text-white mb-6 tracking-tight">
          Контакты
        </h2>
      </div>

      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <MapPin
            size={24}
            className="text-slate-400 flex-shrink-0 mt-1"
          />
          <div>
            <h3 className="text-white font-semibold mb-1">Местоположение</h3>
            <p className="text-slate-300">{siteConfig.address}</p>
            <p className="text-slate-400 text-sm mt-1">{siteConfig.city}</p>
          </div>
          <Phone
            size={24}
            className="text-slate-400 flex-shrink-0 mt-1"
          />
          <div>
            <h3 className="text-white font-semibold mb-1">Телефон</h3>
            <p className="text-slate-300">{siteConfig.phone}</p>
            <p className="text-slate-400 text-sm mt-1">{siteConfig.phone}</p>
          </div>
        </div>
      </div>

      <div className="pt-6 space-y-3">
        <CustomButton
          variant="primary"
          size="md"
          href={socialLinks.whatsapp}
          className="w-full sm:w-auto bg-[#25D366] hover:bg-[#1ebe5a] border border-[#1ebe5a]/70 text-white transition-colors duration-200"
        >
          <MessageCircle
            size={20}
            className="mr-2"
          />
          Написать в WhatsApp
        </CustomButton>

        <CustomButton
          variant="outline"
          size="md"
          href={socialLinks.telegram}
          className="w-full sm:w-auto ml-0 sm:ml-3 border-[#229ED9]/80 bg-[#229ED9] text-white hover:bg-[#1b8ec4] hover:border-[#1b8ec4]/90 hover:text-white transition-colors duration-200"
        >
          <Send
            size={20}
            className="mr-2"
          />
          Написать в Telegram
        </CustomButton>
      </div>

      <div className="pt-6 space-y-3">
        <CustomButton
          variant="secondary"
          size="sm"
          href={socialLinks.googleMaps}
          className="w-full sm:w-auto"
        >
          <ExternalLink
            size={16}
            className="mr-2"
          />
          Открыть в Google Maps
        </CustomButton>

        <CustomButton
          variant="secondary"
          size="sm"
          href={socialLinks.twoGis}
          className="w-full sm:w-auto ml-0 sm:ml-3"
        >
          <ExternalLink
            size={16}
            className="mr-2"
          />
          Открыть в 2GIS
        </CustomButton>
      </div>
    </div>
  )
}

export function ContactSection() {
  return (
    <Section
      id="contacts"
      className="bg-gradient-to-b from-slate-950 via-emerald-950 to-slate-950"
    >
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <ContactInfo />

          <div className="relative flex justify-center items-center bg-slate-950/70 border border-slate-800/80 rounded-2xl overflow-hidden h-[400px] lg:h-auto shadow-[0_18px_40px_rgba(15,23,42,0.7)]">
            <div className="pointer-events-none absolute top-4 left-4 z-10 inline-flex items-center gap-2 rounded-full bg-black/70 px-3 py-1 text-xs text-slate-100 border border-slate-700/80">
              <MapPin
                size={14}
                className="text-red-400"
              />
              <span>Мы здесь</span>
            </div>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d665.3788696188325!2d74.52215277697081!3d42.874415550338306!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNDLCsDUyJzI3LjkiTiA3NMKwMzEnMTguNyJF!5e1!3m2!1sru!2skg!4v1772969722839!5m2!1sru!2skg"
              width="600"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </Container>
    </Section>
  )
}
