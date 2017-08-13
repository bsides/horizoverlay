import React, { Component } from 'react'
import { defaultConfig, mockData } from './helpers'
import { shape, bool, string, number } from 'prop-types'

import './reboot.css'
import './nothing.css'

var images = require.context('./images', false, /\.png$/)

class Nothing extends Component {
  static defaultProps = { mockData, config: defaultConfig }
  static propTypes = {
    config: shape({
      showSetup: bool.isRequired,
      color: string.isRequired,
      characterName: string.isRequired,
      showDuration: bool.isRequired,
      showTotalDps: bool.isRequired,
      showHps: bool.isRequired,
      showJobIcon: bool.isRequired,
      showRank: bool.isRequired,
      showDamagePercent: bool.isRequired,
      zoom: number.isRequired
    })
  }
  state = {
    config: {}
  }
  configWindow = {}
  componentDidMount() {
    const configStore = localStorage.getItem('horizoverlay')
    if (!configStore) {
      const config = this.props.config
      localStorage.setItem('horizoverlay', JSON.stringify(config))
      this.setState({ config })
    } else {
      const config = JSON.parse(configStore)
      this.setState({ config })
    }
  }
  openConfig = () => {
    const windowFeatures =
      'menubar=no,location=no,resizable=no,scrollbars=yes,status=no,width=1000,height=187'
    this.configWindow = window.open(
      '/config/',
      'Horizoverlay Config',
      windowFeatures
    )
  }
  render() {
    const colorClass = this.state.config.color
    const isVisible = this.state.config.showSetup ? 'show' : 'hide'
    return (
      <div className={`nothing ${colorClass}`} onContextMenu={this.openConfig}>
        <div className={`wrapper ${isVisible}`}>
          <div className="combatants">
            {mockData.map(mock =>
              <div
                className={`row${mock.isSelf ? ' self' : ''} ${this.state.config
                  .color === 'byRole'
                  ? mock.jobRole
                  : ''} ${mock.jobClass} `}
                style={{ order: mock.rank }}
                key={mock.rank}
              >
                <div className="name">
                  {this.state.config.showRank
                    ? <span className="rank">{`${mock.rank}. `}</span>
                    : null}
                  <span className="character-name">
                    {mock.isSelf ? this.state.config.characterName : mock.name}
                  </span>
                </div>
                <div className="horiz-elems">
                  {this.state.config.showJobIcon
                    ? <img
                        src={images(`./${mock.job}.png`)}
                        className="job"
                        alt={mock.jobFull}
                      />
                    : null}
                  <div
                    className={`dps${mock.isHealing
                      ? ' relevant'
                      : ' irrelevant'}`}
                  >
                    <div>
                      <span className="damage-stats">
                        {this.state.config.showHps
                          ? mock.hps
                          : mock.job.toUpperCase()}
                      </span>
                      <span className="label">
                        {this.state.config.showHps ? 'HPS' : null}
                      </span>
                    </div>
                  </div>
                  <div
                    className={`dps${mock.isHealing
                      ? ' irrelevant'
                      : ' relevant'}`}
                  >
                    <div>
                      <span className="damage-stats">
                        {mock.dps}
                      </span>
                      <span className="label">DPS</span>
                    </div>
                  </div>
                </div>
                {this.state.config.showDamagePercent
                  ? <div>
                      <div className="damage-percent-bg">
                        <div
                          className="damage-percent-fg"
                          style={{ width: `${mock.damagePct}px` }}
                        />
                      </div>
                      <div className="damage-percent">
                        {mock.damagePct}%
                      </div>
                    </div>
                  : null}
              </div>
            )}
          </div>
          <div className="instructions">
            <div>
              <strong>Right click</strong> anywhere this window to open
              settings!
            </div>
            <div>
              This is NOT real data, this is just a mock so you can place and
              setup this overlay the way you want. Go hit a dummy or involve in
              real combat to get real data here. <br />Also, please resize this
              window to something like 70% your screen width.
            </div>
          </div>
        </div>
        <div className={`notice`}>
          <span>H O R I Z O V E R L A Y</span>
          <div>
            Right click here to show Settings. Be sure "Enable clickthru" in ACT
            is off.
          </div>
        </div>
      </div>
    )
  }
}

export default Nothing
