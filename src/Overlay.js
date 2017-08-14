import React from 'react'
import Encounter from './Encounter'
import Combatants from './Combatants'
import { withHelper } from './helpers'

import './css/reboot.css'
import './css/index.css'
import './css/overlay.css'

function OverlayRaw(props) {
  const { isActive, Combatant } = props
  return (
    <div
      className={`damage-meter${isActive ? '' : ' inactive'}`}
      onContextMenu={props.openConfig}
      style={{ zoom: props.config.zoom }}
    >
      <Combatants
        data={Combatant}
        encounterDamage={props.Encounter.damage}
        config={props.config}
      />
      <Encounter {...props.Encounter} config={props.config} />
    </div>
  )
}

const Overlay = withHelper({ WrappedComponent: OverlayRaw })
export default Overlay
