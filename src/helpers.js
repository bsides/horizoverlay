import React, { Component } from 'react'
import { shape, bool, string, object } from 'prop-types'

export const defaultConfig = {
  showSetup: false,
  color: 'byRole',
  characterName: 'YOU',
  showRank: true,
  showJobIcon: true,
  showHps: true,
  showHighlight: false,
  showSelf: true,
  showMaxhit: false,
  showDuration: true,
  showTotalDps: true,
  showDamagePercent: true,
  showDiscord: false,
  showLocale: false,
  showJobless: false,
  enableSoloMode: false,
  zoom: '1',
  discord: '',
  maxCombatants: 8,
  locale: 'enUS',
  configWindow: {
    width: 1300,
    height: 239
  },
  colorHealer: 'rgba(139, 195, 74, 0.3)',
  colorTank: 'rgba(33, 150, 243, 0.3)',
  colorDps: 'rgba(244, 67, 54, 0.3)'
}

// Declaring as a function makes it hoisted and don't mess with constructor from React.Component
export function withHelper({
  WrappedComponent,
  willMock = false,
  isConfig = false
}) {
  return class withConfig extends Component {
    static defaultProps = {
      mockData: willMock ? mockData : null,
      config: defaultConfig
    }
    static propTypes = {
      config: shape({
        showSetup: bool.isRequired,
        color: string.isRequired,
        characterName: string.isRequired,
        showDuration: bool.isRequired,
        showTotalDps: bool.isRequired,
        showHps: bool.isRequired,
        showJobIcon: bool.isRequired,
        showRank: bool.isRequired,
        showDamagePercent: bool.isRequired,
		showJobless: bool.isRequired,
        zoom: string.isRequired,
        configWindow: object.isRequired
      })
    }
    state = { ...this.props }
    resizeTimeout = undefined
    componentWillMount() {
      window.addEventListener('storage', this.updateState, false)
      // Check this before implementing
      // https://lodash.com/docs/4.17.4#throttle
      // if (isConfig)
      //   window.addEventListener('resize', this.handleResizeThrottler, false)
      this.updateState()
    }
    componentWillReceiveProps(nextProps) {
      this.updateState()
    }
    componentWillUnmount() {
      window.removeEventListener('storage', this.updateState)
      // if (isConfig)
      //   window.removeEventListener('resize', this.handleResizeThrottler)
    }
    updateState = () => {
      const configStore = localStorage.getItem('horizoverlay')
      if (!configStore) {
        const config = this.props.config
        localStorage.setItem('horizoverlay', JSON.stringify(config))
        this.setState({ config })
      } else {
        const config = JSON.parse(configStore)
        this.setState({ config })
      }
    }
    handleResize = () => {
      const config = { ...this.state.config }
      let width = window.innerWidth,
        height = window.innerHeight

      // update the value in our copied state...
      config.configWindow = { width, height }
      // ...and set it to component' state
      this.setState({ config })

      // And then save it to localStorage!
      localStorage.setItem('horizoverlay', JSON.stringify(config))
    }
    handleResizeThrottler = () => {
      if (!this.resizeTimeout) {
        this.resizeTimeout = setTimeout(() => {
          this.resizeTimeout = null
          this.handleResize()
        }, 66)
      }
    }
    openConfig = () => {
      this.setState({ isConfigOpen: true })
      const windowFeatures = `menubar=no,location=no,resizable=no,scrollbars=yes,status=no,width=${
        this.props.config.configWindow.width
      },height=${this.props.config.configWindow.height}`
      this.configWindow = window.open(
        './#/config',
        'Horizoverlay Config',
        windowFeatures
      )
      this.configWindow.focus()
      this.configWindow.onbeforeunload = () => {
        this.setState({ isConfigOpen: false })
        this.configWindow = null
      }
    }
    render = () => {
      const { Combatant, Encounter, isActive } = this.props
      return (
        <WrappedComponent
          {...this.state}
          Combatant={Combatant}
          Encounter={Encounter}
          isActive={isActive}
          openConfig={this.openConfig}
          handleReset={this.updateState}
        />
      )
    }
  }
}

export function getRandom(min, max) {
  const first = Math.ceil(min)
  const last = Math.floor(max)
  return Math.floor(Math.random() * (last - first + 1)) + first
}

export const jobRoles = {
  tank: ['drk', 'gla', 'mrd', 'pld', 'war', 'titan', 'gnb'],
  healer: ['ast', 'cnj', 'sch', 'whm', 'sge', 'eos', 'selene'],
  dps: [
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
    'rpr',
    'sam',
    'smn',
    'thm',
    'dnc',
    'carbuncle',
    'garuda',
    'ifrit',
    'rook',
    'bishop',
    'chocobo',
    'lb'
  ]
}

export const otherIcons = [
  'lb',
  'chocobo',
  'bishop',
  'rook',
  'eos',
  'selene',
  'carbuncle',
  'garuda',
  'ifrit',
  'titan'
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
    dps: '5450',
    edps: '5450.30',
    hps: '0',
    ehps: '0.0',
    isHealing: false,
    damagePct: '36',
    maxhit: 'Super Yey-3921'
  },
  {
    isSelf: false,
    name: 'Vivi Ornitier',
    jobClass: 'Blm',
    jobFull: 'Black Mage',
    job: 'blm',
    jobRole: 'job-dps',
    rank: 2,
    dps: '5283',
    edps: '5283.29',
    hps: '0',
    ehps: '0.0',
    isHealing: false,
    damagePct: '32',
    maxhit: 'Meteor-4221'
  },
  {
    isSelf: false,
    name: 'Zidane Tribal',
    jobClass: 'Nin',
    jobFull: 'Ninja',
    job: 'nin',
    jobRole: 'job-dps',
    rank: 3,
    dps: '2648',
    edps: '2648.91',
    hps: '4',
    ehps: '4.12',
    isHealing: false,
    damagePct: '22',
    maxhit: 'Thievery-2332'
  },
  {
    isSelf: false,
    name: 'Garnet Alexandros',
    jobClass: 'Smn',
    jobFull: 'Summoner',
    job: 'smn',
    jobRole: 'job-dps',
    rank: 4,
    dps: '1654',
    edps: '1654.90',
    hps: '12',
    ehps: '12.10',
    isHealing: false,
    damagePct: '15',
    maxhit: 'Alexander-8720'
  },
  {
    isSelf: false,
    name: 'Freya Crescent',
    jobClass: 'Drg',
    jobFull: 'Dragoon',
    job: 'drg',
    jobRole: 'job-dps',
    rank: 5,
    dps: '1977',
    edps: '1977.42',
    hps: '3',
    ehps: '3.10',
    isHealing: false,
    damagePct: '16',
    maxhit: "Rei's Wind-3092"
  },
  {
    isSelf: false,
    name: 'Adelbert Steiner',
    jobClass: 'Pld',
    jobFull: 'Paladin',
    job: 'pld',
    jobRole: 'job-tank',
    rank: 6,
    dps: '1548',
    edps: '1548.24',
    hps: '588',
    ehps: '588.50',
    isHealing: false,
    damagePct: '9',
    maxhit: 'Power Break-1251'
  },
  {
    isSelf: false,
    name: 'Quina Quen',
    jobClass: 'War',
    jobFull: 'Warrior',
    job: 'war',
    jobRole: 'job-tank',
    rank: 8,
    dps: '1366',
    edps: '1366.61',
    hps: '112',
    ehps: '112.50',
    isHealing: false,
    damagePct: '6',
    maxhit: 'Frog Drop-9999'
  },
  {
    isSelf: false,
    name: 'Eiko Carol',
    jobClass: 'Whm',
    jobFull: 'White Mage',
    job: 'whm',
    jobRole: 'job-healer',
    rank: 7,
    dps: '1461',
    edps: '1461.64',
    hps: '9821',
    ehps: '9821.50',
    isHealing: true,
    damagePct: '7',
    maxhit: 'Carbuncle-9701'
  },
  {
    isSelf: false,
    name: 'Alphinaud Cheater',
    jobClass: 'Sch',
    jobFull: 'Scholar',
    job: 'sch',
    jobRole: 'job-healer',
    rank: 9,
    dps: '447',
    edps: '447.18',
    hps: '5661',
    ehps: '5661.12',
    isHealing: true,
    damagePct: '2',
    maxhit: 'Geez-411'
  },
  {
    isSelf: false,
    name: 'Limit Break',
    jobClass: '',
    jobFull: '',
    job: '',
    jobRole: '',
    rank: 5.5,
    dps: '447',
    edps: '447.18',
    hps: '',
    ehps: '',
    isHealing: true,
    damagePct: '4',
    maxhit: 'Limit Break-29891'
  }
]
