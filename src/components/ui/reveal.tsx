import { type HTMLAttributes } from 'react'

import { cn } from '@/src/lib/utils'

type RevealProps = HTMLAttributes<HTMLDivElement> & {
  delay?: number
}

/**
 * Layout wrapper kept for the section markup. Motion is intentionally limited
 * to the short optional entrance on the hero; content is always rendered.
 */
export function Reveal({
  children,
  className,
  delay: _delay,
  ...props
}: RevealProps) {
  return (
    <div
      className={cn(className)}
      {...props}
    >
      {children}
    </div>
  )
}
