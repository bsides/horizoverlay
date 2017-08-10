import React, { Component } from 'react'

import './reboot.css'
import './nothing.css'

class Nothing extends Component {
  state = {
    config: {}
  }
  defaultConfig = {
    color: 'default',
    encounterDuration: false,
    encounterTotalDps: false
  }
  configWindow = {}
  componentDidMount() {
    const configStore = localStorage.getItem('horizoverlay')
    if (!configStore) {
      const config = this.defaultConfig
      localStorage.setItem('horizoverlay', JSON.stringify(config))
      this.setState({ config })
    } else {
      const config = JSON.parse(configStore)
      this.setState({ config })
    }
  }
  openConfig = () => {
    const windowFeatures =
      'menubar=no,location=no,resizable=no,scrollbars=yes,status=no,width=960,height=156'
    this.configWindow = window.open(
      '/config/',
      'Horizoverlay Config',
      windowFeatures
    )
  }
  render() {
    const colorClass = this.state.config.color
    return (
      <div className={`nothing ${colorClass}`} onContextMenu={this.openConfig}>
        <div className="combatants">
          <div className="row Nin self job-dps" style={{ order: 1 }}>
            <div className="name">
              <span className="rank">1. </span>
              <span className="character-name">Zidane Tribal (YOU)</span>
            </div>
            <div className="dps">
              <div>
                <span className="character-job">Nin</span>
                <span className="damage-stats">5450.30 DPS</span>
              </div>
            </div>
          </div>
          <div className="row Blm job-dps" style={{ order: 2 }}>
            <div className="name">
              <span className="rank">2. </span>
              <span className="character-name">Vivi Ornitier</span>
            </div>
            <div className="dps">
              <div>
                <span className="character-job">Blm</span>
                <span className="damage-stats">5283.29 DPS</span>
              </div>
            </div>
          </div>
          <div className="row Smn job-dps" style={{ order: 3 }}>
            <div className="name">
              <span className="rank">3. </span>
              <span className="character-name">Garnet Alexandros</span>
            </div>
            <div className="dps">
              <div>
                <span className="character-job">Smn</span>
                <span className="damage-stats">2648.91 DPS</span>
              </div>
            </div>
          </div>
          <div className="row Drg job-dps" style={{ order: 4 }}>
            <div className="name">
              <span className="rank">4. </span>
              <span className="character-name">Freya Crescent</span>
            </div>
            <div className="dps">
              <div>
                <span className="character-job">Drg</span>
                <span className="damage-stats">1977.42 DPS</span>
              </div>
            </div>
          </div>
          <div className="row Mnk job-dps" style={{ order: 5 }}>
            <div className="name">
              <span className="rank">5. </span>
              <span className="character-name">Amarant Coral</span>
            </div>
            <div className="dps">
              <div>
                <span className="character-job">Mnk</span>
                <span className="damage-stats">1654.90 DPS</span>
              </div>
            </div>
          </div>
          <div className="row pld job-tank" style={{ order: 6 }}>
            <div className="name">
              <span className="rank">6. </span>
              <span className="character-name">Adelbert Steiner</span>
            </div>
            <div className="dps">
              <div>
                <span className="character-job">Pld</span>
                <span className="damage-stats">1548.24 DPS</span>
              </div>
            </div>
          </div>
          <div className="row War job-tank" style={{ order: 8 }}>
            <div className="name">
              <span className="rank">7. </span>
              <span className="character-name">Quina Quen</span>
            </div>
            <div className="dps">
              <div>
                <span className="character-job">War</span>
                <span className="damage-stats">1366.61 DPS</span>
              </div>
            </div>
          </div>
          <div className="row Whm job-healer" style={{ order: 7 }}>
            <div className="name">
              <span className="rank">8. </span>
              <span className="character-name">Eiko Carol</span>
            </div>
            <div className="dps">
              <div>
                <span className="character-job">Whm</span>
                <span className="damage-stats">1461.64 DPS</span>
              </div>
            </div>
          </div>
          <div className="row Sch job-healer" style={{ order: 9 }}>
            <div className="name">
              <span className="rank">9. </span>
              <span className="character-name">Alphinaud Cheater</span>
            </div>
            <div className="dps">
              <div>
                <span className="character-job">Sch</span>
                <span className="damage-stats">447.18 DPS</span>
              </div>
            </div>
          </div>
        </div>
        <div className="instructions">
          <div>
            <strong>Right click</strong> anywhere this window to open settings!
          </div>
          <div>
            This is NOT real data, this is just a mock so you can place and
            setup this overlay the way you want. Go hit a dummy or involve in
            real combat to get real data here. <br />Also, please resize this
            window to something like 70% your screen width.
          </div>
        </div>
      </div>
    )
  }
}

export default Nothing
