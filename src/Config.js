import React, { Component } from 'react'
import { withHelper } from './helpers'
import locale from './locale'

import './css/config.css'

class ConfigRaw extends Component {
  state = { ...this.props }
  handleConfig = (e) => {
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
  resetConfig = (e) => {
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
    const loc = locale[config.locale].config

    const checkboxFieldsToChange = [
      {
        name: 'showRank',
        id: 'showRank',
        defaultChecked: config.showRank,
        label: loc.toggleOption1
      },
      {
        name: 'showJobIcon',
        id: 'showJobIcon',
        defaultChecked: config.showJobIcon,
        label: loc.toggleOption2
      },
      {
        name: 'showHps',
        id: 'showHps',
        defaultChecked: config.showHps,
        label: loc.toggleOption3
      },
      {
        name: 'showHighlight',
        id: 'showHighlight',
        defaultChecked: config.showHighlight,
        label: loc.toggleOption4
      },
      {
        name: 'showSelf',
        id: 'showSelf',
        defaultChecked: config.showSelf,
        label: loc.toggleOption5
      },
      {
        name: 'showMaxhit',
        id: 'showMaxhit',
        defaultChecked: config.showMaxhit,
        label: loc.toggleOption11
      },
      {
        name: 'showDuration',
        id: 'showDuration',
        defaultChecked: config.showDuration,
        label: loc.toggleOption6
      },
      {
        name: 'showTotalDps',
        id: 'showTotalDps',
        defaultChecked: config.showTotalDps,
        label: loc.toggleOption7
      },
      {
        name: 'showDamagePercent',
        id: 'showDamagePercent',
        defaultChecked: config.showDamagePercent,
        label: loc.toggleOption8
      },
      {
        name: 'showJobless',
        id: 'showJobless',
        defaultChecked: config.showJobless,
        label: loc.toggleOption12
      },
      {
        name: 'showDiscord',
        id: 'showDiscord',
        defaultChecked: config.showDiscord,
        label: loc.toggleOption9
      },
      {
        name: 'showLocale',
        id: 'showLocale',
        defaultChecked: config.showLocale,
        label: loc.toggleOption10
      },
      {
        name: 'reverseOrder',
        id: 'reverseOrder',
        defaultChecked: config.reverseOrder,
        label: loc.toggleOption14
      },
      {
        name: 'enableStreamerMode',
        id: 'enableStreamerMode',
        defaultChecked: config.enableStreamerMode,
        label: loc.toggleOption13
      }
    ]

    return (
      <div className="config" style={{ zoom: config.zoom }}>
        <form onSubmit={(e) => this.resetConfig(e)}>
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
              {/* Setup Mode */}
              {loc.setupTitle}
            </span>
          </label>

          <fieldset>
            <legend>{loc.nameTitle}</legend>
            <div>
              <label htmlFor="characterName">
                {/* Your character's name: */}
                {loc.nameHelp}
              </label>
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
            <legend>
              {/* Color theme */}
              {loc.themeTitle}
            </legend>
            <div>
              <input
                type="radio"
                name="color"
                id="colorByRole"
                value="byRole"
                checked={config.color === 'byRole'}
                onChange={this.handleConfig}
              />
              <label htmlFor="colorByRole">
                {/* Color By Role */}
                {loc.themeOption1}
              </label>
              <br />
              <input
                type="radio"
                name="color"
                id="colorBlackWhite"
                value="blackWhite"
                checked={config.color === 'blackWhite'}
                onChange={this.handleConfig}
              />
              <label htmlFor="colorBlackWhite">
                {/* Black & White */}
                {loc.themeOption2}
              </label>
            </div>
          </fieldset>
          <fieldset>
            <legend>
              {/* Check to Show */}
              {loc.toggleTitle}
            </legend>
            <div className="checkboxFieldsToChange">
              {checkboxFieldsToChange.map(field => (
                <div>
                  <input
                    type="checkbox"
                    name={field.name}
                    id={field.id}
                    defaultChecked={field.defaultChecked}
                    onChange={this.handleConfig}
                  />
                  <label htmlFor={field.id}>
                    {field.label}
                  </label>
                </div>
              ))}
              <div className="combatants">
                <label htmlFor="maxCombatants">
                  {/* # Combatants */}
                  {loc.maxCombatantsTitle}
                </label>
                <input
                  type="text"
                  id="maxCombatants"
                  name="maxCombatants"
                  value={config.maxCombatants}
                  onChange={this.handleConfig}
                />
              </div>

            </div>
          </fieldset>
          <fieldset className="fieldsZoom">
            <legend>
              {/* Zoom Scale */}
              {loc.zoomTitle}
            </legend>

            <label
              htmlFor="zoom80"
              className={`${config.zoom === '0.8' ? '' : ' disabled'}`}
            >
              <span>
                <input
                  type="radio"
                  name="zoom"
                  id="zoom80"
                  value="0.8"
                  checked={config.zoom === '0.8'}
                  onChange={this.handleConfig}
                />{' '}
                {/* 80% */}
                {loc.zoomOption1}
              </span>
            </label>
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
                {/* 90% */}
                {loc.zoomOption2}
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
                {/* 100% */}
                {loc.zoomOption3}
              </span>
            </label>

            <br />
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
                {/* 110% */}
                {loc.zoomOption4}
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
                {/* 150% */}
                {loc.zoomOption5}
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
                {/* 200% */}
                {loc.zoomOption6}
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
            <span>
              {/* Reset */}
              {loc.resetTitle}
            </span>
          </button>
        </form>
        <form className="form-discord">
          <label htmlFor="discord">
            {/* Discord Webhook URL */}
            {loc.discordTitle}
          </label>
          <input
            type="text"
            id="discord"
            name="discord"
            value={config.discord}
            placeholder={loc.discordHelp}
            onChange={this.handleConfig}
          />
          <label htmlFor="locale" className={config.showLocale ? '' : 'hide'}>
            {/* Language */}
            {loc.localeTitle}
          </label>
          <select
            name="locale"
            id="locale"
            onChange={this.handleConfig}
            value={config.locale}
            className={config.showLocale ? '' : 'hide'}
          >
            <option value={loc.localeOption1Value}>
              {/* English */}
              {loc.localeOption1}
            </option>
            <option value={loc.localeOption2Value}>
              {/* Português */}
              {loc.localeOption2}
            </option>
            <option value={loc.localeOption3Value}>
              {/* Simplified Chinese */}
              {loc.localeOption3}
            </option>
            <option value={loc.localeOption4Value}>
              {/* Traditional Chinese */}
              {loc.localeOption4}
            </option>
            <option value={loc.localeOption5Value}>
              {/* French */}
              {loc.localeOption5}
            </option>
          </select>
          <span
            className="help"
            dangerouslySetInnerHTML={{
              __html: loc.help,
            }}
          >
            {/* Everything saves automatically.<br />
            <strong>Right click open this window.</strong> */}
          </span>
        </form>
      </div>
    )
  }
}

const Config = withHelper({ WrappedComponent: ConfigRaw, isConfig: true })
export default Config
