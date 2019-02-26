import React from 'react'
import { Link } from 'react-router-dom'

const About = () =>
    <div className="About">
        <h1>About</h1>
        <p>
          Developer.overheid.nl provides an overview of all API's that are available within the Dutch government.
          API's can be added easily by <Link to="/submit-api">submitting a pull request</Link>.
        </p>

        <p>
          If you have any questions please contact us at <a href="mailto:developer@overheid.nl">developer@overheid.nl</a>.
          If you would like to contribute to this portal check out the repository on <a href="https://gitlab.com/commonground/developer.overheid.nl">GitLab</a>.
        </p>
    </div>

export default About
