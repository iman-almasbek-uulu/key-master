export const services = [
  { id: 'manufacturing', icon: 'key' },
  { id: 'unlocking', icon: 'key' },
  { id: 'recovery', icon: 'shield-check' },
  { id: 'repair', icon: 'wrench' },
  { id: 'programming', icon: 'cpu' },
  { id: 'smart', icon: 'key' },
  { id: 'on-site', icon: 'map-pin' },
] as const

export type ServiceId = (typeof services)[number]['id']
export type Service = (typeof services)[number]
