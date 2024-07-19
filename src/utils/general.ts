import { useSettingsStore } from '~/store/settings'
import type { Combatant, OverlayData, OverlayDataForHoriz } from '~/types'
import { DEFAULT_SETTINGS } from './constants'

export function getRandom(min: number, max: number): number {
  const first = Math.ceil(min)
  const last = Math.floor(max)
  const result = Math.random() * (last - first + 1) + first
  return +result.toFixed(2)
}

export function isObjectEmpty(
  obj: Record<string | number | symbol, unknown> | undefined | null,
) {
  if (typeof obj === 'undefined' || obj === null || !obj) {
    return true
  }

  return !!(Object.keys(obj).length === 0 && obj.constructor === Object)
}

export function getNumber(value: number | string) {
  const convertedValue =
    typeof value === 'string' ? removeSymbolsFromNumber(value) : value
  const valueToNumber = +convertedValue
  if (typeof valueToNumber === 'number' && !isNaN(valueToNumber)) {
    return valueToNumber
  }
}

function removeSymbolsFromNumber(value: string) {
  let newValue = ''
  if (value.includes(',')) {
    newValue = value.replace(',', '.')
  }

  if (value.includes('%')) {
    newValue = value.replace('%', '')
  }

  if (value.includes('K')) {
    newValue = value.replace('K', '')
  }

  if (value.includes('M')) {
    newValue = value.replace('M', '')
  }

  return newValue || value
}

const keysToSortAsStrings: Array<keyof Combatant> = ['name', 'Job']
export function sortCombatants(
  combatants: Combatant[],
  keyToCompare = DEFAULT_SETTINGS.sortBy,
  orderToCompare = DEFAULT_SETTINGS.sortOrder,
) {
  const keyToCompareFromSettings = useSettingsStore.getState().sortBy
  const sortOrderFromSettings = useSettingsStore.getState().sortOrder

  return [...combatants].sort((a, b) => {
    const key = keyToCompareFromSettings || keyToCompare
    const order = sortOrderFromSettings || orderToCompare
    const [first, second] =
      order === 'desc' ? [b[key], a[key]] : [a[key], b[key]]

    // as string
    if (keysToSortAsStrings.includes(key)) {
      return first.toLowerCase() < second.toLowerCase() ? -1 : 1
    }

    // as number
    return parseFloat(first) - parseFloat(second)
  })
}

export function convertCombatDataIntoHorizData(overlayData: OverlayData) {
  const {
    Combatant,
    Encounter: encounter,
    isActive: originalIsActive,
  } = overlayData
  const combatantsNames = Object.keys(Combatant)
  const combatants = combatantsNames.map(
    (combatantName) => Combatant[combatantName as keyof typeof Combatant],
  ) as unknown as OverlayDataForHoriz['combatants']
  const isActive = originalIsActive === 'true' ? true : false

  return {
    // For now, we don't need ACT's (really weird, as magic keys' object) format.
    // combatant: Combatant,
    combatants,
    encounter,
    isActive,
  } as OverlayDataForHoriz
}
