import React from 'react'
import { replaceWithRandom } from './lib/helpers'
import Box from './styled/Box'
import Name from './styled/Name'
import Info from './styled/Info'
import InfoText from './styled/InfoText'
import DamageBar from './styled/DamageBar'

const importedData = {
  something: 200,
  other: 500
}

class Horizoverlay extends React.Component {
  state = {
    data: {}
  }
  componentDidMount() {
    document.addEventListener('onOverlayDataUpdate', evt => {
      this.setState({ data: evt.detail })
    })
    this.interval = setInterval(this.timer, 2000)
  }
  componentWillUnmount() {
    clearInterval(this.interval)
    document.removeEventListener('onOverlayDataUpdate', document)
  }
  timer = async () => {
    await this.setState({ data: replaceWithRandom(importedData) })
    const event = new CustomEvent('onOverlayDataUpdate', {
      detail: this.state.data
    })
    document.dispatchEvent(event)
  }
  render() {
    const { something, other } = this.state.data
    const damageTotal = something + other
    const damagePercent = num =>
      isNaN(num) ? 0 : Math.round((num * 100) / damageTotal)
    return (
      <div>
        <Box>
          <Name name="Something" rank={1} />
          <Info>
            <InfoText background="purple" text={something} label=" DPS" />
            <InfoText background="purple" text={something} label=" HPS" />
          </Info>
          <DamageBar width={damagePercent(something)} show={true} />
        </Box>
        <Box>
          <Name name="Other" rank={2} />
          <Info>
            <InfoText background="green" text={other} label=" DPS" />
            <InfoText background="green" text={other} label=" HPS" />
            <DamageBar width={damagePercent(other)} show={true} />
          </Info>
        </Box>
        <pre>{JSON.stringify(this.state.data)}</pre>
      </div>
    )
  }
}

export default Horizoverlay
