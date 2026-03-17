import { Container } from "@/src/components/ui/container";
import { Section } from "@/src/components/ui/section";
import { services, Service } from "@/src/data/services";
import roadImg from "@/src/images/road.png";
import keysImg from "@/src/images/keys.jpg";
import duplicateImg from "@/src/images/duplicate.jpg";
import extraImg from "@/src/images/ab877b59-bcc4-4492-be39-8ced6e34526c.jpg";

const imageMap: Record<string, { src: string }> = {
  repair: keysImg,
  manufacturing: keysImg,
  sale: duplicateImg,
  programming: extraImg,
  recovery: keysImg,
  "on-site": roadImg,
};

function ServiceCard({ service }: { service: Service }) {
  const image = imageMap[service.id] ?? keysImg;

  return (
    <div className="group rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-[0_18px_40px_rgba(15,23,42,0.7)] hover:border-cyan-500/60 hover:shadow-[0_20px_45px_rgba(8,47,73,0.9)] transition-all duration-300">
      <div className="flex flex-col items-center text-center gap-4">
        <div className="w-full h-32 md:h-36 rounded-xl bg-slate-800/80 overflow-hidden flex items-center justify-center">
          <img
            src={image.src}
            alt={service.title}
            className="w-full h-full object-cover"
          />
        </div>
        <h3 className="text-xl font-semibold text-white">
          {service.title}
        </h3>
        <p className="text-slate-300/90 leading-relaxed text-sm md:text-base">
          {service.description}
        </p>
      </div>
    </div>
  );
}

export function ServicesSection() {
  return (
    <Section
      id="services"
      className=""
    >
      <Container>
        <div className="text-center mb-12 space-y-3">
          <h2 className="text-3xl md:text-4xl font-semibold text-white tracking-tight">
            Наши услуги
          </h2>
          <p className="text-slate-400 text-base md:text-lg max-w-2xl mx-auto">
            Полный спектр услуг по работе с автомобильными ключами
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-7">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
