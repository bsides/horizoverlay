import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import Overlay from './Overlay'
// import { ActXiv } from './testing'

// uncomment for testing
// import './testing'
// document.addEventListener('onOverlayDataUpdate', function(e) {
//   var start = new Date().getTime()
//   var details = e.detail

//   ReactDOM.render(<Overlay {...e.detail} />, document.getElementById('root'))
// })

// comment for testing
function onOverlayDataUpdate(e) {
  ReactDOM.render(<Overlay {...e.detail} />, document.getElementById('root'))
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
