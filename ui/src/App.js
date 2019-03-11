import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

import Home from './pages/Home'
import SubmitAPI from './pages/SubmitAPI'
import About from './pages/About'
import APIDetail from './pages/APIDetail'
import Tag from './pages/Tag'
import TagListContainer from "./components/TagListContainer";

const App = () =>
    <div className="App">
        <Router>
            <div>
                <Route exact path="/" component={Home} />
                <Route path="/detail/:id" component={APIDetail} />
                <Route path="/submit-api" component={SubmitAPI} />
                <Route path="/about" component={About} />
                <Route path="/tag/:tag" component={Tag} />

                <div className="container">
                    <hr />

                    <h2>API's by tag</h2>
                    <TagListContainer />

                    <hr />

                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/submit-api">Submit your API</Link></li>
                        <li><Link to="/about">About</Link></li>
                    </ul>
                </div>
            </div>
        </Router>
    </div>

export default App
