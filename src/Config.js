import React, { Component } from 'react'
import './config.css'

class Config extends Component {
  // *** IMPORTANT ***
  // Gotta bind 'onClick' for checkboxes since false values don't bubble to 'onChange'!
  render() {
    const { config, handleConfig, toggleConfig } = this.props
    return (
      <div onContextMenu={toggleConfig} className="config">
        <div>
          Please resize this window to setup. <strong>Right click</strong> to
          save and go back and forth.
        </div>
        <form>
          <fieldset>
            <legend>Color theme</legend>
            <div>
              <input
                type="radio"
                name="color"
                value="default"
                checked={config.color === 'default'}
                onChange={handleConfig}
              />
              <label htmlFor="colorDefault">Black & White (default)</label>
              <input
                type="radio"
                name="color"
                value="byRole"
                checked={config.color === 'byRole'}
                onChange={handleConfig}
              />
              <label htmlFor="colorByRole">Color By Role</label>
            </div>
          </fieldset>
          <fieldset>
            <legend>Check to Show</legend>
            <input
              type="checkbox"
              name="encounterDuration"
              id="encounterDuration"
              defaultChecked={config.encounterDuration}
              onClick={handleConfig}
            />
            <label htmlFor="encounterDuration">Encounter Duration</label>
            <input
              type="checkbox"
              name="encounterTotalDps"
              id="encounterTotalDps"
              defaultChecked={config.encounterTotalDps}
              onClick={handleConfig}
            />
            <label htmlFor="encounterTotalDps">Encounter Total DPS</label>
          </fieldset>
        </form>
      </div>
    )
  }
}

export default Config
