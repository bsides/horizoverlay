import React from 'react'
import { withHelper } from './helpers'
import locale from './locale'

import './css/reboot.css'
import './css/setupMode.css'

var images = require.context('./images', false, /\.png$/)

function SetupModeRaw(props) {
  const { mockData } = props
  const { maxCombatants } = props.config
  const colorClass = props.config.color
  const isVisible = props.config.showSetup ? 'show' : 'hide'
  const loc = locale[props.config.locale]
  return (
    <div
      className={`setupMode ${colorClass}${
        props.config.locale === 'zhCN' || props.config.locale === 'zhHK'
          ? ' chinese'
          : ''
      }`}
      onContextMenu={props.openConfig}
      style={{ zoom: props.config.zoom }}
    >
      <div className={`wrapper ${isVisible}`}>
        <div className="combatants">
          {mockData.map((mock, index) => {
            if (index >= maxCombatants) return false
            if (!mock.isSelf && props.config.enableSoloMode) return false
            let maxhit
            if (mock.maxhit) maxhit = mock.maxhit.replace('-', ': ')
            return (
              mock.name.toLowerCase() !== 'limit break' && (
                <div
                  className={`row${mock.isSelf ? ' self' : ''} ${
                    props.config.color === 'byRole' ? mock.jobRole : ''
                  } ${mock.jobClass} `}
                  style={{ order: mock.rank }}
                  key={mock.rank}
                >
                  <div className="name">
                    {props.config.showRank ? (
                      <span className="rank">{`${mock.rank}. `}</span>
                    ) : null}
                    <span className={`character-name ${ !mock.isSelf && props.config.enableStreamerMode ? 'streamer-mode' : '' }`}>
                      {mock.isSelf && props.config.showSelf
                        ? props.config.characterName
                        : mock.name}
                    </span>
                  </div>
                  <div
                    className={`data-items${
                      props.config.showHighlight ? ' highlight' : ''
                    }${mock.isHealing ? ' inverse' : ''}`}
                  >
                    {props.config.showJobIcon ? (
                      <img
                        src={images(`./${mock.job}.png`)}
                        className="job"
                        alt={mock.jobFull}
                      />
                    ) : null}
                    <div
                      className={`dps${
                        mock.isHealing ? ' relevant' : ' irrelevant'
                      }`}
                    >
                      <div>
                        <span className="damage-stats">
                          {props.config.showHps
                            ? mock.hps
                            : mock.job.toUpperCase()}
                        </span>
                        <span className="label">
                          {props.config.showHps ? ' HPS' : null}
                        </span>
                      </div>
                    </div>
                    <div
                      className={`dps${
                        mock.isHealing ? ' irrelevant' : ' relevant'
                      }`}
                    >
                      <div>
                        <span className="damage-stats">{mock.dps}</span>
                        <span className="label"> DPS</span>
                      </div>
                    </div>
                  </div>
                  {props.config.showDamagePercent ? (
                    <div>
                      <div className="damage-percent-bg">
                        <div
                          className="damage-percent-fg"
                          style={{ width: `${mock.damagePct}px` }}
                        />
                      </div>
                      <div className="damage-percent">{mock.damagePct}%</div>
                    </div>
                  ) : null}
                  <div className="maxhit">
                    {props.config.showMaxhit && maxhit}
                  </div>
                </div>
              )
            )
          })}
        </div>
        <div className="instructions">
          <div
            dangerouslySetInnerHTML={{
              __html: loc.setupMode.instructionsTitle
            }}
          />
          <div
            dangerouslySetInnerHTML={{
              __html: loc.setupMode.instructions
            }}
          />
        </div>
      </div>
      <div className={`notice`}>
        <span>H O R I Z O V E R L A Y</span>
        <div
          dangerouslySetInnerHTML={{
            __html: loc.initial.help
          }}
        />
      </div>
    </div>
  )
}

const SetupMode = withHelper({ WrappedComponent: SetupModeRaw, willMock: true })
export default SetupMode
