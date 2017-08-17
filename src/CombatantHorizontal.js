import React, { Component } from 'react'
import { bool, string, number, oneOfType } from 'prop-types'
import { jobRoles } from './helpers'
var images = require.context('./images', false, /\.png$/)

DataElement.propTypes = {
  text: string.isRequired,
  label: string,
  relevant: oneOfType([bool, string, number]).isRequired
}

export default class CombatantHorizontal extends Component {
  render() {
    const { config } = this.props
    const order = this.props.rank
    const job = this.props.data.Job || 'WHO?'
    let jobClass

    // Color theme byRole
    if (config.color === 'byRole') {
      for (const role in jobRoles) {
        if (jobRoles[role].indexOf(job.toLowerCase()) >= 0) {
          jobClass = ` job-${role}`
        }
      }
    } else {
      jobClass = ''
    }

    const width = `${parseInt(
      this.props.data.damage / this.props.encounterDamage * 100,
      10
    )}%`

    const damagePercent = (
      <div>
        <div className="damage-percent-bg">
          <div className="damage-percent-fg" style={{ width }} />
        </div>
        <div className="damage-percent">
          {width}
        </div>
      </div>
    )
    const characterName = this.props.isSelf
      ? config.characterName
      : this.props.data.name
    return (
      <div
        className={`row ${this.props.data.Job}${jobClass}${this.props.isSelf &&
          ' self'}`}
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
          <Data type="jobIcon" {...this.props.data} show={config.showJobIcon} />

          <Data type="hps" {...this.props.data} show={config.showHps} />
          <Data type="job" {...this.props.data} show={!config.showHps} />

          <Data type="dps" {...this.props.data} />
        </div>
        {config.showDamagePercent && damagePercent}
      </div>
    )
  }
}

function DataElement(props) {
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

function Data({ type, show = true, ...data } = {}) {
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
    case 'jobIcon':
      return (
        <img
          src={images(`./${data.Job ? data.Job.toLowerCase() : 'error'}.png`)}
          className="job"
          alt={data.Job}
        />
      )
    default:
  }
  return <DataElement text={text} label={label} relevant={relevant} />
}
