import React from 'react'

const DamageBar = ({ width, show }) => {
  if (!show) return null
  return (
    <div>
      <div className="damage-percent-bg">
        <div className="damage-percent-fg" style={{ width }} />
      </div>
      <div className="damage-percent">{width}</div>
    </div>
  )
}

export default DamageBar
