// uncomment for testing
import './testing'

import React from 'react'
import ReactDOM from 'react-dom'
import './reboot.css'
import './index.css'
import Overlay from './Overlay'

require(`./images/handle.png`)

function onOverlayDataUpdate({ detail }) {
  ReactDOM.render(<Overlay {...detail} />, document.getElementById('root'))
}
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
