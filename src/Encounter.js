import React, { Component } from 'react'

import './encounter.css'

class Encounter extends Component {
  shouldComponentUpdate() {
    return this.props.title !== 'Encounter'
  }
  render() {
    let dps =
      this.props.encdps.length <= 7 ? this.props.encdps : this.props.ENCDPS
    let rdps = parseFloat(dps)
    // let rdps_max = 0

    // if (!isNaN(rdps) && rdps != Infinity) {
    //   rdps_max = Math.max(rdps_max, rdps)
    // }
    // console.log(rdps)

    // let width = rdps / rdps_max * 100
    const { config } = this.props
    let hasOptions = config.encounterTotalDps || config.encounterDuration
    return (
      <div className={`encounter${hasOptions ? ' show' : ''}`}>
        <div>
          <div className="encounter-title">
            {this.props.title}
          </div>
          <div
            className={`encounter-totaldps${config.encounterTotalDps
              ? ' show'
              : ''}`}
          >
            {rdps} DPS
          </div>
          <div
            className={`encounter-duration${config.encounterDuration
              ? ' show'
              : ''}`}
          >
            🕒 {this.props.duration}
          </div>
        </div>
      </div>
    )
  }
}

export default Encounter
