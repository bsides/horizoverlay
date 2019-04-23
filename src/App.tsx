import React from 'react'
import GlobalStyle from './lib/GlobalStyle'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Horizoverlay from './Horizoverlay'

const App: React.FC = () => {
  return (
    <>
      <GlobalStyle />
      {/* <Router>
        <Route path="/" exact component={Horizoverlay} />
      </Router> */}
      <Horizoverlay />
    </>
  )
}

export default App
