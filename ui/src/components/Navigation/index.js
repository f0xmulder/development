import React from 'react'
import {Link} from 'react-router-dom'

import './index.css'

const Navigation = () =>
    <ul className="Navigation">
        <li><Link to="/" exact>Home</Link></li>
        <li><Link to="/overview">Overview</Link></li>
        <li><Link to="/submit-api">Submit your API</Link></li>
        <li><Link to="/about">About</Link></li>
    </ul>

export default Navigation
