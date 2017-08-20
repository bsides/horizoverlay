import React, { Component } from 'react'
import { object } from 'prop-types'

import './css/encounter.css'

class Encounter extends Component {
  static propTypes = {
    config: object.isRequired
  }
  sendToDiscord = () => {
    const data = new FormData()
    data.append('json', JSON.stringify(this.props.combatant))
    console.log(JSON.stringify(this.props.combatant))

    const combatantRow = `-------------------------------------------------------------------------------------
[JOB] CHARACTER | 💪 DPS (DPS%) | 💊 HEAL (HEAL%) | 💀 DEATH | 💣 CRIT% | 🎯 DHIT% |`
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
          '```MD\n' +
          `# WAW! Que espertinho!\n` +
          `
Encounter at:         [${this.props.wholeData.Encounter.CurrentZoneName}]
Encounter Total DPS:  [${this.props.wholeData.Encounter.encdps}]
---
<dt>Definition list</dt>
---
* Now imagine
* a list of crap
* that could fit here
[Mnk]
          ` +
          '\n```'
      })
    })
      .then(res => res.json())
      .then(data => console.log(data))
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
      <div className={`encounter${hasOptions && ' show'}`}>
        <div className="skewer">
          <div className="encounter-title">
            {title}
          </div>
          <div
            className={`encounter-totaldps${config.showTotalDps && ' show'}`}
          >
            {totalDps} DPS
          </div>
          <div
            className={`encounter-duration${config.showDuration && ' show'}`}
          >
            <span role="img" aria-label="Time">
              🕒
            </span>{' '}
            {this.props.duration}
          </div>
          <div style={{ display: 'none' }}>
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
