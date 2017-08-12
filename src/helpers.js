export function getRandom(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export const defaultConfig = {
  showSetup: true,
  color: 'byRole',
  characterName: 'YOU',
  encounterDuration: true,
  encounterTotalDps: true,
  showHps: true,
  showJobIcon: true,
  showRank: true,
  showDamagePercent: true
}

export const jobsTank = ['drk', 'gla', 'mrd', 'pld', 'war']
export const jobsHealer = ['ast', 'cnj', 'sch', 'whm']
export const jobsDps = [
  'acn',
  'arc',
  'blm',
  'brd',
  'drg',
  'lnc',
  'mch',
  'mnk',
  'nin',
  'pgl',
  'pug',
  'rdm',
  'rog',
  'sam',
  'smn',
  'thm'
]
