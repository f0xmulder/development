// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import React, { Suspense, lazy } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { GlobalStyles as DSGlobalStyles } from '@commonground/design-system'

import theme from './theme'
import Home from './pages/Home/Home'
import SubmitAPI from './pages/SubmitAPI/SubmitAPI'
import SubmitCode from './pages/SubmitCode/SubmitCode'
import SubmitEvent from './pages/SubmitEvent/SubmitEvent'
import About from './pages/About/About'
import APIDetail from './pages/APIDetail/APIDetail'
import EventOverview from './pages/EventOverview/EventOverview'
import APIOverview from './pages/APIOverview/APIOverview'
import CodeOverview from './pages/CodeOverview/CodeOverview'
import Header from './components/Header/Header'
import Feedback from './components/Feedback/Feedback'
import Footer from './components/Footer/Footer'
import GlobalStyles from './components/GlobalStyles/GlobalStyles'

import { AppContainer, ContentWrap } from './App.styles'

const APISpecification = lazy(() =>
  import(
    /* webpackChunkName: "api-specification" */ './pages/APISpecification/APISpecification'
  ),
)

const App = () => (
  <ThemeProvider theme={theme}>
    <AppContainer className="App">
      <DSGlobalStyles />
      <GlobalStyles />

      <ContentWrap>
        <Router>
          <Header />
          <Suspense fallback={<div />}>
            <main role="main">
              <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/detail/:id" exact component={APIDetail} />
                <Route
                  path="/detail/:id/:environment/specification"
                  component={APISpecification}
                />
                <Route path="/apis" exact component={APIOverview} />
                <Route path="/apis/add" component={SubmitAPI} />
                <Route path="/apis/:id" component={APIDetail} />
                <Route path="/add-api" component={SubmitAPI} />
                <Route path="/events" exact component={EventOverview} />
                <Route path="/events/add" component={SubmitEvent} />
                <Route path="/code" exact component={CodeOverview} />
                <Route path="/code/add" component={SubmitCode} />
                <Route path="/about" component={About} />
              </Switch>
              <Feedback />
            </main>
          </Suspense>
        </Router>
      </ContentWrap>
      <Footer />
    </AppContainer>
  </ThemeProvider>
)

export default App
