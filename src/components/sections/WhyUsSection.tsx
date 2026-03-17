import { DollarSign, MapPin, Package, Zap } from 'lucide-react'

import { Container } from '@/src/components/ui/container'
import { Section } from '@/src/components/ui/section'

interface Advantage {
  icon: typeof Zap
  title: string
  description: string
}

const advantages: Advantage[] = [
  {
    icon: Zap,
    title: 'Быстро',
    description: 'Большинство работ выполняем в день обращения',
  },
  {
    icon: DollarSign,
    title: 'Доступные цены',
    description: 'Честные цены без скрытых доплат',
  },
  {
    icon: Package,
    title: 'Большой ассортимент',
    description: 'Ключи и запчасти для всех популярных марок',
  },
  {
    icon: MapPin,
    title: 'Работаем в Бишкеке',
    description: 'Удобное расположение и возможность выезда',
  },
]

function AdvantageCard({ advantage }: { advantage: Advantage }) {
  const Icon = advantage.icon

  return (
    <div className="group rounded-2xl border border-cyan-400/60 bg-black text-white p-6 shadow-[0_18px_40px_rgba(0,0,0,0.9)] hover:border-cyan-300/90 hover:shadow-[0_22px_50px_rgba(8,47,73,0.95)] transition-all duration-300">
      <div className="flex items-start gap-4">
        <div className="bg-slate-900 p-3 rounded-xl flex-shrink-0">
          <Icon
            size={24}
            className="text-cyan-300 group-hover:text-cyan-200 transition-colors duration-300"
          />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white mb-1">
            {advantage.title}
          </h3>
          <p className="text-slate-300/90 leading-relaxed text-sm md:text-base">
            {advantage.description}
          </p>
        </div>
      </div>
    </div>
  )
}

export function WhyUsSection() {
  return (
    <Section
      id="why-us"
      className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-cyan-950 to-slate-950"
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-slate-950/90 via-cyan-950/70 to-slate-950/95" />
      <div className="pointer-events-none absolute inset-0 opacity-25 mix-blend-soft-light [background-image:radial-gradient(circle_at_1px_1px,#1f2937_1px,transparent_0)] [background-size:32px_32px]" />

      <Container>
        <div className="relative text-center mb-12 space-y-3">
          <h2 className="text-3xl md:text-4xl font-semibold text-white tracking-tight">
            Почему выбирают нас
          </h2>
          <p className="text-slate-400 text-base md:text-lg max-w-2xl mx-auto">
            Преимущества работы с нашим сервисом
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {advantages.map((advantage, index) => (
            <AdvantageCard
              key={index}
              advantage={advantage}
            />
          ))}
        </div>
      </Container>
    </Section>
  )
}
