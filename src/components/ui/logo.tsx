import type { SVGProps } from 'react'

/**
 * Логотип autozamok из нового дизайна (светлый вариант для тёмного фона).
 * «Ключ» в последней букве «o» нарисован отдельным контуром.
 */
const letters = [
  {
    x: 0,
    d: 'M0 100L33 0H59L92 100H68L62 80H30L24 100ZM36 60H56L46 27Z',
    accent: false,
  },
  {
    x: 101,
    d: 'M0 0H22V61Q22 78 39 78Q56 78 56 61V0H78V61Q78 100 39 100Q0 100 0 61Z',
    accent: false,
  },
  { x: 188, d: 'M0 0H74V22H48V100H26V22H0Z', accent: false },
  {
    x: 271,
    d: 'M50 0a50 50 0 1 1 0 100a50 50 0 1 1 0-100ZM50 23a27 27 0 1 0 0 54a27 27 0 1 0 0-54Z',
    accent: false,
  },
  { x: 380, d: 'M2 0H76V20L30 78H76V100H0V80L46 22H2Z', accent: true },
  {
    x: 465,
    d: 'M0 100L33 0H59L92 100H68L62 80H30L24 100ZM36 60H56L46 27Z',
    accent: true,
  },
  {
    x: 566,
    d: 'M0 100V0H26L50 46L74 0H100V100H78V42L59 78H41L22 42V100Z',
    accent: true,
  },
  {
    x: 675,
    d: 'M50 0a50 50 0 1 1 0 100a50 50 0 1 1 0-100ZM50 23a27 27 0 1 0 0 54a27 27 0 1 0 0-54Z',
    accent: true,
  },
  {
    x: 784,
    d: 'M0 0H22V39L52 0H80L43 47L81 100H53L28 62L22 69V100H0Z',
    accent: true,
  },
] as const

const keyPath = 'M39 94H61V112L74 120V130L61 136V142L72 148V158L50 174L39 163Z'

export function Logo({
  label,
  ...props
}: { label?: string } & Omit<
  SVGProps<SVGSVGElement>,
  'viewBox' | 'role' | 'aria-label'
>) {
  // Без подписи логотип считается декоративным: подпись тогда лежит на ссылке вокруг него
  return (
    <svg
      viewBox="0 0 864 174"
      {...(label
        ? { role: 'img', 'aria-label': label }
        : { 'aria-hidden': true })}
      {...props}
    >
      {letters.map((letter) => (
        <path
          key={letter.x}
          transform={`translate(${letter.x} 0)`}
          d={letter.d}
          fill={letter.accent ? '#FFC400' : '#FFFFFF'}
          fillRule="evenodd"
        />
      ))}
      <path
        transform="translate(675 0)"
        d={keyPath}
        fill="#FFC400"
      />
    </svg>
  )
}
