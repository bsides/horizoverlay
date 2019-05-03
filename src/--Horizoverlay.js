import React from 'react'
import { replaceWithRandom } from './lib/helpers'
import ConfigWindow from './ConfigWindow'

const importedData = { something: 200, other: 600 }

const Horizoverlay = props => {
  const [data, setData] = React.useState(importedData)
  const [isPopupWindowOpen, setIsPopupWindowOpen] = React.useState(false)
  const togglePopupWindow = () => setIsPopupWindowOpen(!isPopupWindowOpen)
  const closePopupWindow = () => setIsPopupWindowOpen(false)

  // Change data values once data changes
  React.useEffect(() => {
    let interval = setInterval(() => {
      setData(replaceWithRandom(data))
      const event = new CustomEvent('onOverlayDataUpdate', { detail: data })
      document.dispatchEvent(event)
    }, 5000)
    return function clear() {
      clearInterval(interval)
    }
  }, [data])

  // Get the data when the data changes from its event
  React.useEffect(
    function getData() {
      document.addEventListener('onOverlayDataUpdate', evt => {
        setData(evt.detail)
      })

      return function cleanUp() {
        document.removeEventListener('onOverlayDataUpdate', document)
      }
    },
    [data]
  )

  React.useEffect(() => {
    window.addEventListener('beforeunload', () => {
      closePopupWindow()
    })
  })

  console.log(data)

  return (
    <div>
      <button type="buton" onClick={togglePopupWindow}>
        Toggle Window
      </button>
      {isPopupWindowOpen && (
        <ConfigWindow closePopupWindow={closePopupWindow}>
          <div>What is going on here?</div>
          <div>I should be here always!</div>
        </ConfigWindow>
      )}
      {/* <button onClick={openPortal}>Open Portal</button>
      {isOpen && (
        <Portal>
          <p>
            This is more advanced Portal. It handles its own state.{' '}
            <button onClick={closePortal}>Close me!</button>, hit ESC or click
            outside of me.
          </p>
        </Portal>
      )} */}
    </div>
  )
}

export default Horizoverlay
