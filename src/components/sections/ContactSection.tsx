import { MapPin, Clock, MessageCircle, Send, ExternalLink } from "lucide-react";
import { Container } from "@/src/components/ui/container";
import { Section } from "@/src/components/ui/section";
import { CustomButton } from "@/src/components/ui/custom-button";
import { siteConfig } from "@/src/config/site";
import { socialLinks } from "@/src/config/links";

function ContactInfo() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
          Контакты
        </h2>
      </div>

      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <MapPin size={24} className="text-slate-400 flex-shrink-0 mt-1" />
          <div>
            <h3 className="text-white font-semibold mb-1">Местоположение</h3>
            <p className="text-slate-300">{siteConfig.city}</p>
            <p className="text-slate-400 text-sm mt-1">
              Точный адрес отправим в WhatsApp или Telegram
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Clock size={24} className="text-slate-400 flex-shrink-0 mt-1" />
          <div>
            <h3 className="text-white font-semibold mb-1">График работы</h3>
            <p className="text-slate-300">{siteConfig.workingHours}</p>
          </div>
        </div>
      </div>

      <div className="pt-6 space-y-3">
        <CustomButton
          variant="primary"
          size="md"
          href={socialLinks.whatsapp}
          className="w-full sm:w-auto"
        >
          <MessageCircle size={20} className="mr-2" />
          Написать в WhatsApp
        </CustomButton>

        <CustomButton
          variant="outline"
          size="md"
          href={socialLinks.telegram}
          className="w-full sm:w-auto ml-0 sm:ml-3"
        >
          <Send size={20} className="mr-2" />
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
          <ExternalLink size={16} className="mr-2" />
          Открыть в Google Maps
        </CustomButton>

        <CustomButton
          variant="secondary"
          size="sm"
          href={socialLinks.twoGis}
          className="w-full sm:w-auto ml-0 sm:ml-3"
        >
          <ExternalLink size={16} className="mr-2" />
          Открыть в 2GIS
        </CustomButton>
      </div>
    </div>
  );
}

export function ContactSection() {
  return (
    <Section id="contacts">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <ContactInfo />

          <div className="bg-slate-800/50 border border-slate-700 rounded-xl overflow-hidden h-[400px] lg:h-auto">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2924.0989419304154!2d74.58544731549639!3d42.87468500815282!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x389eb7dcc9e8b6bb%3A0x72b0c8a9e84e1234!2sBishkek!5e0!3m2!1sen!2skg!4v1234567890123!5m2!1sen!2skg"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Карта Бишкека"
            />
          </div>
        </div>
      </Container>
    </Section>
  );
}
