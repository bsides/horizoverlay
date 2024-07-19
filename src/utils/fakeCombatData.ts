import { useSettingsStore } from '~/store/settings'
import type { Combatant, OverlayDataForHoriz } from '~/types'
import {
  TEST_NAME_OF_COMBATANTS,
  TEST_NUMBER_OF_COMBATANTS,
} from '~/utils/constants'
import JSONFakeData from '~/utils/fakeData.json'
import {
  convertCombatDataIntoHorizData,
  getNumber,
  getRandom,
  isObjectEmpty,
  sortCombatants,
} from '~/utils/general'

export function handleFakeDataStream(cb: (data: OverlayDataForHoriz) => void) {
  const fakeData = convertCombatDataIntoHorizData(JSONFakeData)
  const testRandomizeValuesWithInterval =
    useSettingsStore.getState().testRandomizeValuesWithInterval

  if (testRandomizeValuesWithInterval) {
    return setInterval(
      () => {
        cb(makeFakeData(fakeData))
      },
      getRandom(2000, 5000),
    )
  }

  return cb(makeFakeData(fakeData))
}

export function makeFakeData(overlayData: OverlayDataForHoriz) {
  const { combatants: originalCombatants } = overlayData
  const duplicatedCombatants = dublicateItemsInArray<Combatant>(
    originalCombatants,
    TEST_NUMBER_OF_COMBATANTS,
  )
  const combatants = duplicatedCombatants.map((combatant, index) => {
    // Take a name from constants
    const name = TEST_NAME_OF_COMBATANTS[index]
    return {
      // Old values that will be replaced by the values below
      ...combatant,
      // Randomize values above
      ...randomizeCombatantValues(combatant),
      // Change the name
      name,
    }
  })
  const sortedCombatants = sortCombatants(combatants)

  return {
    ...overlayData,
    combatants: sortedCombatants,
  } satisfies OverlayDataForHoriz
}

export function randomizeCombatantValues(combatant?: Combatant) {
  if (isObjectEmpty(combatant) || !combatant) {
    return {
      DPS: `${getRandom(2200, 4500)}`,
      dps: `${getRandom(2200.99, 4500.99)}`,
      ENCDPS: `${getRandom(2200, 4500)}`,
      encdps: `${getRandom(2200.99, 4500.99)}`,
      'damage%': `${getRandom(3, 28)}%`,
      'crithit%': `${getRandom(0, 76)}%`,
      'healed%': `${getRandom(0, 30)}%`,
      ENCHPS: `${getRandom(0, 6000)}`,
      deaths: `${getRandom(0, 3)}`,
    }
  }

  const newEntries = Object.entries(combatant).map(([key, value]) => {
    const valueToNumber = getNumber(value)

    if (typeof valueToNumber !== 'undefined') {
      const addSymbolsToNumber = `${value.includes('K') ? 'K' : ''}${value.includes('M') ? 'M' : ''}${value.includes('%') ? '%' : ''}`

      if (valueToNumber > 0) {
        return [
          key,
          `${getRandom(valueToNumber, valueToNumber + 0.5 * valueToNumber)}${addSymbolsToNumber}`,
        ]
      }

      return [
        key,
        `${getRandom(0, value.includes('%') ? 10 : 300)}${addSymbolsToNumber}`,
      ]
    }

    return [key, value]
  })

  return Object.fromEntries(newEntries)
}

function dublicateItemsInArray<T>(arr: T[], numberOfRepetitions: number) {
  return arr.flatMap((item) =>
    Array.from({ length: numberOfRepetitions }).fill(item),
  ) as T[]
}
