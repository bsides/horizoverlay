import React from 'react'
import ReactDOM from 'react-dom'
import console = require('console')

const ConfigWindow: React.FC = props => {
  const containerEl = document.createElement('div')
  let containerElRef = React.useRef(containerEl)
  let externalWindow as window.open = null
  React.useEffect(() => {
    externalWindow = window.open(
      '',
      '',
      `width=600,height=400,left=200,top=200`
    )
    if (externalWindow !== null) {
      externalWindow.document.body.appendChild(containerElRef.current)
      externalWindow.addEventListener('beforeunload', () => {
        props.closeConfigWindow()
      })
      console.log('Created')
    }

    return function cleanUp() {
      console.log('Cleaning up')
      if (externalWindow !== null) {
        externalWindow.close()
        externalWindow = null
      }
    }
  })

  return ReactDOM.createPortal(props.children, containerElRef.current)
}

export default ConfigWindow
