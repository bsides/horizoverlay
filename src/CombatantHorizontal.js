import React, { Component } from 'react'
import { bool, string, number, object, oneOfType } from 'prop-types'
import { jobRoles, otherIcons } from './helpers'
var images = require.context('./images', false, /\.png$/)

DataWrapper.propTypes = {
  text: string.isRequired,
  label: string,
  relevant: oneOfType([bool, string, number]).isRequired
}
DataText.propTypes = {
  type: string.isRequired,
  show: bool,
  data: object
}
DamageBar.propTypes = {
  width: string,
  show: bool.isRequired
}

export default class CombatantHorizontal extends Component {
  static propTypes = {
    encounterDamage: oneOfType([string, number]).isRequired,
    rank: number,
    data: object.isRequired,
    config: object.isRequired,
    isSelf: bool.isRequired
  }
  render() {
    const { config, data } = this.props
    const order = this.props.rank
    const jobName = data.Job || 'WHO?'
    const name = data.name.toLowerCase()
    let jobStyleClass, jobIcon, damageWidth

    // don't need to render this component if this is a limit break
    if (!data.Job && name === 'limit break') return null

    // Color theme byRole
    if (config.color === 'byRole') {
      for (const role in jobRoles) {
        if (jobRoles[role].indexOf(data.Job.toLowerCase()) >= 0)
          jobStyleClass = ` job-${role}`
        if (data.Job === '') {
          for (const job of jobRoles[role]) {
            if (name.indexOf(job) >= 0) jobStyleClass = ` job-${role}`
          }
        }
      }
    } else {
      jobStyleClass = ''
    }

    // Damage Percent
    if (config.showDamagePercent) {
      damageWidth = `${parseInt(
        data.damage / this.props.encounterDamage * 100,
        10
      )}%`
    }

    // Job icon
    if (config.showJobIcon) {
      jobIcon = './'
      if (data.Job === '') {
        // well there are a lot of things that doesn't have a job, like summoner's pets and alike. Lets assume them all.
        let newIcon
        newIcon = 'error'
        for (const otherIcon of otherIcons) {
          if (name.indexOf(otherIcon) >= 0) newIcon = otherIcon
        }
        jobIcon += newIcon
      } else {
        jobIcon += data.Job.toLowerCase()
      }
      jobIcon = images(`${jobIcon}.png`)
    }

    // Character name (self, instead of 'YOU')
    const characterName = this.props.isSelf ? config.characterName : data.name
    return (
      <div
        className={`row ${data.Job}${jobStyleClass}${this.props.isSelf
          ? ' self'
          : ''}`}
        style={{ order }}
      >
        <div className="name">
          {config.showRank &&
            <span className="rank">{`${this.props.rank}. `}</span>}
          <span className="character-name">
            {characterName}
          </span>
        </div>
        <div className="horiz-elems">
          {jobIcon && <img src={jobIcon} className="job" alt={jobName} />}
          <DataText type="hps" show={config.showHps} {...data} />
          <DataText type="job" show={!config.showHps} {...data} />
          <DataText type="dps" {...data} />
        </div>
        <DamageBar {...damageWidth} show={config.showDamagePercent} />
      </div>
    )
  }
}

function DamageBar({ width, show }) {
  if (!show) return null
  return (
    <div>
      <div className="damage-percent-bg">
        <div className="damage-percent-fg" style={{ width }} />
      </div>
      <div className="damage-percent">
        {width}
      </div>
    </div>
  )
}

function DataWrapper(props) {
  return (
    <div className={props.relevant ? 'dps' : 'dps irrelevant'}>
      <div>
        <span className="damage-stats">
          {props.text}
        </span>
        <span className="label">
          {props.label}
        </span>
      </div>
    </div>
  )
}

function DataText({ type, show = true, ...data } = {}) {
  if (!show) return null
  let text, label, relevant
  switch (type) {
    case 'hps':
      text = data.enchps
      label = 'HPS'
      relevant = data.enchps > 0
      break
    case 'dps':
      text = data.encdps
      label = 'DPS'
      relevant = data.encdps > 0
      break
    case 'job':
      text = data.Job.toUpperCase()
      label = ''
      relevant = '1'
      break
    default:
  }
  return <DataWrapper text={text} label={label} relevant={relevant} />
}
