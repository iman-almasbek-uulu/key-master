import { ReactNode } from 'react'

interface ContainerProps {
  children: ReactNode
  className?: string
}

/** Поля как в дизайне: 20 px на телефоне, до 80 px на компьютере (макет 1440 px). */
export function Container({ children, className = '' }: ContainerProps) {
  return (
    <div
      className={`mx-auto w-full max-w-[640px] px-5 desk:max-w-[1440px] desk:px-[clamp(40px,5.56vw,80px)] ${className}`}
    >
      {children}
    </div>
  )
}
