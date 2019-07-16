// uncomment for testing
// import './testing/testing'

import React from 'react'
import ReactDOM from 'react-dom'

import { HashRouter as Router, Route, Switch } from 'react-router-dom'

import Overlay from './Overlay'
import Config from './Config'
import NotFound from './NotFound'
import SetupMode from './SetupMode'
import initActWebSocket from './actwebsocket'

// import Raven from 'raven-js'
// import { sentryUrl } from './sentry'

require(`./images/handle.png`)

initActWebSocket()

// Raven.config(sentryUrl).install()

window.lastData = {}
const Inactive = detail => {
  return (
    <Router basename={`${process.env.PUBLIC_URL}`}>
      <Switch>
        <Route path={`/config`} component={Config} />
        <Route component={SetupMode} />
      </Switch>
    </Router>
  )
}

const Root = detail => {
  return (
    <Router basename={`${process.env.PUBLIC_URL}`}>
      <Switch>
        <Route path={`/`} render={() => <Overlay {...detail} />} />
        <Route exact path={`/config`} component={Config} />
        <Route render={() => <NotFound text="Page Not Found!" />} />
      </Switch>
    </Router>
  )
}

// This will run when data is ON
function onOverlayDataUpdate(e) {
  // discordString is true whenever the user uses '/e discord' in game
  // const discordString =
  //   'detail' in e &&
  //   'payload' in e.detail &&
  //   e.detail.payload[2].toLowerCase().indexOf('discord')

  // regardless, we keep sending combat data
  // if (e.type === 'onOverlayDataUpdate' || discordString) {
  // ... but we save the last data in case the next data isn't combat data
  //   window.lastData = e.detail
  //   ReactDOM.render(<Root {...e.detail} />, document.getElementById('root'))
  // } else if (discordString && window.lastData !== {}) {
  // then we send the last data here, which won't update combat numbers but will send discord stuff
  // ReactDOM.render(
  //   <Root detail={window.lastData} discord={true} />,
  //   document.getElementById('root')
  // )
  // }
  const detail = (e.detail.msg ? e.detail.msg : e.detail)
  
  ReactDOM.render(<Root {...detail} />, document.getElementById('root'))
}
// This will run when there's no data
ReactDOM.render(<Inactive />, document.getElementById('root'))

// :: Events
// https://github.com/RainbowMage/OverlayPlugin/wiki/JavaScript-API-reference
// https://github.com/hibiyasleep/OverlayPlugin/wiki/Additional-Javascript-API-Reference

// - onOverlayDataUpdate
// This event occurs when the OverlayPlugin sends the new data.
document.addEventListener('onOverlayDataUpdate', onOverlayDataUpdate)

// - onLogLine
// This event occurs when anything in the chat happens, so we need to clean it up a bit before sending to the component or else it will polute and re-render it a lot unnecessarily
// Not being implemented right now
// document.addEventListener('onLogLine', onOverlayDataUpdate)

// - onOverlayStateUpdate
// This event occurs when the overlay setting has changed.
document.addEventListener('onOverlayStateUpdate', function(e) {
  if (!e.detail.isLocked) {
    document.documentElement.classList.add('resizable')
  } else {
    document.documentElement.classList.remove('resizable')
  }
})
// Receiver of OverlayPluginApi.sendMessage and OverlayPluginApi.broadcastMessage, not being used as far as I know
window.addEventListener('message', function(e) {
  if (e.data.type === 'onOverlayDataUpdate') {
    onOverlayDataUpdate(e.data)
  }
})
