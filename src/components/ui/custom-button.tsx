import { ButtonHTMLAttributes, ReactNode } from 'react'

import { cn } from '@/src/lib/utils'

interface CustomButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  asChild?: boolean
  href?: string
}

export function CustomButton({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  href,
  ...props
}: CustomButtonProps) {
  const baseStyles =
    'inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b0d10] disabled:pointer-events-none disabled:opacity-50'

  const variants = {
    primary:
      'bg-[#34b9fe] text-[#06121a] shadow-[0_10px_30px_-14px_rgba(52,185,254,0.9)] hover:bg-[#67ccff]',
    secondary:
      'bg-white/[0.06] text-zinc-100 border border-white/10 hover:bg-white/[0.1]',
    outline:
      'border border-white/15 bg-transparent text-zinc-100 hover:border-sky-300/50 hover:bg-white/[0.04]',
    ghost: 'text-sky-300 hover:bg-sky-300/10 hover:text-sky-200',
  }

  const sizes = {
    sm: 'min-h-9 px-3.5 py-2 text-sm',
    md: 'min-h-11 px-5 py-2.5 text-sm',
    lg: 'min-h-12 px-6 py-3 text-[15px] sm:text-base',
  }

  const classes = cn(baseStyles, variants[variant], sizes[size], className)

  if (href) {
    const isExternal = href.startsWith('http')

    return (
      <a
        href={href}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
        className={classes}
      >
        {children}
      </a>
    )
  }

  return (
    <button
      className={classes}
      {...props}
    >
      {children}
    </button>
  )
}
