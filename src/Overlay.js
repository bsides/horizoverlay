import React from 'react'
import Encounter from './Encounter'
import Combatants from './Combatants'
import { withHelper } from './helpers'

import './css/reboot.css'
import './css/index.css'
import './css/overlay.css'

class OverlayRaw extends React.Component {
  state = {
    limitBreak: 0,
    discordData: []
  }
  handleLimitBreak = value => {
    this.setState({ limitBreak: value })
  }
  componentWillReceiveProps(nextProps) {
    if (Object.getOwnPropertyNames(this.props.Combatant).length === 0)
      return false

    let maxRows = 10
    let dataArray = Object.keys(this.props.Combatant)
    let names = dataArray.slice(0, maxRows - 1)
    let combatant
    let discordData = []
    for (let i = 0; i < names.length; i++) {
      combatant = this.props.Combatant[names[i]]
      if (combatant.name.toUpperCase() === 'YOU')
        combatant.name = this.props.config.characterName

      if (combatant.name.toLowerCase() === 'limit break') {
        this.handleLimitBreak(
          parseInt(
            this.props.Combatant.damage / this.props.Encounter.damage * 100,
            10
          )
        )
        break
      }

      discordData.push({
        job: combatant.Job,
        characterName: combatant.name,
        dps: combatant.ENCDPS,
        damage: parseInt(
          combatant.damage / this.props.Encounter.damage * 100,
          10
        ),
        hps: combatant.ENCHPS,
        healed: combatant.healed,
        deaths: combatant.deaths,
        crit: combatant['crithit%'],
        dhit: combatant.DirectHitPct
      })
    }
    this.setState({ discordData })
  }
  render() {
    const props = this.props
    return (
      <div
        className={`damage-meter${props.isActive ? '' : ' inactive'}`}
        onContextMenu={props.openConfig}
        style={{ zoom: props.config.zoom }}
      >
        <Combatants
          data={props.Combatant}
          encounterDamage={props.Encounter.damage}
          config={props.config}
        />
        <Encounter
          {...props.Encounter}
          limitBreak={this.state.limitBreak}
          discordData={this.state.discordData}
          config={props.config}
        />
      </div>
    )
  }
}

const Overlay = withHelper({ WrappedComponent: OverlayRaw })
export default Overlay
