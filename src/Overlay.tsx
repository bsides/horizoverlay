import React from 'react'
import Combatants from './Combatants'
import Encounter from './Encounter'
import { withHelper } from './helpers'

import './css/overlay.css'

function OverlayRaw({
  Combatant: overlayCombatant,
  Encounter: overlayEncounter,
  config,
  isActive,
  openConfig,
}) {
  const [limitBreak, setLimitBreak] = React.useState(0)
  const [discordData, setDiscordData] = React.useState([])

  React.useEffect(() => {
    const maxRows = config?.maxCombatants ?? 24
    const dataArray = Object.keys(overlayCombatant)
    const battler = dataArray.slice(0, maxRows)

    for (const ref in battler) {
      const combatant = overlayCombatant[battler[ref]]

      // Send to Discord the right name in Settings
      if (combatant.name.toUpperCase() === 'YOU' && config?.characterName) {
        combatant.name = config.characterName
      }

      // Send limit break data separated
      if (combatant.name.toLowerCase() === 'limit break') {
        handleLimitBreak(
          parseInt(
            (overlayCombatant.damage / overlayEncounter.damage) * 100,
            10,
          ),
        )
        break
      }

      setDiscordData((oldData) => ({
        ...oldData,
        job: combatant.Job,
        characterName: combatant.name,
        dps: combatant.ENCDPS,
        damage: parseInt(
          (combatant.damage / overlayEncounter?.damage) * 100,
          10,
        ),
        hps: combatant.ENCHPS,
        healed: combatant['healed%'],
        deaths: combatant.deaths,
        crit: combatant['crithit%'],
        dhit: combatant.DirectHitPct,
        // maxhit: combatant.maxhit.split('-')
      }))
    }
  }, [
    overlayCombatant,
    overlayEncounter?.damage,
    config?.characterName,
    config?.maxCombatants,
  ])

  const handleLimitBreak = (value) => {
    setLimitBreak(value)
  }

  if (Object.keys(overlayCombatant).length === 0) {
    return null
  }

  return (
    <div
      className={`damage-meter${isActive ? '' : ' inactive'}${
        config.locale === 'zhCN' || config.locale === 'zhHK' ? ' chinese' : ''
      }`}
      onContextMenu={openConfig}
      style={{ zoom: config.zoom }}
    >
      <Combatants
        data={overlayCombatant}
        encounterDamage={overlayEncounter.damage}
        config={config}
      />
      <Encounter
        {...overlayEncounter}
        limitBreak={limitBreak}
        discordData={discordData}
        config={config}
      />
    </div>
  )
}

// class OverlayRaw extends React.Component {
//   state = {
//     limitBreak: 0,
//     discordData: [],
//   }
//   handleLimitBreak = (value) => {
//     this.setState({ limitBreak: value })
//   }
//   componentWillReceiveProps(nextProps) {
//     if (Object.getOwnPropertyNames(this.props.Combatant).length === 0)
//       return false

//     let maxRows = this.props.config.maxCombatants
//     let dataArray = Object.keys(this.props.Combatant)
//     let battler = dataArray.slice(0, maxRows)
//     let combatant
//     let discordData = []

//     for (const ref in battler) {
//       combatant = this.props.Combatant[battler[ref]]

//       // Send to Discord the right name in Settings
//       if (combatant.name.toUpperCase() === 'YOU')
//         combatant.name = this.props.config.characterName

//       // Send limit break data separated
//       if (combatant.name.toLowerCase() === 'limit break') {
//         this.handleLimitBreak(
//           parseInt(
//             (this.props.Combatant.damage / this.props.Encounter.damage) * 100,
//             10
//           )
//         )
//         break
//       }

//       discordData.push({
//         job: combatant.Job,
//         characterName: combatant.name,
//         dps: combatant.ENCDPS,
//         damage: parseInt(
//           (combatant.damage / this.props.Encounter.damage) * 100,
//           10
//         ),
//         hps: combatant.ENCHPS,
//         healed: combatant['healed%'],
//         deaths: combatant.deaths,
//         crit: combatant['crithit%'],
//         dhit: combatant.DirectHitPct,
//         // maxhit: combatant.maxhit.split('-')
//       })
//     }
//     this.setState({ discordData })
//   }
//   render() {
//     const props = this.props
//     return (
//       <div
//         className={`damage-meter${props.isActive ? '' : ' inactive'}${
//           props.config.locale === 'zhCN' || props.config.locale === 'zhHK'
//             ? ' chinese'
//             : ''
//         }`}
//         onContextMenu={props.openConfig}
//         style={{ zoom: props.config.zoom }}
//       >
//         <Combatants
//           data={props.Combatant}
//           encounterDamage={props.Encounter.damage}
//           config={props.config}
//         />
//         <Encounter
//           {...props.Encounter}
//           limitBreak={this.state.limitBreak}
//           discordData={this.state.discordData}
//           config={props.config}
//         />
//       </div>
//     )
//   }
// }

const Overlay = withHelper({ WrappedComponent: OverlayRaw })
export default Overlay
