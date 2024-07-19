import { Route, HashRouter as Router, Routes } from 'react-router-dom'
// import initActWebSocket from './actwebsocket'
import Config from '~/Config'
import { useCombatData } from '~/context/useCombatData'
import NotFound from '~/NotFound'
import Overlay from '~/Overlay'
import type { OverlayData } from '~/types'

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    __HORIZOVERLAY__: Record<string, any>
    addOverlayListener(type: string, cb: (data: OverlayData) => void): void
    startOverlayEvents(): void
  }
}

export function App() {
  const data = useCombatData()

  if (Object.keys(detail)?.length) {
    return (
      <Router>
        <Routes>
          <Route path={`/`} element={<Overlay {...detail} />} />
          <Route path={`config`} element={<Config />} />
          <Route element={<NotFound text="Page Not Found!" />} />
        </Routes>
      </Router>
    )
  }

  return null
}
