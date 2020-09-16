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

    const maxRows = this.props.config.maxCombatants //not sure why let was being used here
    const dataArray = this.props.isWebSocket ? Object.keys(this.props.Combatant).reverse() : Object.keys(this.props.Combatant) //const is fine, actws flips order for some reason I don't know why, this is my 'fix'
    let discordData = []
	let currentRow = 0

    //NOTE: instead of wasting time slicing the array up we just break the loop when we need to, it avoids the problem of filtering out the lb only to want to handle it later
    for (const battler of dataArray) {
      const combatant = this.props.Combatant[battler] //scope means we can just use const here

      // Send limit break data separated
      if (combatant.name.toLowerCase() === 'limit break') {
        this.handleLimitBreak(
          parseInt(
            this.props.Combatant.damage / this.props.Encounter.damage * 100,
            10
          )
        )
        continue //break will just break the loop entirely.. if someone is deaing less damage than LB (yikes) they wouldn't end up included
      }
	  
      if(currentRow >= maxRows) continue //sadly because of the above statement we have to loop through the full data set if we want to be sure
      
      currentRow = currentRow + 1
      
      // Send to Discord the right name in Settings
      if (combatant.name.toUpperCase() === 'YOU')
        combatant.name = this.props.config.characterName

      discordData.push({
        job: combatant.Job,
        characterName: combatant.name,
        dps: combatant.ENCDPS,
        damage: parseInt(
          combatant.damage / this.props.Encounter.damage * 100,
          10
        ),
        hps: combatant.ENCHPS,
        healed: combatant['healed%'],
        deaths: combatant.deaths,
        crit: combatant['crithit%'],
        dhit: combatant.DirectHitPct
        // maxhit: combatant.maxhit.split('-')
      })
    }
    this.setState({ discordData })
  }
  render() {
    const props = this.props
    return (
      <div
        className={`damage-meter${props.isActive ? '' : ' inactive'}${
          props.config.locale === 'zhCN' || props.config.locale === 'zhHK'
            ? ' chinese'
            : ''
        }`}
        onContextMenu={props.openConfig}
        style={{ zoom: props.config.zoom }}
      >
        <Combatants
          isWebSocket={props.isWebSocket}
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
