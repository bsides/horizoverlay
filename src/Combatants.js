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
    const dataArray = Object.keys(this.props.data)
    const battler = dataArray.filter(player => (
        this.props.data[player].name.toLowerCase() !== 'limit break'
		&& (this.props.config.showJobless || (this.props.data[player].Job && this.props.data[player].Job !== '')) //doesn't have a job, filter it out.
		&& (this.props.data[player].ENCDPS > 0 || this.props.data[player].ENCHPS > 0) //irrelevant npcs (i.e. estinien) like to show up for whatever reason
	)).slice(0, maxRows)
    let rows = []
    let combatant
    let isSelf

    for (const ref in battler) {
      combatant = this.props.data[battler[ref]]

      // console.log(combatant)

      // We'll change the global 'YOU' name in case it's, well, you
      // In case you changedw your name in ACT and in the overlay config
      isSelf =
        combatant.name.toUpperCase() === 'YOU' ||
        this.props.config.characterName === combatant.name

      // We need to reasign it here since it will call a reference
      const rank = parseInt(ref, 10) + 1

      // don't need to render this component if this is a limit break
      // if (!combatant.name.toLowerCase() === 'limit break')
      rows.push(
        <CombatantHorizontal
          encounterDamage={this.props.encounterDamage}
          rank={rank}
          data={combatant}
          config={this.props.config}
          isSelf={isSelf}
          key={battler[ref]}
        />
      )
    }
    return <div className="combatants">{rows}</div>
  }
}

export default Combatants
