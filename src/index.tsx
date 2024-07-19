import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from '~/App'
import { CombatDataProvider } from '~/context/combatData'
import './css/index.css'
import './css/reboot.css'

// uncomment for testing
// import './testing/testing'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CombatDataProvider>
      <App />
    </CombatDataProvider>
  </React.StrictMode>,
)
