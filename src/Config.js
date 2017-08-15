import React, { Component } from 'react'
import { withHelper } from './helpers'

import './css/config.css'

class ConfigRaw extends Component {
  state = { ...this.props }
  handleConfig = e => {
    const target = e.target
    if (target.type === 'text') e.preventDefault()
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
  resetConfig = e => {
    e.preventDefault()

    // Clear any setup
    window.localStorage.clear()

    // send to the wrapper component
    this.props.handleReset(e)

    // well that's horrible
    window.location.reload()
  }
  // *** IMPORTANT ***
  // Gotta bind 'onChange' for checkboxes since false values don't bubble to 'onChange'!
  render() {
    let { config } = this.state
    return (
      <div className="config" style={{ zoom: config.zoom }}>
        <form onSubmit={e => this.resetConfig(e)}>
          <label
            htmlFor="showSetup"
            className={`setup-btn${config.showSetup ? '' : ' disabled'}`}
          >
            <span>
              <input
                type="checkbox"
                name="showSetup"
                id="showSetup"
                checked={config.showSetup}
                onChange={this.handleConfig}
              />{' '}
              Setup Mode
            </span>
          </label>

          <fieldset>
            <legend>Character Name</legend>
            <div>
              <label htmlFor="characterName">Your character's name:</label>
              <input
                type="text"
                name="characterName"
                id="characterName"
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
          <fieldset className="fieldsToShow">
            <legend>Check to Show</legend>
            <input
              type="checkbox"
              name="showDuration"
              id="showDuration"
              defaultChecked={config.showDuration}
              onChange={this.handleConfig}
            />
            <label htmlFor="showDuration">Duration</label>
            <input
              type="checkbox"
              name="showTotalDps"
              id="showTotalDps"
              defaultChecked={config.showTotalDps}
              onChange={this.handleConfig}
            />
            <label htmlFor="showTotalDps">Total DPS</label>
            <input
              type="checkbox"
              name="showHps"
              id="showHps"
              defaultChecked={config.showHps}
              onChange={this.handleConfig}
            />
            <label htmlFor="showHps">HPS</label>
            <br />
            <input
              type="checkbox"
              name="showJobIcon"
              id="showJobIcon"
              defaultChecked={config.showJobIcon}
              onChange={this.handleConfig}
            />
            <label htmlFor="showJobIcon">Job Icon</label>
            <input
              type="checkbox"
              name="showRank"
              id="showRank"
              defaultChecked={config.showRank}
              onChange={this.handleConfig}
            />
            <label htmlFor="showRank">Rank</label>
            <input
              type="checkbox"
              name="showDamagePercent"
              id="showDamagePercent"
              defaultChecked={config.showDamagePercent}
              onChange={this.handleConfig}
            />
            <label htmlFor="showDamagePercent">Damage Percent</label>
          </fieldset>
          <fieldset className="fieldsZoom">
            <legend>Zoom Scale</legend>

            <label
              htmlFor="zoom90"
              className={`${config.zoom === '0.9' ? '' : ' disabled'}`}
            >
              <span>
                <input
                  type="radio"
                  name="zoom"
                  id="zoom90"
                  value="0.9"
                  checked={config.zoom === '0.9'}
                  onChange={this.handleConfig}
                />{' '}
                90%
              </span>
            </label>
            <label
              htmlFor="zoom100"
              className={`${config.zoom === '1' ? '' : ' disabled'}`}
            >
              <span>
                <input
                  type="radio"
                  name="zoom"
                  id="zoom100"
                  value="1"
                  checked={config.zoom === '1'}
                  onChange={this.handleConfig}
                />{' '}
                100%
              </span>
            </label>
            <label
              htmlFor="zoom110"
              className={`${config.zoom === '1.1' ? '' : ' disabled'}`}
            >
              <span>
                <input
                  type="radio"
                  name="zoom"
                  id="zoom110"
                  value="1.1"
                  checked={config.zoom === '1.1'}
                  onChange={this.handleConfig}
                />{' '}
                110%
              </span>
            </label>

            <br />
            <label
              htmlFor="zoom125"
              className={`${config.zoom === '1.25' ? '' : ' disabled'}`}
            >
              <span>
                <input
                  type="radio"
                  name="zoom"
                  id="zoom125"
                  value="1.25"
                  checked={config.zoom === '1.25'}
                  onChange={this.handleConfig}
                />{' '}
                125%
              </span>
            </label>
            <label
              htmlFor="zoom150"
              className={`${config.zoom === '1.5' ? '' : ' disabled'}`}
            >
              <span>
                <input
                  type="radio"
                  name="zoom"
                  id="zoom150"
                  value="1.5"
                  checked={config.zoom === '1.5'}
                  onChange={this.handleConfig}
                />{' '}
                150%
              </span>
            </label>
            <label
              htmlFor="zoom200"
              className={`${config.zoom === '2' ? '' : ' disabled'}`}
            >
              <span>
                <input
                  type="radio"
                  name="zoom"
                  id="zoom200"
                  value="2"
                  checked={config.zoom === '2'}
                  onChange={this.handleConfig}
                />{' '}
                200%
              </span>
            </label>
            <input
              type="range"
              min="0.5"
              max="2"
              step="0.1"
              id="zoom"
              name="zoom"
              value={config.zoom}
              onChange={this.handleConfig}
            />
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

const Config = withHelper({ WrappedComponent: ConfigRaw, isConfig: true })
export default Config
