import React from 'react'
import Encounter from './Encounter'
import Combatants from './Combatants'
import { withHelper } from './helpers'

import './css/reboot.css'
import './css/index.css'
import './css/overlay.css'

class OverlayRaw extends React.Component {
  state = {
    limitBreak: 0
  }
  handleLimitBreak = value => {
    this.setState({ limitBreak: value })
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
          handleLimitBreak={this.handleLimitBreak}
          config={props.config}
        />
        <Encounter
          {...props.Encounter}
          wholeData={props}
          limitBreak={this.state.limitBreak}
          config={props.config}
        />
      </div>
    )
  }
}

const Overlay = withHelper({ WrappedComponent: OverlayRaw })
export default Overlay
