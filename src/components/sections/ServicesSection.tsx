import { Wrench, Key, ShoppingBag, Cpu, ShieldCheck } from "lucide-react";
import { Container } from "@/src/components/ui/container";
import { Section } from "@/src/components/ui/section";
import { services, Service } from "@/src/data/services";

const iconMap = {
  wrench: Wrench,
  key: Key,
  "shopping-bag": ShoppingBag,
  cpu: Cpu,
  "shield-check": ShieldCheck,
};

function ServiceCard({ service }: { service: Service }) {
  const Icon = iconMap[service.icon as keyof typeof iconMap];

  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 hover:border-slate-600 transition-colors duration-200">
      <div className="flex flex-col items-center text-center">
        <div className="bg-slate-700/50 p-4 rounded-lg mb-4">
          <Icon size={32} className="text-slate-300" />
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">
          {service.title}
        </h3>
        <p className="text-slate-400 leading-relaxed">{service.description}</p>
      </div>
    </div>
  );
}

export function ServicesSection() {
  return (
    <Section id="services" className="bg-[#082D36]">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Наши услуги
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Полный спектр услуг по работе с автомобильными ключами
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
