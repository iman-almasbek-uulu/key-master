'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ChevronRight, Clock, Key, Phone } from 'lucide-react'

import { Container } from '@/src/components/ui/container'
import { CustomButton } from '@/src/components/ui/custom-button'
import { siteConfig } from '@/src/config/site'

export function Hero() {
  const section = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const media = gsap.matchMedia()

      media.add('(prefers-reduced-motion: no-preference)', () => {
        const timeline = gsap.timeline({
          defaults: { ease: 'power3.out' },
        })

        timeline
          .from('[data-hero-item="badge"]', { autoAlpha: 0, y: 18, duration: 0.55 })
          .from('[data-hero-item="title"]', { autoAlpha: 0, y: 28, duration: 0.7 }, '-=0.25')
          .from('[data-hero-item="description"]', { autoAlpha: 0, y: 20, duration: 0.55 }, '-=0.35')
          .from('[data-hero-item="actions"]', { autoAlpha: 0, y: 18, duration: 0.5 }, '-=0.3')
          .from('[data-hero-item="stats"]', { autoAlpha: 0, y: 18, duration: 0.5 }, '-=0.2')

        gsap.to('[data-hero-glow="left"]', {
          x: 28,
          y: -18,
          scale: 1.12,
          duration: 4.5,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
        })
        gsap.to('[data-hero-glow="right"]', {
          x: -22,
          y: 16,
          scale: 1.08,
          duration: 5.25,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
        })
      })

      return () => media.revert()
    },
    { scope: section },
  )

  return (
    <section
      ref={section}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <picture className="absolute inset-0">
        <source media="(max-width: 639px)" srcSet="images/hero-locksmith-mobile-v2.png" />
        <img
          src="images/hero-locksmith.png"
          alt=""
          className="h-full w-full object-cover object-center brightness-150 contrast-125 max-sm:object-contain max-sm:object-top"
        />
      </picture>
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/20 via-transparent to-slate-950/20" />
      <div className="absolute inset-0 grid-pattern" />
      <div className="absolute inset-0 diagonal-lines" />

      <div
        data-hero-glow="left"
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl will-change-transform"
      />
      <div
        data-hero-glow="right"
        className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl will-change-transform"
      />

      <div className="absolute top-16 right-6 sm:right-10 lg:right-20 opacity-[0.06]">
        <Key className="w-[240px] h-[240px] sm:w-[320px] sm:h-[320px] lg:w-[420px] lg:h-[420px] rotate-45" />
      </div>

      <Container className="relative z-10 py-24 sm:py-28 lg:py-32">
        <div className="text-center">
          <div
            data-hero-item="badge"
            className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full border border-sky-500/30 text-sky-300 bg-sky-500/5"
          >
            <Clock className="w-4 h-4" />
            <span className="text-sm font-medium">Срочно / в день обращения</span>
          </div>

          <h1
            data-hero-item="title"
            className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
          >
            <span className="text-gradient">{siteConfig.name}</span>
            <br />
            <span className="text-white">Ремонт и изготовление ключей</span>
          </h1>

          <p
            data-hero-item="description"
            className="text-lg sm:text-xl text-zinc-400 max-w-3xl mx-auto mb-10 leading-relaxed"
          >
            {siteConfig.description}
          </p>

          <div
            data-hero-item="actions"
            className="flex flex-col sm:flex-row gap-4 justify-center mb-14"
          >
            <CustomButton
              size="lg"
              className="group bg-sky-500 hover:bg-sky-400 text-slate-950 focus:ring-sky-400 border border-sky-300/30"
              href={`tel:${siteConfig.phone}`}
            >
              <Phone className="w-5 h-5 mr-2" />
              Позвонить
              <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </CustomButton>
            <CustomButton
              size="lg"
              variant="outline"
              className="border-zinc-700 text-zinc-200 hover:bg-zinc-900/60"
              href="#services"
            >
              Узнать услуги
            </CustomButton>
          </div>

          <div
            data-hero-item="stats"
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8"
          >
            {[
              { value: '15', label: 'минут выезд', suffix: 'мин' },
              { value: '10', label: 'лет опыта', suffix: '+' },
              { value: '5000', label: 'довольных клиентов', suffix: '+' },
              { value: '9:00–21:00', label: 'режим работы', suffix: '' },
            ].map((stat) => (
              <div
                key={stat.label}
                data-hero-item="stat"
                className="p-5 sm:p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800 hover:border-sky-500/30 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="text-3xl lg:text-4xl font-bold text-gradient">
                  {stat.value}
                  {stat.suffix}
                </div>
                <div className="text-xs sm:text-sm text-zinc-500 mt-1 uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-zinc-600 flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-sky-500 rounded-full" />
        </div>
      </div>
    </section>
  )
}
