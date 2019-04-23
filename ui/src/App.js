import React from 'react'
import {BrowserRouter as Router, Link, Route} from 'react-router-dom'

import Home from './pages/Home'
import SubmitAPI from './pages/SubmitAPI'
import SubmitAPIForm from './pages/SubmitAPIForm'
import About from './pages/About'
import APIDetail from './pages/APIDetail'
import Overview from './pages/Overview'
import TopBar from './components/TopBar'

import Navigation from './components/Navigation'
import GlobalStyles from './components/GlobalStyles'

const App = () =>
    <div className="App full-height">
        <Router>
            <GlobalStyles />

            <div className="full-height">
                <TopBar />

                <main role="main">
                    <Route path="/" exact component={Home} />
                    <Route path="/detail/:id" component={APIDetail} />
                    <Route path="/overzicht" component={Overview} />
                    <Route exact path="/api-toevoegen" component={SubmitAPI} />
                    <Route path="/api-toevoegen/formulier" component={SubmitAPIForm} />
                    <Route path="/over" component={About} />
                </main>
            </div>
        </Router>
    </div>

export default App
