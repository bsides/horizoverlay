import React from 'react'
import { withHelper } from './helpers'
import { RgbStringColorPicker } from 'react-colorful'
import 'react-colorful/dist/index'

import './css/config.css'

const ColorPickerRaw = (props) => {
  let state = { ...props }
  const role = state.match.params.role;
  let roleColor = props.config['color' + role];
  const [color, setColor] = React.useState(roleColor);

  window.addEventListener('beforeunload', (event) => {
    props.config['color' + role] = color;
    localStorage.setItem('horizoverlay', JSON.stringify(props.config))
  });

  return (
    <div style={{padding: 20}}>
      <RgbStringColorPicker color={ color } onChange={ setColor } />
      <hr></hr>
      <div style={{color: 'black'}}>Config color: { props.config['color' + role] }</div>
      <div style={{color: 'black'}}>WIP color: { color }</div>
    </div>
  )
}

const ColorPicker = withHelper({ WrappedComponent: ColorPickerRaw, isColorPicker: true })
export default ColorPicker
