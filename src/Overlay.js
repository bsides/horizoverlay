import React, { Component } from 'react'
import { object, bool } from 'prop-types'
import Encounter from './Encounter'
import Combatants from './Combatants'

import './reboot.css'
import './index.css'
import './overlay.css'

class Overlay extends Component {
  static propTypes = {
    Combatant: object,
    Encounter: object,
    isActive: bool
  }
  state = {
    currentViewIndex: 0,
    config: {},
    isConfigOpen: false
  }
  defaultConfig = {
    color: 'byRole',
    encounterDuration: false,
    encounterTotalDps: false,
    showHps: true,
    jobIcon: true
  }
  configWindow = {}
  componentDidMount() {
    const configStore = localStorage.getItem('horizoverlay')
    if (!configStore) {
      const config = this.defaultConfig
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
  handleConfig = e => {
    const target = e.target
    const config = { ...this.state.config }
    let key = target.name,
      value = target.value

    // Why aren't HTML elements more consistent? 😦
    if (target.type === 'checkbox') {
      value = target.checked
    }

    // update the value in our copied state...
    config[key] = value
    // ...and set it to component' state
    this.setState({ config })

    // And then save it to localStorage!
    localStorage.setItem('horizoverlay', JSON.stringify(config))
  }
  openConfig = () => {
    this.setState({ isConfigOpen: true })
    const windowFeatures =
      'menubar=no,location=no,resizable=no,scrollbars=yes,status=no,width=960,height=156'
    this.configWindow = window.open(
      '/config/',
      'Horizoverlay Config',
      windowFeatures
    )
  }
  render() {
    return (
      <div
        className={`damage-meter${this.props.isActive ? '' : ' inactive'}`}
        onContextMenu={this.openConfig}
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
