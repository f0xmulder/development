import React from 'react'
import {Link} from 'react-router-dom'

import './index.css'

const Navigation = () =>
    <ul className="Navigation">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/overzicht">Overzicht</Link></li>
        <li><Link to="/api-toevoegen">API toevoegen</Link></li>
        <li><Link to="/over">Over</Link></li>
    </ul>

export default Navigation
