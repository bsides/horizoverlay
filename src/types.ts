export type OverlayData = {
  Combatant: ListOfCombatantsInObjectFormat
  Encounter: Encounter
  isActive: string // "true" or "false"
  readonly type?: 'CombatData' | string // Honestly not needed anywhere so we're not worrying about it
}

export type OverlayDataForHoriz = {
  combatant?: ListOfCombatantsInObjectFormat
  combatants: Combatant[]
  encounter: Encounter
  isActive: boolean // we transform it because... why use it as string?
}

export type Encounter = {
  n: string
  t: string
  title: string
  duration: string
  DURATION: string
  damage: string
  'damage-m': string
  'damage-*': string
  'DAMAGE-k': string
  'DAMAGE-m': string
  'DAMAGE-b': string
  'DAMAGE-*': string
  dps: string
  'dps-*': string
  DPS: string
  'DPS-k': string
  'DPS-m': string
  'DPS-*': string
  encdps: string
  'encdps-*': string
  ENCDPS: string
  'ENCDPS-k': string
  'ENCDPS-m': string
  'ENCDPS-*': string
  hits: string
  crithits: string
  'crithit%': string
  misses: string
  hitfailed: string
  swings: string
  tohit: string
  TOHIT: string
  maxhit: string
  MAXHIT: string
  'maxhit-*': string
  'MAXHIT-*': string
  healed: string
  enchps: string
  'enchps-*': string
  ENCHPS: string
  'ENCHPS-k': string
  'ENCHPS-m': string
  'ENCHPS-*': string
  heals: string
  critheals: string
  'critheal%': string
  cures: string
  maxheal: string
  MAXHEAL: string
  maxhealward: string
  MAXHEALWARD: string
  'maxheal-*': string
  'MAXHEAL-*': string
  'maxhealward-*': string
  'MAXHEALWARD-*': string
  damagetaken: string
  'damagetaken-*': string
  healstaken: string
  'healstaken-*': string
  powerdrain: string
  'powerdrain-*': string
  powerheal: string
  'powerheal-*': string
  kills: string
  deaths: string
  CurrentZoneName: string
  Last10DPS: string
  Last30DPS: string
  Last60DPS: string
}

export type ListOfCombatantsInObjectFormat = {
  [key: string]: Combatant
}

export type Combatant = {
  n: string
  t: string
  name: string
  duration: string
  DURATION: string
  damage: string
  'damage-m': string
  'damage-b': string
  'damage-*': string
  'DAMAGE-k': string
  'DAMAGE-m': string
  'DAMAGE-b': string
  'DAMAGE-*': string
  'damage%': string
  dps: string
  'dps-*': string
  DPS: string
  'DPS-k': string
  'DPS-m': string
  'DPS-*': string
  encdps: string
  'encdps-*': string
  ENCDPS: string
  'ENCDPS-k': string
  'ENCDPS-m': string
  'ENCDPS-*': string
  hits: string
  crithits: string
  'crithit%': string
  crittypes: string
  misses: string
  hitfailed: string
  swings: string
  tohit: string
  TOHIT: string
  maxhit: string
  MAXHIT: string
  'maxhit-*': string
  'MAXHIT-*': string
  healed: string
  'healed%': string
  enchps: string
  'enchps-*': string
  ENCHPS: string
  'ENCHPS-k': string
  'ENCHPS-m': string
  'ENCHPS-*': string
  critheals: string
  'critheal%': string
  heals: string
  cures: string
  maxheal: string
  MAXHEAL: string
  maxhealward: string
  MAXHEALWARD: string
  'maxheal-*': string
  'MAXHEAL-*': string
  'maxhealward-*': string
  'MAXHEALWARD-*': string
  damagetaken: string
  'damagetaken-*': string
  healstaken: string
  'healstaken-*': string
  powerdrain: string
  'powerdrain-*': string
  powerheal: string
  'powerheal-*': string
  kills: string
  deaths: string
  threatstr: string
  threatdelta: string
  Last10DPS: string
  Last30DPS: string
  Last60DPS: string
  Job: string
  ParryPct: string
  BlockPct: string
  IncToHit: string
  OverHealPct: string
  DirectHitPct: string
  DirectHitCount: string
  CritDirectHitCount: string
  CritDirectHitPct: string
  overHeal: string
  damageShield: string
  absorbHeal: string
}

// ------------------------
export type Options = {
  isTestData: boolean
  [key: string]: string | boolean | number
}
