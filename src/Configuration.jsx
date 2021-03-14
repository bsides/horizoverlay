import React, { useState, useEffect } from 'react';
import { func } from 'prop-types';
// eslint-disable-next-line import/named
import { withHelper } from './helpers';
import locale from './helper/locale';

import './css/config.css';

function ConfigurationRaw(props) {
  const [state, setState] = useState({ ...props });
  const { config } = state;
  const loc = locale[config.locale].config;

  const handleConfig = (e) => {
    const { target } = e;
    const { type, name, checked } = target;

    if (type === 'text') {
      e.preventDefault();
    }

    const configCopied = { ...config };
    const key = name;
    let { value } = target;

    // Why aren't HTML elements more consistent? 😦
    if (type === 'checkbox') {
      value = checked;
    }

    // update the value in our copied state...
    configCopied[key] = value;
    // ...and set it to component' state
    setState({ config: configCopied });

    // And then save it to localStorage!
    localStorage.setItem('horizoverlay', JSON.stringify(configCopied));
  };

  const updateState = () => {
    const configStore = localStorage.getItem('horizoverlay');
    if (!configStore) {
      localStorage.setItem('horizoverlay', JSON.stringify(config));
      setState({ config });
    } else {
      setState({ config: JSON.parse(configStore) });
    }
  };

  useEffect(() => {
    window.addEventListener('storage', updateState, false);
    updateState();
    return () => {
      window.removeEventListener('storage', updateState);
    };
  }, [props]);

  const resetConfig = (e) => {
    e.preventDefault();

    // Clear any setup
    window.localStorage.clear();

    // send to the wrapper component
    props.handleReset(e);

    // well that's horrible
    window.location.reload();
  };

  return (
    <div className="config" style={{ zoom: config.zoom }}>
      <form onSubmit={(e) => resetConfig(e)}>
        <label htmlFor="showSetup" className={`setup-btn${config.showSetup ? '' : ' disabled'}`}>
          <span>
            <input
              type="checkbox"
              name="showSetup"
              id="showSetup"
              checked={config.showSetup}
              onChange={handleConfig}
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
              onChange={handleConfig}
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
              onChange={handleConfig}
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
              onChange={handleConfig}
            />
            <label htmlFor="colorBlackWhite">
              {/* Black & White */}
              {loc.themeOption2}
            </label>
          </div>
        </fieldset>
        <fieldset className="fieldsToShow">
          <legend>
            {/* Check to Show */}
            {loc.toggleTitle}
          </legend>
          <input
            type="checkbox"
            name="showRank"
            id="showRank"
            defaultChecked={config.showRank}
            onChange={handleConfig}
          />
          <label htmlFor="showRank">
            {/* Rank # */}
            {loc.toggleOption1}
          </label>
          <input
            type="checkbox"
            name="showJobIcon"
            id="showJobIcon"
            defaultChecked={config.showJobIcon}
            onChange={handleConfig}
          />
          <label htmlFor="showJobIcon">
            {/* Job Icon */}
            {loc.toggleOption2}
          </label>
          <input
            type="checkbox"
            name="showHps"
            id="showHps"
            defaultChecked={config.showHps}
            onChange={handleConfig}
          />
          <label htmlFor="showHps">
            {/* HPS */}
            {loc.toggleOption3}
          </label>
          <input
            type="checkbox"
            name="showHighlight"
            id="showHighlight"
            defaultChecked={config.showHighlight}
            onChange={handleConfig}
          />
          <label htmlFor="showHighlight">
            {/* Highlight */}
            {loc.toggleOption4}
          </label>
          <input
            type="checkbox"
            name="showSelf"
            id="showSelf"
            defaultChecked={config.showSelf}
            onChange={handleConfig}
          />
          <label htmlFor="showSelf">
            {/* Self */}
            {loc.toggleOption5}
          </label>
          <input
            type="checkbox"
            name="showMaxhit"
            id="showMaxhit"
            defaultChecked={config.showMaxhit}
            onChange={handleConfig}
          />
          <label htmlFor="showMaxhit">
            {/* Self */}
            {loc.toggleOption11}
          </label>
          <br />
          <input
            type="checkbox"
            name="showDuration"
            id="showDuration"
            defaultChecked={config.showDuration}
            onChange={handleConfig}
          />
          <label htmlFor="showDuration">
            {/* Duration */}
            {loc.toggleOption6}
          </label>
          <input
            type="checkbox"
            name="showTotalDps"
            id="showTotalDps"
            defaultChecked={config.showTotalDps}
            onChange={handleConfig}
          />
          <label htmlFor="showTotalDps">
            {/* Total DPS */}
            {loc.toggleOption7}
          </label>
          <input
            type="checkbox"
            name="showDamagePercent"
            id="showDamagePercent"
            defaultChecked={config.showDamagePercent}
            onChange={handleConfig}
          />
          <label htmlFor="showDamagePercent">
            {/* Damage % */}
            {loc.toggleOption8}
          </label>
          <input
            type="checkbox"
            name="showJobless"
            id="showJobless"
            defaultChecked={config.showJobless}
            onChange={handleConfig}
          />
          <label htmlFor="showJobless">
            {/* Self */}
            {loc.toggleOption12}
          </label>
          <input
            type="checkbox"
            name="showDiscord"
            id="showDiscord"
            defaultChecked={config.showDiscord}
            onChange={handleConfig}
          />
          <label htmlFor="showDiscord">
            {/* Discord */}
            {loc.toggleOption9}
          </label>
          <input
            type="checkbox"
            name="showLocale"
            id="showLocale"
            defaultChecked={config.showLocale}
            onChange={handleConfig}
          />
          <label htmlFor="showLocale">
            {/* Language */}
            {loc.toggleOption10}
          </label>
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
              onChange={handleConfig}
            />
          </div>
        </fieldset>
        <fieldset className="fieldsZoom">
          <legend>
            {/* Zoom Scale */}
            {loc.zoomTitle}
          </legend>

          <label htmlFor="zoom80" className={`${config.zoom === '0.8' ? '' : ' disabled'}`}>
            <span>
              <input
                type="radio"
                name="zoom"
                id="zoom80"
                value="0.8"
                checked={config.zoom === '0.8'}
                onChange={handleConfig}
              />{' '}
              {/* 80% */}
              {loc.zoomOption1}
            </span>
          </label>
          <label htmlFor="zoom90" className={`${config.zoom === '0.9' ? '' : ' disabled'}`}>
            <span>
              <input
                type="radio"
                name="zoom"
                id="zoom90"
                value="0.9"
                checked={config.zoom === '0.9'}
                onChange={handleConfig}
              />{' '}
              {/* 90% */}
              {loc.zoomOption2}
            </span>
          </label>
          <label htmlFor="zoom100" className={`${config.zoom === '1' ? '' : ' disabled'}`}>
            <span>
              <input
                type="radio"
                name="zoom"
                id="zoom100"
                value="1"
                checked={config.zoom === '1'}
                onChange={handleConfig}
              />{' '}
              {/* 100% */}
              {loc.zoomOption3}
            </span>
          </label>

          <br />
          <label htmlFor="zoom110" className={`${config.zoom === '1.1' ? '' : ' disabled'}`}>
            <span>
              <input
                type="radio"
                name="zoom"
                id="zoom110"
                value="1.1"
                checked={config.zoom === '1.1'}
                onChange={handleConfig}
              />{' '}
              {/* 110% */}
              {loc.zoomOption4}
            </span>
          </label>
          <label htmlFor="zoom150" className={`${config.zoom === '1.5' ? '' : ' disabled'}`}>
            <span>
              <input
                type="radio"
                name="zoom"
                id="zoom150"
                value="1.5"
                checked={config.zoom === '1.5'}
                onChange={handleConfig}
              />{' '}
              {/* 150% */}
              {loc.zoomOption5}
            </span>
          </label>
          <label htmlFor="zoom200" className={`${config.zoom === '2' ? '' : ' disabled'}`}>
            <span>
              <input
                type="radio"
                name="zoom"
                id="zoom200"
                value="2"
                checked={config.zoom === '2'}
                onChange={handleConfig}
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
            onChange={handleConfig}
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
          onChange={handleConfig}
        />
        <label htmlFor="locale" className={config.showLocale ? '' : 'hide'}>
          {/* Language */}
          {loc.localeTitle}
        </label>
        <select
          name="locale"
          id="locale"
          onChange={handleConfig}
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
          /* eslint-disable-next-line react/no-danger */
          dangerouslySetInnerHTML={{
            __html: loc.help,
          }}
        />
      </form>
    </div>
  );
}

ConfigurationRaw.propTypes = {
  handleReset: func.isRequired,
};

const Configuration = withHelper({ WrappedComponent: ConfigurationRaw, isConfig: true });
export default Configuration;