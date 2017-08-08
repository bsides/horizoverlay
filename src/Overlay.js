import React, { Component } from 'react'
import Encounter from './Encounter'
import Combatants from './Combatants'

class Overlay extends Component {
  state = {
    currentViewIndex: 0
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.Encounter.encdps === '---') {
      return false
    }
    if (this.state.currentViewIndex !== nextState.currentViewIndex) {
      return true
    }
    if (this.state.selectedEncounter) {
      return false
    }
    return true
  }
  render() {
    return (
      <div className={`damage-meter${this.props.isActive ? '' : ' inactive'}`}>
        <h3>Awaiting data.</h3>
        <Encounter {...this.props.Encounter} />
        <Combatants
          data={this.props.Combatant}
          encounterDamage={this.props.Encounter.damage}
        />
      </div>
    )
  }
}

export default Overlay
