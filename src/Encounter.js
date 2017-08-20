import React, { Component } from 'react'
import { object } from 'prop-types'

import './css/encounter.css'

class Encounter extends Component {
  static propTypes = {
    config: object.isRequired
  }
  sendToDiscord = () => {
    // finish the fight for ACT
    // window.OverlayPluginApi.endEncounter()

    //     const combatantRow = `-------------------------------------------------------------------------------------
    // [JOB] CHARACTER | 💪 DPS (DPS%) | 💊 HEAL (HEAL%) | 💀 DEATH | 💣 CRIT% | 🎯 DHIT% |`

    const data = this.props.discordData
    console.log(data)
    const combatantRow = data.map(combatant => {
      return `**[${combatant.job}] ${combatant.characterName}** \`| DPS: ${combatant.dps} (${combatant.damage}%) | HPS: ${combatant.hps} (${combatant.healed}%) | DIE: ${combatant.deaths} | CRIT: ${combatant.crit} | DHIT: ${combatant.dhit}% |\`\n`
    })
    console.log(combatantRow)
    const encounterRow = `=====================================================================================
Encounter: ENCOUNTER | ZONE | DURATION | RDPS | MAXHIT`

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
        content:
          '\n' +
          `
${combatantRow}
          ` +
          '\n'
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

    // https://discordapp.com/api/webhooks/347402490242793475/imwUYWomByxJh55M1AMWyfYrx1rZMIo869GZDRA6lJqcx87I4jY0UXwZR4DeUrOu5LuY
    return (
      <div className={`encounter${hasOptions ? ' show' : ''}`}>
        <div className="skewer">
          <div className="encounter-title">
            {title}
          </div>
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
            className={`encounter-discord${config.discord === ''
              ? ' hide'
              : ''}`}
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
