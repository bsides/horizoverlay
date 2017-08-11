import React, { Component } from 'react'
import { jobsTank, jobsHealer, jobsDps } from './helpers'
var images = require.context('./images', false, /\.png$/);

function HorizElement(props) {
    return (<div className={props.relevant ? "dps" : "dps irrelevant"}>
      <div>
        <span className="damage-stats">
            {props.text}
        </span>
        <span className="label">
            {props.label}
        </span>
      </div>
    </div>);
}

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
    //console.log(this.props.config)
    if (this.props.config.color !== 'byRole') jobClass = ''
    let width = `${parseInt(
      this.props.data.damage / this.props.encounterDamage * 100,
      10
    )}%`
    //console.log(this.props)
    let hpsElement = <HorizElement text={this.props.data.enchps} label="HPS" relevant={this.props.data.enchps > 0}/>
    let dpsElement = <HorizElement text={this.props.data.encdps} label="DPS" relevant={this.props.data.encdps > 0}/>
    let classElement = <HorizElement text={this.props.data.Job.toUpperCase()} label="" relevant="1"/>
    let jobIcon = <img src={images("./"+(this.props.data.Job ? this.props.data.Job.toLowerCase() : "error") + ".png")} className="job" alt={this.props.data.Job}/>
    let damagePercent = (
      <div>
        <div className="damage-percent-bg">
          <div className="damage-percent-fg" style={{width: width}}/>
        </div>
        <div className="damage-percent">
          {width}
        </div>
      </div>);
    return (
      <div
        className={`row ${this.props.data.Job}${this.props.isSelf
          ? ' self'
          : ''}${jobClass}`}
        style={{ order }}
      >
        <div className="name">
          {this.props.config.showRank ? <span className="rank">{`${this.props.rank}. `}</span> : null}
          <span className="character-name">
            {this.props.data.name}
          </span>
        </div>
        <div className="horiz-elems">
          {this.props.config.showJobIcon ? jobIcon : null}
          {this.props.config.showHps ? hpsElement : classElement}
          {dpsElement}
        </div>
        {this.props.config.showDamagePercent ? damagePercent : null}
      </div>
    )
  }
}

export default CombatantHorizontal
