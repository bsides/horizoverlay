import React from 'react'
import ReactDOM from 'react-dom'

const containerEl = document.createElement('div')

const ConfigWindow = props => {
  let externalWindow = React.useRef(containerEl)

  React.useEffect(
    () => {
      externalWindow.current = window.open(
        '',
        '',
        `width=600,height=400,left=200,top=200`
      )

      externalWindow.current.document.body.appendChild(containerEl)
      externalWindow.current.addEventListener('beforeunload', () => {
        props.closePopupWindow()
      })
      console.log('Created Popup Window')
      return function cleanup() {
        console.log('Cleaned up Popup Window')
        externalWindow.current.close()
        externalWindow.current = null
      }
    },
    // Only re-renders this component if the variable changes
    [props]
  )
  return ReactDOM.createPortal(props.children, containerEl)
}

export default ConfigWindow
