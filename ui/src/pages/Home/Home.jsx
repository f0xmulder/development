import React from 'react'

import { H1, H2 } from '../../components/Headings/Headings'
import {
  StyledHomePage,
  StyledHeading,
  StyledCard,
  StyledIconButton,
} from './Home.styles'

const Home = () => (
  <StyledHomePage>
    <StyledHeading>
      <H1>
        Eén centrale plek voor de developer die voor of met de overheid
        ontwikkelt
      </H1>
      <p>
        Ben je een developer die iets voor of met de overheid ontwikkelt? Dan
        vind je hier handige bronnen en de community voor de ontwikkeling van
        jouw digitale services.
      </p>
    </StyledHeading>

    <H2>Direct naar</H2>

    <StyledCard>
      <StyledCard.Body>
        <h3>API’s binnen de Nederlandse overheid</h3>
        <p>
          Een wegwijzer naar de API’s die (semi-)overheidsorganisaties in
          Nederland aanbieden.
        </p>
        <StyledIconButton to="/apis">API overzicht</StyledIconButton>
      </StyledCard.Body>
    </StyledCard>
  </StyledHomePage>
)

export default Home
