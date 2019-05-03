import React from 'react'
import styled from 'styled-components'

const BoxStyled = styled.div`
  display: flex;
`

const Box = props => {
  return <BoxStyled>{props.children}</BoxStyled>
}

export default Box
