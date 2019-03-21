import React from 'react'
import { Link } from 'react-router-dom'

const About = () =>
    <div className="About container">
        <h1>Over</h1>
        <p>
          Developer.overheid.nl geeft een overzicht van alle API's gerelateerd aan de Nederlandse overheid.
          API's kunnen makkelijk worden toegevoegd door <Link to="/api-toevoegen">een Merge Request</Link> aan te maken.
        </p>

        <p>
          Voor vragen, neem contact op via <a href="mailto:developer@overheid.nl">developer@overheid.nl</a>.
          De broncode van deze website is te vinden op <a href="https://gitlab.com/commonground/developer.overheid.nl">GitLab</a>.
        </p>
    </div>

export default About
