import React, { Component } from 'react'

class CombatantHorizontal extends Component {
  render() {
    let order = this.props.rank
    // let width = `${parseInt(
    //   this.props.data.damage / this.props.encounterDamage * 100,
    //   10
    // )}%`
    return (
      <div
        className={`row ${this.props.data.Job}${this.props.isSelf
          ? ' self'
          : ''}`}
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
              {this.props.data.Job}
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
