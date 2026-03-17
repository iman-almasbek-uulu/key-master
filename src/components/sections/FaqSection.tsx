'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

import { Container } from '@/src/components/ui/container'
import { Section } from '@/src/components/ui/section'
import { type FaqItem, faqItems } from '@/src/data/faq'

function FaqItem({ item }: { item: FaqItem }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="bg-slate-950/70 border border-slate-800/80 rounded-2xl overflow-hidden shadow-[0_18px_40px_rgba(15,23,42,0.7)]">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-slate-900/60 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-inset"
        aria-expanded={isOpen}
      >
        <h3 className="text-lg font-semibold text-white pr-4">
          {item.question}
        </h3>
        <ChevronDown
          size={24}
          className={`text-slate-400 flex-shrink-0 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-200 ${
          isOpen ? 'max-h-96' : 'max-h-0'
        }`}
      >
        <div className="px-6 pb-5 pt-0">
          <p className="text-slate-300/90 leading-relaxed text-sm md:text-base">
            {item.answer}
          </p>
        </div>
      </div>
    </div>
  )
}

export function FaqSection() {
  return (
    <Section
      id="faq"
      className="bg-gradient-to-b from-slate-950 via-slate-900 to-sky-900"
    >
      <Container>
        <div className="text-center mb-12 space-y-3">
          <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4 tracking-tight">
            Часто задаваемые вопросы
          </h2>
          <p className="text-slate-400 text-base md:text-lg max-w-2xl mx-auto">
            Ответы на популярные вопросы о наших услугах
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqItems.map((item) => (
            <FaqItem
              key={item.id}
              item={item}
            />
          ))}
        </div>
      </Container>
    </Section>
  )
}
