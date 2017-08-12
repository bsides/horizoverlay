export function getRandom(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export const defaultConfig = {
  showSetup: false,
  color: 'byRole',
  characterName: 'YOU',
  showDuration: true,
  showTotalDps: true,
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

export const mockData = [
  {
    isSelf: true,
    name: 'YOU',
    jobClass: 'Nin',
    jobFull: 'Ninja',
    job: 'nin',
    jobRole: 'job-dps',
    rank: 1,
    dps: '5450.30',
    hps: '0.0',
    isHealing: false,
    damagePct: '36'
  },
  {
    isSelf: false,
    name: 'Vivi Ornitier',
    jobClass: 'Blm',
    jobFull: 'Black Mage',
    job: 'blm',
    jobRole: 'job-dps',
    rank: 2,
    dps: '5283.29',
    hps: '0.0',
    isHealing: false,
    damagePct: '32'
  },
  {
    isSelf: false,
    name: 'Zidane Tribal',
    jobClass: 'Nin',
    jobFull: 'Ninja',
    job: 'nin',
    jobRole: 'job-dps',
    rank: 3,
    dps: '2648.91',
    hps: '4.12',
    isHealing: false,
    damagePct: '22'
  },
  {
    isSelf: false,
    name: 'Garnet Alexandros',
    jobClass: 'Smn',
    jobFull: 'Summoner',
    job: 'smn',
    jobRole: 'job-dps',
    rank: 4,
    dps: '1654.90',
    hps: '12.10',
    isHealing: false,
    damagePct: '15'
  },
  {
    isSelf: false,
    name: 'Freya Crescent',
    jobClass: 'Drg',
    jobFull: 'Dragoon',
    job: 'drg',
    jobRole: 'job-dps',
    rank: 5,
    dps: '1977.42',
    hps: '3.10',
    isHealing: false,
    damagePct: '16'
  },
  {
    isSelf: false,
    name: 'Adelbert Steiner',
    jobClass: 'Pld',
    jobFull: 'Paladin',
    job: 'pld',
    jobRole: 'job-tank',
    rank: 6,
    dps: '1548.24',
    hps: '588.50',
    isHealing: false,
    damagePct: '9'
  },
  {
    isSelf: false,
    name: 'Quina Quen',
    jobClass: 'War',
    jobFull: 'Warrior',
    job: 'war',
    jobRole: 'job-tank',
    rank: 8,
    dps: '1366.61',
    hps: '112.50',
    isHealing: false,
    damagePct: '6'
  },
  {
    isSelf: false,
    name: 'Eiko Carol',
    jobClass: 'Whm',
    jobFull: 'White Mage',
    job: 'whm',
    jobRole: 'job-healer',
    rank: 7,
    dps: '1461.64',
    hps: '9821.50',
    isHealing: true,
    damagePct: '7'
  },
  {
    isSelf: false,
    name: 'Alphinaud Cheater',
    jobClass: 'Sch',
    jobFull: 'Scholar',
    job: 'sch',
    jobRole: 'job-healer',
    rank: 9,
    dps: '447.18',
    hps: '5661.12',
    isHealing: true,
    damagePct: '2'
  }
]
