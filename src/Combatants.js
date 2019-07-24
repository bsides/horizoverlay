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
    const maxRows = this.props.config.maxCombatants
    const dataArray = this.props.isWebSocket ? Object.keys(this.props.data).reverse() : Object.keys(this.props.data)
    const battlers = dataArray.filter(player => (
        this.props.data[player].name.toLowerCase() !== 'limit break'
        && (!this.props.config.showJobless && this.props.data[player].Job && this.props.data[player].Job !== '') //doesn't have a job, filter it out.
        && (this.props.data[player].ENCDPS > 0 || this.props.data[player].ENCHPS > 0) //irrelevant npcs (i.e. estinien) like to show up for whatever reason
	)).slice(0, maxRows)
    let rows = []
	let currentRow = 1

    for (const battler of battlers) {
      const combatant = this.props.data[battler]

      // console.log(combatant)

      // We'll change the global 'YOU' name in case it's, well, you
      // In case you changed your name in ACT and in the overlay config
      const isSelf =
        combatant.name.toUpperCase() === 'YOU' ||
        this.props.config.characterName === combatant.name

      // We need to reasign it here since it will call a reference
      const rank = currentRow
 
      currentRow = currentRow + 1

      // don't need to render this component if this is a limit break
      // if (!combatant.name.toLowerCase() === 'limit break')
      rows.push(
        <CombatantHorizontal
          encounterDamage={this.props.encounterDamage}
          rank={rank}
          data={combatant}
          config={this.props.config}
          isSelf={isSelf}
          key={battler}
        />
      )
    }
    return <div className="combatants">{rows}</div>
  }
}

export default Combatants
