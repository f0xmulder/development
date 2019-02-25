import React from 'react';
import './App.css';
import Home from './pages/Home';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

const App = () =>
    <div className="App">
        <Router>
            <div>
                <Route exact path="/" component={Home} />

                <hr />

                <ul>
                    <li><Link to="/">Home</Link></li>
                </ul>
            </div>
        </Router>
    </div>

export default App
