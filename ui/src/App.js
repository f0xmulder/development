import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

import Home from './pages/Home'
import SubmitAPI from './pages/SubmitAPI'

import './App.css'

const App = () =>
    <div className="App">
        <Router>
            <div>
                <Route exact path="/" component={Home} />
                <Route path="/submit-api" component={SubmitAPI} />

                <hr />

                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/submit-api">Submit your API</Link></li>
                </ul>
            </div>
        </Router>
    </div>

export default App
