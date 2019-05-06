import React from 'react'
import { Link } from 'react-router-dom'
import {StyledAbout, StyledPageTitle, StyledCard} from './index.styles'
import PageContentCard from '../../components/PageContentCard'

const About = () =>
    <StyledAbout>
      <StyledPageTitle>Over</StyledPageTitle>

      <PageContentCard>
        <p>
          Developer.overheid.nl geeft een overzicht van alle API's gerelateerd aan de Nederlandse overheid.
          API's kunnen makkelijk worden toegevoegd door een <Link to="/api-toevoegen/formulier">formuler</Link> in te vullen of een <Link to="/api-toevoegen">Merge Request</Link> aan te maken.
        </p>

        <p>
          Voor vragen, neem contact op via <a href="mailto:developer@overheid.nl">developer@overheid.nl</a>.
          De broncode van deze website is te vinden op <a href="https://gitlab.com/commonground/developer.overheid.nl">GitLab</a>.
        </p>
      </PageContentCard>
    </StyledAbout>

export default About
