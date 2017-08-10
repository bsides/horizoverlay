import React, { Component } from 'react'
import { object, bool } from 'prop-types'
import Encounter from './Encounter'
import Combatants from './Combatants'
import Config from './Config'

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
    color: 'default',
    encounterDuration: false,
    encounterTotalDps: false
  }
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
  toggleConfig = e => {
    const isOpen = this.state.isConfigOpen
    this.setState({ isConfigOpen: !isOpen })
  }
  render() {
    if (this.state.isConfigOpen) {
      return (
        <Config
          toggleConfig={this.toggleConfig}
          config={this.state.config}
          handleConfig={this.handleConfig}
        />
      )
    } else {
      return (
        <div
          className={`damage-meter${this.props.isActive ? '' : ' inactive'}`}
          onContextMenu={this.toggleConfig}
        >
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
}

export default Overlay
