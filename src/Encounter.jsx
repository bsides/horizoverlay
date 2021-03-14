import React from 'react';
import { number, object, string } from 'prop-types';

import './css/encounter.css';

export default function Encounter(props) {
  const {
    duration,
    ENCDPS,
    encdps,
    discordData,
    maxhit,
    CurrentZoneName,
    title,
    limitBreak,
    config,
  } = props;
  const sendToDiscord = () => {
    // finish the fight for ACT
    // Right now bugging everything so it's off
    // window.OverlayPluginApi.endEncounter()

    // Converts 'YOU-Shot-1500' into 'Character Name, Shot (1500)'
    const maxhitName = [
      ...maxhit.replace(/YOU/g, config.characterName).replace(/-/, ', ').replace(/-/, ' ('),
      ')',
    ];
    const encData = {
      title,
      zone: CurrentZoneName,
      duration,
      totalDps: ENCDPS,
      maxhit: maxhitName,
    };
    const encounterRow = `\`${'='.repeat(85)}\`\n\`${encData.title} | ${encData.zone} | ${
      encData.duration
    } | ${encData.totalDps} | ${encData.maxhit}\`\n\`${'-'.repeat(85)}\``;

    // [JOB] CHARACTER | 💪 DPS (DPS%) | 💊 HEAL (HEAL%) | 💀 DEATH | 💣 CRIT% | 🎯 DHIT% |`
    const combatantRow = discordData.map(
      (combatant) =>
        `\n**[${combatant.job}] ${combatant.characterName}** \`| DPS: ${combatant.dps} (${
          combatant.damage
        }%) | HPS: ${combatant.hps} (${combatant.healed}) | DIE: ${combatant.deaths} | CRIT: ${
          combatant.crit
        } | DHIT: ${combatant.dhit} |\`\n\`${'-'.repeat(85)}\``,
    );

    fetch(config.discord, {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: 'H O R I Z O V E R L A Y',
        avatar_url:
          'https://68.media.tumblr.com/2d83ce19282a68c3e2365be87254ae6a/tumblr_oh9wzyYbdb1u9t5z9o1_500.gif',
        content: `${encounterRow}${combatantRow.join('', ',')}`,
      }),
    }).catch((error) => console.error(error));
  };

  const dps = encdps.length <= 7 ? encdps : ENCDPS;
  let totalDps = Number.parseFloat(dps);

  // Looks stupid but it's better than isNaN()
  totalDps = Number.isNaN(totalDps) ? '∞' : totalDps;

  const hasOptions = config.showTotalDps || config.showDuration;

  return (
    <div className={`encounter${hasOptions ? ' show' : ''}`}>
      <div className="skewer">
        <div className="encounter-title">{title === 'Encounter' ? CurrentZoneName : title}</div>
        <div className={`encounter-totaldps${config.showTotalDps ? ' show' : ''}`}>
          {totalDps} DPS
        </div>
        <div
          className={`encounter-limitBreak${config.showTotalDps && limitBreak > 0 ? ' show' : ''}`}
        >
          LB {limitBreak}%
        </div>
        <div className={`encounter-duration${config.showDuration ? ' show' : ''}`}>
          <span role="img" aria-label="Time">
            🕒
          </span>{' '}
          {duration}
        </div>
        <div className={`encounter-discord${config.showDiscord ? '' : ' hide'}`}>
          <button type="button" onClick={sendToDiscord}>
            Send to Discord
          </button>
        </div>
      </div>
    </div>
  );
}

Encounter.propTypes = {
  config: object.isRequired,
  limitBreak: number.isRequired,
  duration: number.isRequired,
  CurrentZoneName: string.isRequired,
  maxhit: string.isRequired,
  discordData: string.isRequired,
  encdps: string.isRequired,
  ENCDPS: string.isRequired,
  title: string.isRequired,
};
