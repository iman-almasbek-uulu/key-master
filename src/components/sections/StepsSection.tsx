import { CheckCircle, DollarSign, MessageSquare, Search } from 'lucide-react'

import { Container } from '@/src/components/ui/container'
import { Section } from '@/src/components/ui/section'

interface Step {
  number: number
  icon: typeof MessageSquare
  title: string
  description: string
}

const steps: Step[] = [
  {
    number: 1,
    icon: MessageSquare,
    title: 'Связь в мессенджере',
    description: 'Напишите нам в WhatsApp или Telegram',
  },
  {
    number: 2,
    icon: Search,
    title: 'Уточнение авто и ключа',
    description: 'Расскажите о марке автомобиля и типе ключа',
  },
  {
    number: 3,
    icon: DollarSign,
    title: 'Согласование цены',
    description: 'Узнаете точную стоимость работы',
  },
  {
    number: 4,
    icon: CheckCircle,
    title: 'Выполнение работы',
    description: 'Быстро и качественно изготовим ваш ключ',
  },
]

function StepCard({ step }: { step: Step }) {
  const Icon = step.icon

  return (
    <div className="relative group">
      <div className="flex flex-col items-center text-center gap-3 rounded-2xl border border-slate-800/80 bg-slate-950/70 px-5 py-6 shadow-[0_18px_40px_rgba(15,23,42,0.7)]">
        <div className="relative mb-2">
          <div className="bg-slate-900/90 px-4 py-3 rounded-full">
            <Icon
              size={26}
              className="text-cyan-300 group-hover:text-cyan-200 transition-colors duration-300"
            />
          </div>
          <div className="absolute -top-2 -right-2 bg-cyan-500 text-slate-950 w-8 h-8 rounded-full flex items-center justify-center font-semibold text-xs">
            {step.number}
          </div>
        </div>
        <h3 className="text-lg font-semibold text-white">{step.title}</h3>
        <p className="text-slate-300/90 leading-relaxed text-sm md:text-base">
          {step.description}
        </p>
      </div>
    </div>
  )
}

export function StepsSection() {
  return (
    <Section
      id="steps"
      className="bg-gradient-to-b from-slate-950 via-violet-950 to-slate-950"
    >
      <Container>
        <div className="text-center mb-12 space-y-3">
          <h2 className="text-3xl md:text-4xl font-semibold text-white tracking-tight">
            Как мы работаем
          </h2>
          <p className="text-slate-400 text-base md:text-lg max-w-2xl mx-auto">
            Простой процесс от заявки до готового ключа
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step) => (
            <StepCard
              key={step.number}
              step={step}
            />
          ))}
        </div>
      </Container>
    </Section>
  )
}
