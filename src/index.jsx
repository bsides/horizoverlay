// uncomment for testing
// import './testing/testing'

import React from 'react'
import { createRoot } from 'react-dom/client'

import { HashRouter as Router, Route, Routes } from 'react-router-dom'

import Overlay from './Overlay'
import Config from './Config'
import NotFound from './NotFound'
import SetupMode from './SetupMode'
import initActWebSocket from './actwebsocket'

const container = document.getElementById('root')
const root = createRoot(container)
root.render(<Init />)

function Init() {
  const [detail, setDetail] = React.useState()

  React.useEffect(() => {
    initActWebSocket()
  }, [])

  React.useEffect(() => {
    function onOverlayDataUpdate(e) {
      const newDetail = e.detail.msg ? e.detail.msg : e.detail
      setDetail(newDetail)
    }

    function onOverlayStateUpdate(e) {
      if (!e.detail.isLocked) {
        document.documentElement.classList.add('resizable')
      } else {
        document.documentElement.classList.remove('resizable')
      }
    }

    function onWindowMessage(e) {
      if (e.data.type === 'onOverlayDataUpdate') {
        onOverlayDataUpdate(e.data)
      }
    }

    document.addEventListener('onOverlayDataUpdate', onOverlayDataUpdate)
    document.addEventListener('onOverlayStateUpdate', onOverlayStateUpdate)
    // Receiver of OverlayPluginApi.sendMessage and OverlayPluginApi.broadcastMessage, not being used as far as I know
    window.addEventListener('message', onWindowMessage)

    return () => {
      document.removeEventListener('onOverlayDataUpdate', onOverlayDataUpdate)
      document.removeEventListener('onOverlayStateUpdate', onOverlayStateUpdate)
      document.removeEventListener('message', onWindowMessage)
    }
  }, [])

  if (detail) {
    return (
      <Router>
        <Routes>
          <Route path={`/`} element={<Overlay {...detail} />} />
          <Route exact path={`/config`} component={Config} />
          <Route element={<NotFound text="Page Not Found!" />} />
        </Routes>
      </Router>
    )
  }

  return null
}
