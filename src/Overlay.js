import React, { Component } from 'react'
import Encounter from './Encounter'
import Combatants from './Combatants'
import { withHelper } from './helpers'

import './css/reboot.css'
import './css/index.css'
import './css/overlay.css'

class OverlayRaw extends Component {
  state = {
    config: this.props.config,
    isConfigOpen: false
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.Encounter.encdps === '---') return false
    return true
  }
  openConfig = () => {
    this.setState({ isConfigOpen: true })
    const windowFeatures =
      'menubar=no,location=no,resizable=no,scrollbars=yes,status=no,width=1000,height=187'
    this.configWindow = window.open(
      '/#/config',
      'Horizoverlay Config',
      windowFeatures
    )
  }
  render() {
    const { isActive, Combatant } = this.props
    const { config } = this.state
    const style = { zoom: config.zoom }
    return (
      <div
        className={`damage-meter${isActive ? '' : ' inactive'}`}
        onContextMenu={this.openConfig}
        style={{ style }}
      >
        <Combatants
          data={Combatant}
          encounterDamage={this.props.Encounter.damage}
          config={config}
        />
        <Encounter {...this.props.Encounter} config={config} />
      </div>
    )
  }
}

const Overlay = withHelper(OverlayRaw)
export default Overlay
