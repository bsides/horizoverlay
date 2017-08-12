import React, { Component } from 'react'
import { defaultConfig } from './helpers'
import './config.css'

class Config extends Component {
  state = {
    config: {},
    isConfigOpen: false
  }
  defaultConfig = defaultConfig
  componentDidMount() {
    window.addEventListener('storage', this.onStorageUpdate, false)
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
  onStorageUpdate() {
    // Reload the overlay on every config update
    window.opener.location.reload()
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
  handleReset = e => {
    e.preventDefault()

    // Default values
    const config = defaultConfig
    this.setState({ config })

    // Clear any setup
    localStorage.clear()

    // Then save new values
    localStorage.setItem('horizoverlay', JSON.stringify(config))
  }
  // *** IMPORTANT ***
  // Gotta bind 'onClick' for checkboxes since false values don't bubble to 'onChange'!
  render() {
    const { config } = this.state
    return (
      <div className="config">
        <form onSubmit={this.handleReset}>
          <fieldset>
            <legend>Character Name</legend>
            <div>
              <label htmlFor="characterName">Your character's name:</label>
              <input
                type="text"
                name="characterName"
                value={config.characterName}
                placeholder={config.characterName}
                onChange={this.handleConfig}
              />
            </div>
          </fieldset>
          <fieldset>
            <legend>Color theme</legend>
            <div>
              <input
                type="radio"
                name="color"
                id="colorByRole"
                value="byRole"
                checked={config.color === 'byRole'}
                onChange={this.handleConfig}
              />
              <label htmlFor="colorByRole">Color By Role</label>
              <br />
              <input
                type="radio"
                name="color"
                id="colorBlackWhite"
                value="blackWhite"
                checked={config.color === 'blackWhite'}
                onChange={this.handleConfig}
              />
              <label htmlFor="colorBlackWhite">Black & White</label>
            </div>
          </fieldset>
          <fieldset>
            <legend>Setup Mode</legend>
            <input
              type="checkbox"
              name="showSetup"
              id="showSetup"
              defaultChecked={config.showSetup}
              onClick={this.handleConfig}
            />
            <label htmlFor="showSetup">Toggle</label>
          </fieldset>
          <fieldset>
            <legend>Check to Show</legend>
            <input
              type="checkbox"
              name="showDuration"
              id="showDuration"
              defaultChecked={config.showDuration}
              onClick={this.handleConfig}
            />
            <label htmlFor="showDuration">Duration</label>
            <input
              type="checkbox"
              name="showTotalDps"
              id="showTotalDps"
              defaultChecked={config.showTotalDps}
              onClick={this.handleConfig}
            />
            <label htmlFor="showTotalDps">Total DPS</label>
            <input
              type="checkbox"
              name="showHps"
              id="showHps"
              defaultChecked={config.showHps}
              onClick={this.handleConfig}
            />
            <label htmlFor="showHps">HPS</label>
            <br />
            <input
              type="checkbox"
              name="showJobIcon"
              id="showJobIcon"
              defaultChecked={config.showJobIcon}
              onClick={this.handleConfig}
            />
            <label htmlFor="showJobIcon">Job Icon</label>
            <input
              type="checkbox"
              name="showRank"
              id="showRank"
              defaultChecked={config.showRank}
              onClick={this.handleConfig}
            />
            <label htmlFor="showRank">Rank</label>
            <input
              type="checkbox"
              name="showDamagePercent"
              id="showDamagePercent"
              defaultChecked={config.showDamagePercent}
              onClick={this.handleConfig}
            />
            <label htmlFor="showDamagePercent">Damage Percent</label>
          </fieldset>
          <button type="submit" className="reset">
            <span>Reset</span>
          </button>
        </form>
        <div>
          Resize this window as necessary. Everything saves automatically.{' '}
          <strong>Right click</strong> open this window.
        </div>
      </div>
    )
  }
}

export default Config
