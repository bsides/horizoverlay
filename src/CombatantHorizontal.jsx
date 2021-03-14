import React from 'react';
import { bool, number, object, oneOfType, string } from 'prop-types';
// eslint-disable-next-line import/named
import { jobRoles, otherIcons } from './helpers';

const images = require.context('./images', false, /\.png$/);

export default function CombatantHorizontal(props) {
  const { config, data, isSelf, encounterDamage, rank } = props;
  const order = rank;
  const jobName = data.Job || 'WHO?';
  const name = data.name.toLowerCase();
  let jobStyleClass;
  let jobIcon;
  // Damage Percent
  const damageWidth = `${Number.parseInt((data.damage / encounterDamage) * 100, 10)}%`;

  // don't need to render this component if this is a limit break
  if (!data.Job && name === 'limit break') {
    return null;
  }

  // Color theme byRole
  if (config.color === 'byRole') {
    for (const role of Object.entries(jobRoles)) {
      if (role.includes(data.Job.toLowerCase())) {
        jobStyleClass = ` job-${role}`;
      }
      if (data.Job === '') {
        for (const job of jobRoles[role]) {
          if (name.includes(job)) {
            jobStyleClass = ` job-${role}`;
          }
        }
      }
    }
  } else {
    jobStyleClass = '';
  }

  // Job icon
  if (config.showJobIcon) {
    jobIcon = './';
    if (data.Job === '') {
      // well there are a lot of things that doesn't have a job, like summoner's pets and alike. Lets assume them all.
      let newIcon;
      newIcon = 'error';
      for (const otherIcon of otherIcons) {
        if (name.includes(otherIcon)) {
          newIcon = otherIcon;
        }
      }
      jobIcon += newIcon;
    } else {
      jobIcon += data.Job.toLowerCase();
    }
    jobIcon = images(`${jobIcon}.png`).default;
  }

  // Character name (self, instead of 'YOU')
  const characterName = isSelf ? config.characterName : data.name;

  const isHealing = data.ENCHPS > data.ENCDPS;

  let maxhit;
  if (data.maxhit) {
    maxhit = data.maxhit.replace('-', ': ');
  }
  return (
    <div
      className={`row ${data.Job}${jobStyleClass}${isSelf && config.showSelf ? ' self' : ''}`}
      style={{ order }}
    >
      <div className="name">
        {config.showRank ? <span className="rank">{`${order}. `}</span> : ''}
        <span className="character-name">{characterName}</span>
      </div>
      <div
        className={`data-items${config.showHighlight ? ' highlight' : ''}${
          isHealing ? ' inverse' : ''
        }`}
      >
        {jobIcon && <img src={jobIcon} className="job" alt={jobName} />}
        <DataText type="hps" show={config.showHps} {...data} />
        <DataText type="job" show={!config.showHps} {...data} />
        <DataText type="dps" {...data} />
      </div>
      <DamageBar width={damageWidth} show={config.showDamagePercent} />
      <div className="maxhit">{config.showMaxhit && maxhit}</div>
    </div>
  );
}

function DamageBar({ width, show }) {
  if (!show) {
    return null;
  }

  return (
    <div>
      <div className="damage-percent-bg">
        <div className="damage-percent-fg" style={{ width }} />
      </div>
      <div className="damage-percent">{width}</div>
    </div>
  );
}

function DataWrapper(props) {
  return (
    <div className={props.relevant ? 'dps' : 'dps irrelevant'}>
      <div>
        <span className="damage-stats">{props.text}</span>
        <span className="label">{props.label}</span>
      </div>
    </div>
  );
}

function DataText({ type, show = true, ...data } = {}) {
  if (!show) {
    return null;
  }
  let text;
  let label;
  let relevant;

  switch (type) {
    case 'hps':
      text = data.ENCHPS;
      label = ' HPS';
      relevant = data.ENCHPS > data.ENCDPS;
      break;
    case 'dps':
      text = data.ENCDPS;
      label = ' DPS';
      relevant = data.ENCDPS > data.ENCHPS;
      break;
    case 'job':
      text = data.Job.toUpperCase();
      label = '';
      relevant = '1';
      break;
    default:
  }

  return <DataWrapper text={text} label={label} relevant={relevant} />;
}

CombatantHorizontal.propTypes = {
  config: object.isRequired,
  data: object.isRequired,
  isSelf: bool.isRequired,
  rank: string.isRequired,
  encounterDamage: string.isRequired,
};

DataWrapper.propTypes = {
  text: oneOfType([string, number]).isRequired,
  relevant: oneOfType([bool, string, number]).isRequired,
  label: string.isRequired,
};
DataText.propTypes = {
  type: string.isRequired,
  show: bool.isRequired,
};
DamageBar.propTypes = {
  show: bool.isRequired,
  width: string.isRequired,
};
