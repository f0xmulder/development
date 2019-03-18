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
                <div className="App__TopBar">
                    <Link to="/" className="title">developer.overheid.nl</Link>
                    <Navigation />
                </div>

                <Route exact path="/" component={Home} />
                <Route path="/detail/:id" component={APIDetail} />
                <Route path="/overview" component={Overview} />
                <Route exact path="/submit-api" component={SubmitAPI} />
                <Route path="/submit-api/form" component={SubmitAPIForm} />
                <Route path="/about" component={About} />
                <Route path="/tag/:tag" component={Tag} />
            </div>
        </Router>
    </div>

export default App
