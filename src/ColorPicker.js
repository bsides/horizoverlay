import React from 'react'
import { withHelper } from './helpers'
import { RgbStringColorPicker } from 'react-colorful'
import 'react-colorful/dist/index'

import './css/config.css'

const ColorPickerRaw = (props) => {
  let state = { ...props }
  const role = state.match.params.role;
  let roleColor = props.config['color' + role];

  // This is needed for react-colorful's binding to work
  const [color, setColor] = React.useState(roleColor);

  window.addEventListener('beforeunload', (event) => {
    props.config['color' + role] = color;
    localStorage.setItem('horizoverlay', JSON.stringify(props.config))
  });

  return (
    <div>
      <h1 style={{color: 'black', marginLeft: 20}}>{role} Color</h1>
      <hr></hr>
      <RgbStringColorPicker style={{marginLeft: 20}} color={ color } onChange={ setColor } />
      <hr></hr>
    </div>
  )
}

const ColorPicker = withHelper({ WrappedComponent: ColorPickerRaw, isColorPicker: true })
export default ColorPicker
