import React from 'react';
import { object, string } from 'prop-types';
import CombatantHorizontal from './CombatantHorizontal';

export default function Combatants(props) {
  // if data is empty then don't re-render
  if (Object.getOwnPropertyNames(props.data).length === 0) {
    return false;
  }

  const { config, data, encounterDamage } = props;

  return {
    render() {
      const maxRows = config.maxCombatants;
      const dataArray = Object.keys(data);
      const battler = dataArray
        .filter(
          (player) =>
            data[player].name.toLowerCase() !== 'limit break' &&
            (config.showJobless || (data[player].Job && data[player].Job !== '')) &&
            (data[player].ENCDPS > 0 || data[player].ENCHPS > 0)
        )
        .slice(0, maxRows);
      const rows = [];
      let combatant;
      let isSelf;

      for (const ref of battler) {
        combatant = data[battler[ref]];

        // We'll change the global 'YOU' name in case it's, well, you
        // In case you changedw your name in ACT and in the overlay config
        isSelf = combatant.name.toUpperCase() === 'YOU' || config.characterName === combatant.name;

        // We need to reasign it here since it will call a reference
        const rank = Number.parseInt(ref, 10) + 1;

        // don't need to render this component if this is a limit break
        // if (!combatant.name.toLowerCase() === 'limit break')
        rows.push(
          <CombatantHorizontal
            encounterDamage={encounterDamage}
            rank={rank}
            data={combatant}
            config={config}
            isSelf={isSelf}
            key={battler[ref]}
          />
        );
      }
      return <div className="combatants">{rows}</div>;
    },
  };
}

Combatants.propTypes = {
  config: object.isRequired,
  data: object.isRequired,
  encounterDamage: string.isRequired,
};
