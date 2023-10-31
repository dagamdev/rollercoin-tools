export const POWER_UNITS = {
  Gh: 1,
  Th: 1000,
  Ph: 1000000,
  Eh: 1000000000,
  Zh: 1000000000000
}

export type PowerUnits = keyof typeof POWER_UNITS
