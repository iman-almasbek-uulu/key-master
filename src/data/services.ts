// Порядок как в новом дизайне: автовскрытие и работа по замку идут сразу после изготовления.
export const services = [
  { id: 'manufacturing' },
  { id: 'unlocking' },
  { id: 'recovery' },
  { id: 'repair' },
  { id: 'programming' },
  { id: 'smart' },
  { id: 'on-site' },
] as const

export type ServiceId = (typeof services)[number]['id']
export type Service = (typeof services)[number]
