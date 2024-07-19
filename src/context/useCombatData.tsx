import React from 'react'
import { CombatDataContext } from '~/context/combatData'

export const useCombatData = () => {
  return React.useContext(CombatDataContext)
}
