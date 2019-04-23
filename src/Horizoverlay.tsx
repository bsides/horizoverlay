import React from 'react'

const importedData = { something: 600, other: 200 }

const Horizoverlay: React.FC = props => {
  const [data, setData] = React.useState(importedData)

  React.useEffect(function getData() {
    document.addEventListener('onOverlayUpdate', (evt: Event) => {
      setData((evt as CustomEvent).detail)
    })
    return function cleanUp() {
      document.removeEventListener('onOverlayDataUpdate', document)
    }
  })

  return <div>Something</div>
}

export default Horizoverlay
