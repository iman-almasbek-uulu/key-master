'use client'

import { useRef, type HTMLAttributes } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { cn } from '@/src/lib/utils'

gsap.registerPlugin(ScrollTrigger)

type RevealProps = HTMLAttributes<HTMLDivElement> & {
  delay?: number
}

/** Reveals an element once as it enters the viewport, while keeping content visible without JavaScript. */
export function Reveal({ children, className, delay = 0, ...props }: RevealProps) {
  const element = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const media = gsap.matchMedia()

      media.add('(prefers-reduced-motion: no-preference)', () => {
        if (!element.current) return

        gsap.from(element.current, {
          autoAlpha: 0,
          y: 24,
          duration: 0.65,
          delay: delay / 1000,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: element.current,
            start: 'top 88%',
            once: true,
          },
        })
      })

      return () => media.revert()
    },
    { scope: element, dependencies: [delay] },
  )

  return (
    <div
      ref={element}
      className={cn(className)}
      {...props}
    >
      {children}
    </div>
  )
}
