import React from 'react'
import { string } from 'prop-types'

// https://engineering.musefind.com/our-best-practices-for-writing-react-components-dec3eb5c3fc8
// Declare propTypes here, before the component (taking advantage of JS function hoisting)
// You want these to be as visible as possible
NotFound.propTypes = {
  text: string.isRequired
}

function NotFound({ text }) {
  return (
    <h1>
      {text}
    </h1>
  )
}

export default NotFound
