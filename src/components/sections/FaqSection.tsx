"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Container } from "@/src/components/ui/container";
import { Section } from "@/src/components/ui/section";
import { faqItems, type FaqItem } from "@/src/data/faq";

function FaqItem({ item }: { item: FaqItem }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-lg overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-700/30 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-inset"
        aria-expanded={isOpen}
      >
        <h3 className="text-lg font-semibold text-white pr-4">
          {item.question}
        </h3>
        <ChevronDown
          size={24}
          className={`text-slate-400 flex-shrink-0 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-200 ${
          isOpen ? "max-h-96" : "max-h-0"
        }`}
      >
        <div className="p-6 pt-0">
          <p className="text-slate-300 leading-relaxed">{item.answer}</p>
        </div>
      </div>
    </div>
  );
}

export function FaqSection() {
  return (
    <Section id="faq" className="bg-slate-900/50">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Часто задаваемые вопросы
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Ответы на популярные вопросы о наших услугах
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqItems.map((item) => (
            <FaqItem key={item.id} item={item} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
