import React from 'react'
import {Link} from 'react-router-dom'

import './index.css'

const Navigation = () =>
    <ul className="Navigation">
        <li><Link to="/search">Search</Link></li>
        <li><Link to="/submit-api">Submit your API</Link></li>
        <li><Link to="/about">About</Link></li>
    </ul>

export default Navigation
