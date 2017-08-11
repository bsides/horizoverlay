import React, { Component } from 'react'
import CombatantHorizontal from './CombatantHorizontal'

class Combatants extends Component {
  shouldComponentUpdate() {
    // if data is empty then don't re-render
    if (Object.getOwnPropertyNames(this.props.data).length === 0) {
      return false
    }

    return true
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
