import { MessageSquare, Search, DollarSign, CheckCircle } from "lucide-react";
import { Container } from "@/src/components/ui/container";
import { Section } from "@/src/components/ui/section";

interface Step {
  number: number;
  icon: typeof MessageSquare;
  title: string;
  description: string;
}

const steps: Step[] = [
  {
    number: 1,
    icon: MessageSquare,
    title: "Связь в мессенджере",
    description: "Напишите нам в WhatsApp или Telegram",
  },
  {
    number: 2,
    icon: Search,
    title: "Уточнение авто и ключа",
    description: "Расскажите о марке автомобиля и типе ключа",
  },
  {
    number: 3,
    icon: DollarSign,
    title: "Согласование цены",
    description: "Узнаете точную стоимость работы",
  },
  {
    number: 4,
    icon: CheckCircle,
    title: "Выполнение работы",
    description: "Быстро и качественно изготовим ваш ключ",
  },
];

function StepCard({ step }: { step: Step }) {
  const Icon = step.icon;

  return (
    <div className="relative">
      <div className="flex flex-col items-center text-center">
        <div className="relative mb-6">
          <div className="bg-slate-500 p-4 rounded-full">
            <Icon size={28} className="text-white" />
          </div>
          <div className="absolute -top-2 -right-2 bg-slate-700 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
            {step.number}
          </div>
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">{step.title}</h3>
        <p className="text-slate-400 leading-relaxed">{step.description}</p>
      </div>
    </div>
  );
}

export function StepsSection() {
  return (
    <Section id="steps" className="bg-slate-900/50">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Как мы работаем
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Простой процесс от заявки до готового ключа
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step) => (
            <StepCard key={step.number} step={step} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
