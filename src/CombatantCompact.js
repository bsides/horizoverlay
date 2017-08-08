import React, { Component } from 'react'

class CombatantCompact extends Component {
  render() {
    let width = `${parseInt(
      this.props.data.damage / this.props.encounterDamage * 100,
      10
    )}%`

    // const jobImage = require(`./images/${this.props.data.Job.toLowerCase()}`)
    let jobImage = ''
    if (this.props.data.Job.toLowerCase() !== '')
      jobImage = require(`./images/${this.props.data.Job.toLowerCase()}.png`)
    const jobImages = {
      pgl: 'http://ffxiv.gamerescape.com/w/images/c/c5/Pugilist_Icon_7.png'
    }
    let order = this.props.rank
    return (
      <div
        className={`row ${this.props.data.Job}${this.props.isSelf
          ? ' self'
          : ''}`}
        style={{ order }}
      >
        <div className="bar" style={{ width }} />
        <div className="text-overlay">
          <span className="job-icon">
            <img src={jobImage} />
          </span>
          <span className="rank">{`${this.props.rank}. `}</span>
          <span className="character-name">
            {this.props.data.name}
          </span>
          <span className="character-job">
            {this.props.data.Job}
          </span>
          <div className="damage-stats">
            <span className="damage">{this.props.data.damage}</span> (<span className="dps">{this.props.data.dps}</span>,{' '}
            <span className="damage-percent">{width}</span>)
          </div>
        </div>
      </div>
    )
  }
}

export default CombatantCompact
