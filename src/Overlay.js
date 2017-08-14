import React, { Component } from 'react'
import Encounter from './Encounter'
import Combatants from './Combatants'
import { withHelper } from './helpers'

import './css/reboot.css'
import './css/index.css'
import './css/overlay.css'

class OverlayRaw extends Component {
  state = {
    config: {},
    isConfigOpen: false
  }
  render() {
    const { isActive, Combatant } = this.props
    // const { config } = this.state
    return (
      <div
        className={`damage-meter${isActive ? '' : ' inactive'}`}
        onContextMenu={this.props.openConfig}
        style={{ zoom: this.props.config.zoom }}
      >
        <Combatants
          data={Combatant}
          encounterDamage={this.props.Encounter.damage}
          config={this.props.config}
        />
        <Encounter {...this.props.Encounter} config={this.props.config} />
      </div>
    )
  }
}

const Overlay = withHelper(OverlayRaw)
export default Overlay
