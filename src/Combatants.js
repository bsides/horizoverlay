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
  render() {
    let rows = []
    let maxRows = 10
    let dataArray = Object.keys(this.props.data)
    let names = dataArray.slice(0, maxRows - 1)
    let maxdps = false
    let combatant
    let isSelf

    for (let ref in names) {
      combatant = this.props.data[names[ref]]
      // don't need to render this component if this is a limit break
      if (combatant.name.toLowerCase() === 'limit break') break

      if (!maxdps) {
        maxdps = parseFloat(combatant.ENCDPS)
      }

      isSelf = combatant.name === 'YOU' || combatant.name === 'You'

      let order = parseInt(ref + 1, 10)

      rows.push(
        <CombatantHorizontal
          encounterDamage={this.props.encounterDamage}
          rank={order}
          data={combatant}
          config={this.props.config}
          isSelf={isSelf}
          key={names[ref]}
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
