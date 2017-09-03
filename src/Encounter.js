import React, { Component } from 'react'
import { object, array } from 'prop-types'

import './css/encounter.css'

class Encounter extends Component {
  static propTypes = {
    config: object.isRequired,
    discordData: array
  }
  sendToDiscord = () => {
    // finish the fight for ACT
    // Right now bugging everything so it's off
    // window.OverlayPluginApi.endEncounter()

    // Converts 'YOU-Shot-1500' into 'Character Name, Shot (1500)'
    const maxhitName = this.props.maxhit
      .replace(/YOU/g, this.props.config.characterName)
      .replace(/-/, ', ')
      .replace(/-/, ' (')
      .concat(')')
    const encData = {
      title: this.props.title,
      zone: this.props.CurrentZoneName,
      duration: this.props.duration,
      totalDps: this.props.ENCDPS,
      maxhit: maxhitName
    }
    const encounterRow = `\`${'='.repeat(
      85
    )}\`\n\`${encData.title} | ${encData.zone} | ${encData.duration} | ${encData.totalDps} | ${encData.maxhit}\`\n\`${'-'.repeat(
      85
    )}\``

    const data = this.props.discordData

    // [JOB] CHARACTER | 💪 DPS (DPS%) | 💊 HEAL (HEAL%) | 💀 DEATH | 💣 CRIT% | 🎯 DHIT% |`
    const combatantRow = data.map(combatant => {
      return `\n**[${combatant.job}] ${combatant.characterName}** \`| DPS: ${combatant.dps} (${combatant.damage}%) | HPS: ${combatant.hps} (${combatant.healed}) | DIE: ${combatant.deaths} | CRIT: ${combatant.crit} | DHIT: ${combatant.dhit} |\`\n\`${'-'.repeat(
        85
      )}\``
    })

    fetch(this.props.config.discord, {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: 'H O R I Z O V E R L A Y',
        avatar_url:
          'https://68.media.tumblr.com/2d83ce19282a68c3e2365be87254ae6a/tumblr_oh9wzyYbdb1u9t5z9o1_500.gif',
        content: `${encounterRow}${combatantRow.join('', ',')}`
      })
    })
  }
  render() {
    const { config } = this.props
    let dps =
      this.props.encdps.length <= 7 ? this.props.encdps : this.props.ENCDPS
    let totalDps = parseFloat(dps)

    // Looks stupid but it's better than isNaN()
    // eslint-disable-next-line
    totalDps = totalDps !== totalDps ? '∞' : totalDps

    let title =
      this.props.title === 'Encounter'
        ? this.props.CurrentZoneName
        : this.props.title
    let hasOptions = config.showTotalDps || config.showDuration
    return (
      <div className={`encounter${hasOptions ? ' show' : ''}`}>
        <div className="skewer">
          <div className="encounter-title">{title}</div>
          <div
            className={`encounter-totaldps${config.showTotalDps
              ? ' show'
              : ''}`}
          >
            {totalDps} DPS
          </div>
          <div
            className={`encounter-limitBreak${config.showTotalDps &&
            this.props.limitBreak > 0
              ? ' show'
              : ''}`}
          >
            LB {this.props.limitBreak}%
          </div>
          <div
            className={`encounter-duration${config.showDuration
              ? ' show'
              : ''}`}
          >
            <span role="img" aria-label="Time">
              🕒
            </span>{' '}
            {this.props.duration}
          </div>
          <div
            className={`encounter-discord${config.showDiscord ? '' : ' hide'}`}
          >
            <button type="button" onClick={this.sendToDiscord}>
              Send to Discord
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default Encounter
