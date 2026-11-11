'use client'

import { ChevronDown, MessageCircle } from 'lucide-react'
import { useState } from 'react'

import { Container } from '@/src/components/ui/container'
import { Section } from '@/src/components/ui/section'
import { defaultWhatsAppLink } from '@/src/config/links'
import { getFaq, getCopy, type Locale } from '@/src/i18n/site-copy'
import type { FaqItem } from '@/src/data/faq'

function FaqRow({ item }: { item: FaqItem }) {
  const [isOpen, setIsOpen] = useState(false)
  const triggerId = `faq-trigger-${item.id}`
  const panelId = `faq-panel-${item.id}`

  return (
    <div className="border-b border-white/10">
      <h3>
        <button
          id={triggerId}
          type="button"
          onClick={() => setIsOpen((value) => !value)}
          className="flex w-full items-center justify-between gap-4 py-4 text-left text-[15px] font-semibold text-zinc-100 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 sm:py-5 sm:text-base"
          aria-expanded={isOpen}
          aria-controls={panelId}
        >
          <span>{item.question}</span>
          <ChevronDown
            size={19}
            aria-hidden="true"
            className={`shrink-0 text-zinc-500 transition-transform duration-200 ${
              isOpen ? 'rotate-180 text-sky-300' : ''
            }`}
          />
        </button>
      </h3>
      <div
        id={panelId}
        role="region"
        aria-labelledby={triggerId}
        className={`grid transition-[grid-template-rows] duration-200 ${
          isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        }`}
      >
        <div className="overflow-hidden">
          <p className="max-w-3xl pb-5 pr-8 text-sm leading-relaxed text-zinc-400 sm:text-[15px]">
            {item.answer}
          </p>
        </div>
      </div>
    </div>
  )
}

export function FaqSection({ locale }: { locale: Locale }) {
  const copy = getCopy(locale)
  const faqItems = getFaq(locale)
  return (
    <Section
      id="faq"
      className="border-b border-white/[0.06] bg-[#0d1014] py-14 md:py-20"
    >
      <Container>
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl md:text-4xl">
              {copy.faq.title}
            </h2>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-zinc-400 sm:text-base">
              {copy.faq.intro}
            </p>
            <a
              href={defaultWhatsAppLink(locale)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-lg text-sm font-semibold text-sky-300 transition-colors hover:text-sky-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300"
            >
              <MessageCircle
                size={16}
                aria-hidden="true"
              />
              {copy.faq.contact}
            </a>
          </div>

          <div className="border-t border-white/10">
            {faqItems.map((item) => (
              <FaqRow
                key={item.id}
                item={item}
              />
            ))}
          </div>
        </div>
      </Container>
    </Section>
  )
}
