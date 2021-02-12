// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import React from 'react'
import { Link } from 'react-router-dom'

import { Button } from '@commonground/design-system'
import { H1, H2 } from '../../components/Headings/Headings'
import {
  Links,
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
    <Links>
      <StyledCard id="apis">
        <StyledCard.Header>
          <img
            src="https://i.imgur.com/D12nNYQ.jpg"
            alt="API’s binnen de Nederlandse overheid"
            aria-describedby="apis"
          />
        </StyledCard.Header>
        <StyledCard.Body>
          <h3>API’s binnen de Nederlandse overheid</h3>
          <p id="apis">
            Een wegwijzer naar de API’s die (semi-)overheidsorganisaties in
            Nederland aanbieden.
          </p>
          <Button variant="primary" as={Link} to="/apis">
            Bekijk API's <StyledExternalIcon />
          </Button>
        </StyledCard.Body>
      </StyledCard>

      <StyledCard id="forum">
        <StyledCard.Header>
          <img
            src="https://i.imgur.com/D12nNYQ.jpg"
            alt="Forum voor developers"
            aria-describedby="forum"
          />
        </StyledCard.Header>
        <StyledCard.Body>
          <h3>Forum voor developers</h3>
          <p id="forum">
            Omschrijving van het forum, zodat je weet wat het is. Netjes over
            twee regels natuurlijk.
          </p>
          <Button variant="primary" as={Link} to="/apis">
            Ga naar forum <StyledExternalIcon />
          </Button>
        </StyledCard.Body>
      </StyledCard>
    </Links>
  </StyledHomePage>
)

export default Home
