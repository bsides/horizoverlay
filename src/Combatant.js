import React, { Component } from 'react'

class Combatant extends Component {
  render() {
    return (
      <li className={`row${this.props.isSelf ? ' self' : ''}`}>
        <span className="dps">
          {this.props.data.dps}
        </span>
        <div className="detail">
          <span className="title">
            <span className="label-left">
              {this.props.data.name}
            </span>
            <span className="label-right">
              {this.props.data.damage}
            </span>
          </span>
          <span className="bar" />
        </div>
      </li>
    )
  }
}

export default Combatant
