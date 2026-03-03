import { MessageCircle, Send, MapPin, Clock, Package } from "lucide-react";
import { Container } from "@/src/components/ui/container";
import { CustomButton } from "@/src/components/ui/custom-button";
import { siteConfig } from "@/src/config/site";
import { socialLinks } from "@/src/config/links";

function HeroBadge({
  icon: Icon,
  text,
}: {
  icon: typeof MapPin;
  text: string;
}) {
  return (
    <div className="inline-flex items-center gap-2 bg-slate-800/50 border border-slate-700 rounded-full px-4 py-2 text-sm text-slate-300">
      <Icon size={16} className="text-slate-400" />
      <span>{text}</span>
    </div>
  );
}

export function Hero() {
  return (
    <section className="p-0 m-0 relative overflow-hidden h-screen">
      <video
        autoPlay
        muted
        playsInline
        poster="/fallback-image.jpg" // Картинка, пока видео грузится
        className="absolute z-0 min-h-full min-w-full object-cover"
      >
        <source src="/images/car.mp4" type="video/mp4" />
        Ваш браузер не поддерживает видео.
      </video>
      <Container className="absolute z-10 top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <HeroBadge icon={MapPin} text={siteConfig.city} />
            <HeroBadge icon={Clock} text="Срочно / в день обращения" />
            <HeroBadge icon={Package} text="Большой ассортимент" />
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            {siteConfig.name}
          </h1>

          <p className="text-lg md:text-xl text-slate-300 mb-10 leading-relaxed max-w-2xl mx-auto">
            {siteConfig.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <CustomButton
              variant="primary"
              size="lg"
              href={socialLinks.whatsapp}
              className="bg-[#008B8B]"
            >
              <MessageCircle size={20} className="mr-2" />
              Написать в WhatsApp
            </CustomButton>
            <CustomButton
              variant="outline"
              size="lg"
              className="bg-[#4682B4]"
              href={socialLinks.telegram}
            >
              <Send size={20} className="mr-2" />
              Написать в Telegram
            </CustomButton>
          </div>
        </div>
      </Container>
    </section>
  );
}
