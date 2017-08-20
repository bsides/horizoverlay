import React, { Component } from 'react'
import CombatantHorizontal from './CombatantHorizontal'

class Combatants extends Component {
  constructor(props) {
    super(props)

    this.maxRows = 10
    this.rows = []
  }
  shouldComponentUpdate() {
    // if data is empty then don't re-render
    if (Object.getOwnPropertyNames(this.props.data).length === 0) {
      return false
    }

    return true
  }
  componentWillReceiveProps() {
    let maxRows = 10
    let dataArray = Object.keys(this.props.data)
    let names = dataArray.slice(0, maxRows - 1)
    let maxdps = false
    let combatant
    let isSelf
    let discordData = []
    for (let i = 0; i < names.length; i++) {
      combatant = this.props.data[names[i]]

      if (!maxdps) {
        maxdps = parseFloat(combatant.encdps)
      }

      isSelf = combatant.name === 'YOU' || combatant.name === 'You'

      let order = i + 1

      discordData.push({
        job: combatant.Job,
        characterName: combatant.name,
        dps: combatant.encdps,
        damage: parseInt(
          combatant.damage / this.props.encounterDamage * 100,
          10
        ),
        hps: combatant.enchps,
        healed: combatant.healed,
        deaths: combatant.deaths,
        crit: combatant['crithit%'],
        dhit: combatant.DirectHitPct
      })

      this.rows.push(
        <CombatantHorizontal
          encounterDamage={this.props.encounterDamage}
          rank={order}
          data={combatant}
          config={this.props.config}
          isSelf={isSelf}
          key={names[i]}
          handleLimitBreak={this.props.handleLimitBreak}
        />
      )
    }
    this.props.handleDiscordData(discordData)
  }
  render() {
    let rows = []
    let maxRows = 10
    let dataArray = Object.keys(this.props.data)
    // let limit = Math.max(dataArray.length, maxRows)
    let names = dataArray.slice(0, maxRows - 1)
    let maxdps = false
    let combatant
    let isSelf

    for (let i = 0; i < names.length; i++) {
      combatant = this.props.data[names[i]]

      if (!maxdps) {
        maxdps = parseFloat(combatant.encdps)
      }

      isSelf = combatant.name === 'YOU' || combatant.name === 'You'

      let order = i + 1

      rows.push(
        <CombatantHorizontal
          encounterDamage={this.props.encounterDamage}
          rank={order}
          data={combatant}
          config={this.props.config}
          isSelf={isSelf}
          key={names[i]}
          handleLimitBreak={this.props.handleLimitBreak}
        />
      )
    }
    return (
      <div className="combatants">
        {rows}
      </div>
    )
  }
}

export default Combatants
