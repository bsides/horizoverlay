import React, { useState, useEffect } from 'react';
import { bool, func, object } from 'prop-types';
import Encounter from './Encounter';
import Combatants from './Combatants';
// eslint-disable-next-line import/named
import { withHelper } from './helpers';

import './css/reboot.css';
import './css/index.css';
import './css/overlay.css';

function OverlayRaw(props) {
  const [state, setState] = useState({ ...props.config, limitBreak: 0, discordData: [] });

  const handleLimitBreak = (value) => {
    setState({ limitBreak: value });
  };
  if (Object.getOwnPropertyNames(props.Combatant).length === 0) {
    return false;
  }

  const maxRows = props.config.maxCombatants;
  const dataArray = Object.keys(props.Combatant);
  const battler = dataArray.slice(0, maxRows);
  let combatant;
  const discordData = [];

  for (const ref of battler) {
    combatant = props.Combatant[battler[ref]];

    // Send to Discord the right name in Settings
    if (combatant.name.toUpperCase() === 'YOU') {
      combatant.name = props.config.characterName;
    }

    // Send limit break data separated
    if (combatant.name.toLowerCase() === 'limit break') {
      handleLimitBreak(
        Number.parseInt((props.Combatant.damage / props.Encounter.damage) * 100, 10),
      );
      break;
    }

    discordData.push({
      job: combatant.Job,
      characterName: combatant.name,
      dps: combatant.ENCDPS,
      damage: Number.parseInt((combatant.damage / props.Encounter.damage) * 100, 10),
      hps: combatant.ENCHPS,
      healed: combatant['healed%'],
      deaths: combatant.deaths,
      crit: combatant['crithit%'],
      dhit: combatant.DirectHitPct,
    });
  }
  setState({ discordData });

  const updateState = () => {
    const configStore = localStorage.getItem('horizoverlay');
    if (!configStore) {
      localStorage.setItem('horizoverlay', JSON.stringify(props.config));
      setState({ ...props.config });
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

  return (
    <div
      className={`damage-meter${props.isActive ? '' : ' inactive'}${
        props.config.locale === 'zhCN' || props.config.locale === 'zhHK' ? ' chinese' : ''
      }`}
      onContextMenu={props.openConfig}
      style={{ zoom: props.config.zoom }}
    >
      <Combatants
        data={props.Combatant}
        encounterDamage={props.Encounter.damage}
        config={props.config}
      />
      <Encounter
        {...props.Encounter}
        limitBreak={state.limitBreak}
        discordData={state.discordData}
        config={props.config}
      />
    </div>
  );
}

OverlayRaw.propTypes = {
  Combatant: object.isRequired,
  config: object.isRequired,
  Encounter: object.isRequired,
  isActive: bool.isRequired,
  openConfig: func.isRequired,
};

const Overlay = withHelper({ WrappedComponent: OverlayRaw });
export default Overlay;
