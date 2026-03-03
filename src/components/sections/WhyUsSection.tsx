import { Zap, DollarSign, Package, MapPin } from "lucide-react";
import { Container } from "@/src/components/ui/container";
import { Section } from "@/src/components/ui/section";

interface Advantage {
  icon: typeof Zap;
  title: string;
  description: string;
}

const advantages: Advantage[] = [
  {
    icon: Zap,
    title: "Быстро",
    description: "Большинство работ выполняем в день обращения",
  },
  {
    icon: DollarSign,
    title: "Доступные цены",
    description: "Честные цены без скрытых доплат",
  },
  {
    icon: Package,
    title: "Большой ассортимент",
    description: "Ключи и запчасти для всех популярных марок",
  },
  {
    icon: MapPin,
    title: "Работаем в Бишкеке",
    description: "Удобное расположение и возможность выезда",
  },
];

function AdvantageCard({ advantage }: { advantage: Advantage }) {
  const Icon = advantage.icon;

  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 hover:border-slate-600 transition-colors duration-200">
      <div className="flex items-start gap-4">
        <div className="bg-slate-700/50 p-3 rounded-lg flex-shrink-0">
          <Icon size={24} className="text-slate-300" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white mb-2">
            {advantage.title}
          </h3>
          <p className="text-slate-400 leading-relaxed">
            {advantage.description}
          </p>
        </div>
      </div>
    </div>
  );
}

export function WhyUsSection() {
  return (
    <Section
      id="why-us"
      className="bg-[url(https://wallpaper.forfun.com/fetch/aa/aae0b5e796321474dbe7cb2aa5f23edb.jpeg)] bg-cover bg-center bg-fixed bg-black/60 
    bg-blend-multiply"
    >
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Почему выбирают нас
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Преимущества работы с нашим сервисом
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {advantages.map((advantage, index) => (
            <AdvantageCard key={index} advantage={advantage} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
