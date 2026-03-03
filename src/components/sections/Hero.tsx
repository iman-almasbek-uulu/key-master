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
    <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm text-slate-100/90 border border-cyan-400/40 bg-slate-900/60 backdrop-blur-md shadow-[0_0_25px_rgba(34,211,238,0.25)]">
      <Icon size={16} className="text-cyan-300" />
      <span>{text}</span>
    </div>
  );
}

export function Hero() {
  return (
    <section className="relative h-screen overflow-hidden bg-black">
      <video
        autoPlay
        muted
        playsInline
        poster="/fallback-image.jpg" // Картинка, пока видео грузится
        className="absolute inset-0 z-0 h-full w-full object-cover"
      >
        <source src="/images/car.mp4" type="video/mp4" />
        Ваш браузер не поддерживает видео.
      </video>

      {/* Лёгкий градиент + «сеточка», чтобы видео оставалось заметным */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-b from-black/40 via-black/55 to-black/80" />
      <div className="pointer-events-none absolute inset-0 z-0 opacity-20 mix-blend-soft-light [background-image:radial-gradient(circle_at_1px_1px,#1f2937_1px,transparent_0)] [background-size:32px_32px]" />

      <Container className="relative z-10 flex h-screen items-center justify-center px-4">
        <div className="max-w-4xl mx-auto text-center rounded-[32px] border border-slate-700/40 bg-slate-900/45 px-6 py-10 md:px-10 md:py-12 backdrop-blur-xl shadow-[0_0_60px_rgba(15,23,42,0.7)]">
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <HeroBadge icon={MapPin} text={siteConfig.city} />
            <HeroBadge icon={Clock} text="Срочно / в день обращения" />
            <HeroBadge icon={Package} text="Большой ассортимент" />
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-white mb-6 leading-tight drop-shadow-[0_0_35px_rgba(8,47,73,0.85)]">
            {siteConfig.name}
          </h1>

          <p className="text-base md:text-lg text-slate-200/90 mb-10 leading-relaxed max-w-2xl mx-auto">
            {siteConfig.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <CustomButton
              variant="primary"
              size="lg"
              href={socialLinks.whatsapp}
              className="relative bg-[#25D366] text-white font-semibold hover:bg-[#1ebe5a] border border-[#1ebe5a]/70 transition-colors duration-200 group"
            >
              <MessageCircle size={20} className="mr-2" />
              Написать в WhatsApp
            </CustomButton>
            <CustomButton
              variant="outline"
              size="lg"
              className="border-[#229ED9]/80 bg-[#229ED9] text-white hover:bg-[#1b8ec4] hover:border-[#1b8ec4]/90 hover:text-white transition-colors duration-200 group"
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
