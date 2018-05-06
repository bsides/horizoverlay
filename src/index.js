// uncomment for testing
// import './testing/testing'

import React from 'react'
import ReactDOM from 'react-dom'

import { HashRouter as Router, Route, Switch } from 'react-router-dom'

import Overlay from './Overlay'
import Config from './Config'
import NotFound from './NotFound'
import SetupMode from './SetupMode'

import Raven from 'raven-js'
import { sentryUrl } from './sentry'

import WebSocketImpl from './actwebsocket'

require(`./images/handle.png`)

Raven.config(sentryUrl).install()

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
var webs = null

var wsUri = 'ws://@HOST_PORT@/MiniParse'
var overlayWindowId, querieSet
var QueryString = (function() {
  // This function is anonymous, is executed immediately and
  // the return value is assigned to QueryString!
  var query_string = {}
  var query = window.location.search.substring(1)
  var vars = query.split('&')
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split('=')
    // If first entry with this name
    if (typeof query_string[pair[0]] === 'undefined') {
      query_string[pair[0]] = decodeURIComponent(pair[1])
      // If second entry with this name
    } else if (typeof query_string[pair[0]] === 'string') {
      var arr = [query_string[pair[0]], decodeURIComponent(pair[1])]
      query_string[pair[0]] = arr
      // If third or later entry with this name
    } else {
      query_string[pair[0]].push(decodeURIComponent(pair[1]))
    }
  }
  return query_string
})()

// webs
var host_port = QueryString['HOST_PORT']
var need_to_get_host_port = false
var need_to_set_wsuri = typeof wsUri === 'undefined'

if (need_to_set_wsuri) {
  window.wsUri = 'ws://@HOST_PORT@/MiniParse'
  need_to_get_host_port = typeof host_port === 'undefined'
} else {
  need_to_get_host_port =
    typeof host_port === 'undefined' ? wsUri.indexOf('HOST_PORT') === -1 : true
}

if (need_to_get_host_port) {
  // ws://localhost:10501/
  if (window.location.host !== '')
    host_port = 'ws://' + window.location.host + '/'
  else host_port = 'ws://localhost:10501/'
}

// wsUri check
if (wsUri.indexOf('@HOST_PORT') !== -1) {
  while (host_port.endsWith('/')) {
    host_port = host_port.substring(0, host_port.length - 1)
  }

  if (wsUri.indexOf('//') === 0) {
    wsUri = wsUri.substring(2)
  }

  if (wsUri.indexOf('ws://') === 0 || wsUri.indexOf('wss://') === 0) {
    if (host_port.indexOf('ws://') === 0 || host_port.indexOf('wss://') === 0) {
      wsUri = wsUri.replace(/ws:\/\/@HOST_PORT@/im, host_port)
      wsUri = wsUri.replace(/wss:\/\/@HOST_PORT@/im, host_port)
    } else {
      wsUri = wsUri.replace(/@HOST_PORT@/im, host_port)
    }
  } else {
    if (host_port.indexOf('ws://') === 0 || host_port.indexOf('wss://') === 0) {
      wsUri = wsUri.replace(/@HOST_PORT@/im, host_port)
    } else {
      wsUri = 'ws://' + wsUri.replace(/@HOST_PORT@/im, host_port)
    }
  }
}

webs = new WebSocketImpl(wsUri)
webs.connect()
if (document.addEventListener) {
  window.onbeforeunload = function() {
    webs.close()
  }
  window.addEventListener(
    'unload',
    function() {
      webs.close()
    },
    false
  )
}
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
  ReactDOM.render(<Root {...e.detail} />, document.getElementById('root'))
}
// This will run when there's no data
ReactDOM.render(<Inactive />, document.getElementById('root'))

// :: Events
// https://github.com/RainbowMage/OverlayPlugin/wiki/JavaScript-API-reference
// https://github.com/hibiyasleep/OverlayPlugin/wiki/Additional-Javascript-API-Reference

// - onOverlayDataUpdate
// This event occurs when the OverlayPlugin sends the new data.
document.addEventListener('onOverlayDataUpdate', onOverlayDataUpdate(evt))

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
