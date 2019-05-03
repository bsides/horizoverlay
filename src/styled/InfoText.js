import React from 'react'
import styled from 'styled-components'

const InfoStyled = styled.div`
  background: ${props => props.background};
  color: black;
  text-align: center;
`

const InfoText = props => {
  let { background, text, label } = props
  return (
    <InfoStyled background={background}>
      <span>{text}</span>
      <span>{label}</span>
    </InfoStyled>
  )
}

export default InfoText
