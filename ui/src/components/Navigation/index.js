import React from 'react'
import {Link} from 'react-router-dom'

import './index.css'

const Navigation = () =>
    <nav className="Navigation">
        <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/overzicht">Overzicht</Link></li>
            <li><Link to="/api-toevoegen">API toevoegen</Link></li>
            <li><Link to="/over">Over</Link></li>
        </ul>
    </nav>

export default Navigation
