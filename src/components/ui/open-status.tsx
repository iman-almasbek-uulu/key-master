'use client'

import { useEffect, useState } from 'react'

type Props = {
  open: string
  closed: string
  /** Показывается в HTML до загрузки скрипта и без него: график работы без «открыто/закрыто». */
  fallback: string
}

// Мастерская работает ежедневно с 9:00 до 21:00 по Бишкеку (UTC+6)
function isOpenNow() {
  const hour = (new Date().getUTCHours() + 6) % 24
  return hour >= 9 && hour < 21
}

export function OpenStatus({ open, closed, fallback }: Props) {
  const [isOpen, setIsOpen] = useState<boolean | null>(null)

  useEffect(() => {
    setIsOpen(isOpenNow())
    const timer = window.setInterval(() => setIsOpen(isOpenNow()), 60_000)
    return () => window.clearInterval(timer)
  }, [])

  const dot =
    isOpen === null ? 'bg-zinc-500' : isOpen ? 'bg-wa' : 'bg-[#FF7A59]'

  return (
    <p className="flex items-center gap-2.5 text-sm font-semibold text-[#E4E7EB]">
      <span
        aria-hidden="true"
        className={`h-2 w-2 shrink-0 rounded-full ${dot}`}
      />
      {isOpen === null ? fallback : isOpen ? open : closed}
    </p>
  )
}
