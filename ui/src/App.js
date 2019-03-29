import React from 'react'
import {BrowserRouter as Router, Link, Route} from 'react-router-dom'

import Home from './pages/Home'
import SubmitAPI from './pages/SubmitAPI'
import SubmitAPIForm from './pages/SubmitAPIForm'
import About from './pages/About'
import APIDetail from './pages/APIDetail'
import Tag from './pages/Tag'
import Overview from './pages/Overview'

import Navigation from './components/Navigation'

import './App.css'

const App = () =>
    <div className="App full-height">
        <Router>
            <div className="full-height">
                <header className="App__TopBar">
                    <h1 className="title"><Link to="/">developer.overheid.nl</Link></h1>
                    <Navigation />
                </header>

                <main role="main">
                    <Route path="/" exact component={Home} />
                    <Route path="/detail/:id" component={APIDetail} />
                    <Route path="/overzicht" component={Overview} />
                    <Route path="/api-toevoegen" exact={true} component={SubmitAPI} />
                    <Route path="/api-toevoegen/formulier" component={SubmitAPIForm} />
                    <Route path="/over" component={About} />
                    <Route path="/tag/:tag" component={Tag} />
                </main>
            </div>
        </Router>
    </div>

export default App
