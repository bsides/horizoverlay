import React from 'react';
import { array, func, object } from 'prop-types';
// eslint-disable-next-line import/named
import { withHelper } from './helpers';
import locale from './helper/locale';

import './css/reboot.css';
import './css/setupMode.css';

const images = require.context('./images', false, /\.png$/);

function SetupModeRaw(props) {
  const { openConfig, config, mockData } = props;
  const { maxCombatants } = config;
  const {
    showSetup,
    zoom,
    characterName,
    color,
    showMaxhit,
    showRank,
    locale: locale1,
    showHps,
    showJobIcon,
    showSelf,
    showHighlight,
    showDamagePercent,
  } = config;
  const colorClass = color;
  const isVisible = showSetup ? 'show' : 'hide';
  const loc = locale[locale1];

  return (
    <div
      className={`setupMode ${colorClass}${
        locale1 === 'zhCN' || locale1 === 'zhHK' ? ' chinese' : ''
      }`}
      onContextMenu={openConfig}
      style={{ zoom }}
    >
      <div className={`wrapper ${isVisible}`}>
        <div className="combatants">
          {mockData.map((mock, index) => {
            if (index >= maxCombatants) {
              return false;
            }
            let maxhit;
            if (mock.maxhit) {
              maxhit = mock.maxhit.replace('-', ': ');
            }
            return (
              mock.name.toLowerCase() !== 'limit break' && (
                <div
                  className={`row${mock.isSelf ? ' self' : ''} ${
                    color === 'byRole' ? mock.jobRole : ''
                  } ${mock.jobClass} `}
                  style={{ order: mock.rank }}
                  key={mock.rank}
                >
                  <div className="name">
                    {showRank ? <span className="rank">{`${mock.rank}. `}</span> : null}
                    <span className="character-name">
                      {mock.isSelf && showSelf ? characterName : mock.name}
                    </span>
                  </div>
                  <div
                    className={`data-items${showHighlight ? ' highlight' : ''}${
                      mock.isHealing ? ' inverse' : ''
                    }`}
                  >
                    {showJobIcon ? (
                      <img
                        src={images(`./${mock.job}.png`).default}
                        className="job"
                        alt={mock.jobFull}
                      />
                    ) : null}
                    <div className={`dps${mock.isHealing ? ' relevant' : ' irrelevant'}`}>
                      <div>
                        <span className="damage-stats">
                          {showHps ? mock.hps : mock.job.toUpperCase()}
                        </span>
                        <span className="label">{showHps ? ' HPS' : null}</span>
                      </div>
                    </div>
                    <div className={`dps${mock.isHealing ? ' irrelevant' : ' relevant'}`}>
                      <div>
                        <span className="damage-stats">{mock.dps}</span>
                        <span className="label"> DPS</span>
                      </div>
                    </div>
                  </div>
                  {showDamagePercent ? (
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
                  <div className="maxhit">{showMaxhit && maxhit}</div>
                </div>
              )
            );
          })}
        </div>
        <div className="instructions">
          <div
            dangerouslySetInnerHTML={{
              __html: loc.setupMode.instructionsTitle,
            }}
          />
          <div
            dangerouslySetInnerHTML={{
              __html: loc.setupMode.instructions,
            }}
          />
        </div>
      </div>
      <div className="notice">
        <span>H O R I Z O V E R L A Y</span>
        <div
          dangerouslySetInnerHTML={{
            __html: loc.initial.help,
          }}
        />
      </div>
    </div>
  );
}

SetupModeRaw.propTypes = {
  mockData: array.isRequired,
  config: object.isRequired,
  openConfig: func.isRequired,
};

const SetupMode = withHelper({ WrappedComponent: SetupModeRaw, willMock: true });
export default SetupMode;
