import { type CSSProperties, type HTMLAttributes } from 'react'

import { cn } from '@/src/lib/utils'

type RevealProps = HTMLAttributes<HTMLDivElement> & {
  delay?: number
}

/** A progressively enhanced, CSS-only reveal wrapper. */
export function Reveal({
  children,
  className,
  delay = 0,
  style,
  ...props
}: RevealProps) {
  return (
    <div
      className={cn('motion-reveal', className)}
      style={{
        ...style,
        '--reveal-delay': `${delay}ms`,
      } as CSSProperties}
      {...props}
    >
      {children}
    </div>
  )
}
