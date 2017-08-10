// uncomment for testing
import './testing'

import React from 'react'
import ReactDOM from 'react-dom'

import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Overlay from './Overlay'
import Config from './Config'
import NotFound from './NotFound'
import Nothing from './Nothing'

require(`./images/handle.png`)

document.addEventListener('onOverlayDataUpdate', onOverlayDataUpdate)
document.addEventListener('onOverlayStateUpdate', function(e) {
  if (!e.detail.isLocked) {
    document.documentElement.classList.add('resizable')
  } else {
    document.documentElement.classList.remove('resizable')
  }
})
window.addEventListener('message', function(e) {
  if (e.data.type === 'onOverlayDataUpdate') {
    onOverlayDataUpdate(e.data)
  }
})
window.addEventListener('storage', function() {
  window.location.reload()
})

const Inactive = detail => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/config/" component={Config} />
        <Route component={Nothing} />
      </Switch>
    </BrowserRouter>
  )
}

const Root = detail => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" render={() => <Overlay {...detail} />} />
        <Route exact path="/config/" component={Config} />
        <Route render={() => <NotFound text="Page Not Found!" />} />
      </Switch>
    </BrowserRouter>
  )
}

// This will run when data is ON
function onOverlayDataUpdate(e) {
  ReactDOM.render(<Root {...e.detail} />, document.getElementById('root'))
}
// This will run when there's no data
ReactDOM.render(<Inactive />, document.getElementById('root'))
