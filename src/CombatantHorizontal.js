import React, { Component } from 'react'
import { jobsTank, jobsHealer, jobsDps } from './helpers'

class CombatantHorizontal extends Component {
  render() {
    let order = this.props.rank
    let job = this.props.data.Job || 'WHO?'
    let jobClass
    if (jobsDps.indexOf(job.toLowerCase()) >= 0) {
      jobClass = ' job-dps'
    }
    if (jobsHealer.indexOf(job.toLowerCase()) >= 0) {
      jobClass = ' job-healer'
    }
    if (jobsTank.indexOf(job.toLowerCase()) >= 0) {
      jobClass = ' job-tank'
    }
    // console.log(this.props.config)
    if (this.props.config.color !== 'byRole') jobClass = ''
    // let width = `${parseInt(
    //   this.props.data.damage / this.props.encounterDamage * 100,
    //   10
    // )}%`
    return (
      <div
        className={`row ${this.props.data.Job}${this.props.isSelf
          ? ' self'
          : ''}${jobClass}`}
        style={{ order }}
      >
        <div className="name">
          <span className="rank">{`${this.props.rank}. `}</span>
          <span className="character-name">
            {this.props.data.name}
          </span>
        </div>
        <div className="dps">
          <div>
            <span className="character-job">
              {job}
            </span>
            <span className="damage-stats">
              {this.props.data.dps} DPS
            </span>
          </div>
        </div>
      </div>
    )
  }
}

export default CombatantHorizontal
