// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import React from 'react'
import { Link } from 'react-router-dom'

import { Button } from '@commonground/design-system'
import { H1, H2 } from '../../components/Headings/Headings'
import {
  StyledHomePage,
  StyledHeading,
  StyledCard,
  StyledExternalIcon,
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
        <Button variant="primary" as={Link} to="/apis">
          API overzicht <StyledExternalIcon />
        </Button>
      </StyledCard.Body>
    </StyledCard>
  </StyledHomePage>
)

export default Home
