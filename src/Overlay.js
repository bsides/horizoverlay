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
  configWindow = {}
  componentWillMount() {}
  // shouldComponentUpdate(nextProps, nextState) {
  //   if (nextProps.Encounter.encdps === '---') return false
  //   return true
  // }
  componentDidMount = () => {
    const configStore = localStorage.getItem('horizoverlay')
    const config = JSON.parse(configStore)
    this.setState({ config })
    window.addEventListener('storage', this.updateState(config), false)
  }
  componentWillUnmount() {
    window.removeEventListener('storage', this.updateState)
  }
  updateState = value => {
    const config = value
    this.setState({ config })
  }
  openConfig = () => {
    this.setState({ isConfigOpen: true })
    const windowFeatures =
      'menubar=no,location=no,resizable=no,scrollbars=yes,status=no,width=1000,height=187'
    this.configWindow = window.open(
      '/config',
      'Horizoverlay Config',
      windowFeatures
    )
    this.configWindow.focus()
    this.configWindow.onbeforeunload = () => {
      this.setState({ isConfigOpen: false })
      this.configWindow = null
    }
  }
  render() {
    const { isActive, Combatant } = this.props
    // const { config } = this.state
    return (
      <div
        className={`damage-meter${isActive ? '' : ' inactive'}`}
        onContextMenu={this.openConfig}
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
