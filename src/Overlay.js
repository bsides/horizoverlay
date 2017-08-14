import React, { Component } from 'react'
import { shape, number, object, string, bool, oneOfType } from 'prop-types'
import Encounter from './Encounter'
import Combatants from './Combatants'
import { defaultConfig } from './helpers'

import './css/reboot.css'
import './css/index.css'
import './css/overlay.css'

class Overlay extends Component {
  static defaultProps = { config: defaultConfig }
  static propTypes = {
    Combatant: object,
    Encounter: object,
    isActive: oneOfType([string, bool]),
    config: shape({
      showSetup: bool.isRequired,
      color: string.isRequired,
      characterName: string.isRequired,
      showDuration: bool.isRequired,
      showTotalDps: bool.isRequired,
      showHps: bool.isRequired,
      showJobIcon: bool.isRequired,
      showRank: bool.isRequired,
      showDamagePercent: bool.isRequired,
      zoom: number.isRequired
    })
  }
  state = {
    currentViewIndex: 0,
    config: {},
    isConfigOpen: false
  }
  componentDidMount() {
    const configStore = localStorage.getItem('horizoverlay')
    if (!configStore) {
      const config = this.props.config
      localStorage.setItem('horizoverlay', JSON.stringify(config))
      this.setState({ config })
    } else {
      const config = JSON.parse(configStore)
      this.setState({ config })
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
    // if (this.state.openConfig) return false
    if (nextProps.Encounter.encdps === '---') return false
    if (this.state.currentViewIndex !== nextState.currentViewIndex) {
      return true
    }
    if (this.state.selectedEncounter) {
      return false
    }
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
    this.configWindow.focus()
    this.configWindow.onbeforeunload = () => {
      this.setState({ isConfigOpen: false })
      this.configWindow = null
    }
  }
  render() {
    return (
      <div
        className={`damage-meter${this.props.isActive ? '' : ' inactive'}`}
        onContextMenu={this.openConfig}
        style={{ zoom: this.state.config.zoom }}
      >
        <h3>Awaiting data.</h3>
        <Combatants
          data={this.props.Combatant}
          encounterDamage={this.props.Encounter.damage}
          config={this.state.config}
        />
        <Encounter {...this.props.Encounter} config={this.state.config} />
      </div>
    )
  }
}

export default Overlay
