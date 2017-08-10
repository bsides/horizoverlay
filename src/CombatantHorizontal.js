import React, { Component } from 'react'
var images = require.context('./images', false, /\.png$/);
function HorizElement(props) {
    return (<div className={props.relevant ? "horizelem" : "horizelem irrelevant"}>
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
    // let width = `${parseInt(
    //   this.props.data.damage / this.props.encounterDamage * 100,
    //   10
    // )}%`
    //console.log(this.props);
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
          <img src={images("./"+(this.props.data.Job ? this.props.data.Job.toLowerCase() : "error") + ".png")} className="job"/>
        </div>
        <div className="horiz-elems">
            <HorizElement text={this.props.data.enchps} label="HPS" relevant={this.props.data.heals > 0}/>
            <HorizElement text={this.props.data.encdps} label="DPS" relevant={this.props.data.hits > 0}/>
        </div>
      </div>
    )
  }
}

export default CombatantHorizontal
