import React from 'react'
import Encounter from './Encounter'
import Combatants from './Combatants'
import { withHelper } from './helpers'

import './css/reboot.css'
import './css/index.css'
import './css/overlay.css'

function OverlayRaw(props) {
  return (
    <div
      className={`damage-meter${props.isActive ? '' : ' inactive'}`}
      onContextMenu={props.openConfig}
      style={{ zoom: props.config.zoom }}
    >
      <Combatants
        data={props.Combatant}
        encounterDamage={props.Encounter.damage}
        config={props.config}
      />
      <Encounter {...props.Encounter} wholeData={props} config={props.config} />
    </div>
  )
}

const Overlay = withHelper({ WrappedComponent: OverlayRaw })
export default Overlay
