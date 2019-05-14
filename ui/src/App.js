import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import MediaQuery from 'react-responsive'

import Home from './pages/Home'
import SubmitAPI from './pages/SubmitAPI'
import About from './pages/About'
import APIDetail from './pages/APIDetail'
import Overview from './pages/Overview'
import TopBarContainer from './components/TopBarContainer'
import MobileNavigation from './components/MobileNavigation'
import GlobalStyles from './components/GlobalStyles'

const LANDSCAPE_PHONES = 576

const App = () => (
  <div className="App">
    <Router>
      <GlobalStyles />
      <MediaQuery maxWidth={LANDSCAPE_PHONES - 1}>
        <MobileNavigation />
      </MediaQuery>
      <MediaQuery minWidth={LANDSCAPE_PHONES}>
        <TopBarContainer />
      </MediaQuery>

      <main role="main">
        <Route path="/" exact component={Home} />
        <Route path="/detail/:id" component={APIDetail} />
        <Route path="/overzicht" component={Overview} />
        <Route path="/api-toevoegen" component={SubmitAPI} />
        <Route path="/over" component={About} />
      </main>
    </Router>
  </div>
)

export default App
