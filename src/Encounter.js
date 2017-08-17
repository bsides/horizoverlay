import React, { Component } from 'react'
import { object } from 'prop-types'

import './css/encounter.css'

class Encounter extends Component {
  static propTypes = {
    config: object.isRequired
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
        <div>
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
        </div>
      </div>
    )
  }
}

export default Encounter
