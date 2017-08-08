import React, { Component } from 'react'

class Encounter extends Component {
  shouldComponentUpdate() {
    return this.props.title !== 'Encounter'
  }
  render() {
    // let dps =
    //   this.props.encdps.length <= 7 ? this.props.encdps : this.props.ENCDPS
    let rdps = parseFloat(this.props.encdps)
    let rdps_max = 0

    if (!isNaN(rdps) && rdps != Infinity) {
      rdps_max = Math.max(rdps_max, rdps)
    }

    // let width = rdps / rdps_max * 100

    return (
      <div className="encounter">
        <span className="target-name">
          {this.props.title}
        </span>
        <span className="duration">
          {this.props.duration}
        </span>
      </div>
    )
  }
}

export default Encounter
