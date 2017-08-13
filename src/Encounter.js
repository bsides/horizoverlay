import React, { Component } from 'react'

import './css/encounter.css'

class Encounter extends Component {
  render() {
    let dps =
      this.props.encdps.length <= 7 ? this.props.encdps : this.props.ENCDPS
    let rdps = parseFloat(dps)
    // Looks stupid but it's better than isNaN()
    // eslint-disable-next-line
    rdps = rdps !== rdps ? '∞' : rdps

    const { config } = this.props
    let title =
      this.props.title === 'Encounter'
        ? this.props.CurrentZoneName
        : this.props.title
    let hasOptions = config.showTotalDps || config.showDuration
    return (
      <div className={`encounter${hasOptions ? ' show' : ''}`}>
        <div>
          <div className="encounter-title">
            {title}
          </div>
          <div
            className={`encounter-totaldps${config.showTotalDps
              ? ' show'
              : ''}`}
          >
            {rdps} DPS
          </div>
          <div
            className={`encounter-duration${config.showDuration
              ? ' show'
              : ''}`}
          >
            <span role="img" aria-label="Clock">
              🕒
            </span>{' '}
            {this.props.duration}
          </div>
        </div>
      </div>
    )
  }
}

export default Encounter
