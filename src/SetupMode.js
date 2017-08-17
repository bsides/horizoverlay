import React from 'react'
import { withHelper } from './helpers'

import './css/reboot.css'
import './css/setupMode.css'

var images = require.context('./images', false, /\.png$/)

function SetupModeRaw(props) {
  const { mockData } = props
  const colorClass = props.config.color
  const isVisible = props.config.showSetup ? 'show' : 'hide'
  return (
    <div
      className={`setupMode ${colorClass}`}
      onContextMenu={props.openConfig}
      style={{ zoom: props.config.zoom }}
    >
      <div className={`wrapper ${isVisible}`}>
        <div className="combatants">
          {mockData.map(
            mock =>
              mock.name.toLowerCase() !== 'limit break' &&
              <div
                className={`row${mock.isSelf ? ' self' : ''} ${props.config
                  .color === 'byRole'
                  ? mock.jobRole
                  : ''} ${mock.jobClass} `}
                style={{ order: mock.rank }}
                key={mock.rank}
              >
                <div className="name">
                  {props.config.showRank
                    ? <span className="rank">{`${mock.rank}. `}</span>
                    : null}
                  <span className="character-name">
                    {mock.isSelf ? props.config.characterName : mock.name}
                  </span>
                </div>
                <div className="horiz-elems">
                  {props.config.showJobIcon
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
                        {props.config.showHps
                          ? mock.hps
                          : mock.job.toUpperCase()}
                      </span>
                      <span className="label">
                        {props.config.showHps ? 'HPS' : null}
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
                {props.config.showDamagePercent
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

const SetupMode = withHelper({ WrappedComponent: SetupModeRaw, willMock: true })
export default SetupMode
