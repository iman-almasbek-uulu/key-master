export const services = [
  { id: 'repair', icon: 'wrench' },
  { id: 'manufacturing', icon: 'key' },
  { id: 'programming', icon: 'cpu' },
  { id: 'recovery', icon: 'shield-check' },
  { id: 'smart', icon: 'key' },
  { id: 'on-site', icon: 'map-pin' },
] as const

export type ServiceId = (typeof services)[number]['id']
export type Service = (typeof services)[number]
