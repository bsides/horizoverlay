import React from 'react'
import styled from 'styled-components'

const NameStyled = styled.div`
  background: transparent;
  color: black;
  text-align: center;
`

const Name = props => {
  let { name, rank } = props
  rank += '. '
  return (
    <NameStyled>
      <span>{rank}</span>
      <span>{name}</span>
    </NameStyled>
  )
}

export default Name
