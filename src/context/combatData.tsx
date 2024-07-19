import React from 'react'
import { useSettingsStore } from '~/store/settings'
import type { OverlayData, OverlayDataForHoriz } from '~/types'
import { handleFakeDataStream } from '~/utils/fakeCombatData'
import { convertCombatDataIntoHorizData, sortCombatants } from '~/utils/general'

export const CombatDataContext =
  React.createContext<OverlayDataForHoriz | null>(null)

export function CombatDataProvider({ children }: React.PropsWithChildren) {
  const settings = useSettingsStore()
  const [data, setData] = React.useState<OverlayDataForHoriz | null>(null)

  const handleCombatData = (data: OverlayData) => {
    if (data.isActive === 'true') {
      const convertedData = convertCombatDataIntoHorizData(data)
      const sortedData = sortCombatants(convertedData.combatants)
      setData({ ...convertedData, combatants: sortedData })
    }
  }

  React.useEffect(() => {
    // Regular condition, data flowing from ACT's FFXIV + Overlay plugins
    // These functions come from the shared script in public.html (predefined websocket events)
    if (!settings.isTestData) {
      window.addOverlayListener('CombatData', handleCombatData)
      window.startOverlayEvents()
    }

    // Special condition, used to configure the interface or during development
    // Sends fake data through the application
    if (settings.isTestData) {
      window.__HORIZOVERLAY__.intervalId = handleFakeDataStream(setData)
    }

    // Resets the interval created in the special condition above
    return () => {
      if (window?.__HORIZOVERLAY__?.intervalId) {
        clearInterval(window.__HORIZOVERLAY__.intervalId)
      }
    }
  }, [settings.isTestData])

  return (
    <CombatDataContext.Provider value={data}>
      {children}
    </CombatDataContext.Provider>
  )
}
