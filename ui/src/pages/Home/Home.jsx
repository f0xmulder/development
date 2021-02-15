// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import React from 'react'
import { Link } from 'react-router-dom'

import { Button } from '@commonground/design-system'
import { H1, H2 } from '../../components/Headings/Headings'
import svgApi from '../../components/SVG/Spot-API.svg'
import svgForum from '../../components/SVG/Spot-Forum.svg'
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
      <StyledCard>
        <StyledCard.Header>
          <img
            src={svgApi}
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

      <StyledCard>
        <StyledCard.Header>
          <img
            src={svgForum}
            alt="Forum voor developers"
            aria-describedby="forum"
          />
        </StyledCard.Header>
        <StyledCard.Body>
          <h3>Forum voor developers</h3>
          <p id="forum">
            De centrale plek om in gesprek te gaan over digitale
            overheidsdiensten
          </p>
          <Button
            variant="primary"
            as="a"
            href="https://forum.developer.overheid.nl/"
          >
            Ga naar forum <StyledExternalIcon />
          </Button>
        </StyledCard.Body>
      </StyledCard>
    </Links>
  </StyledHomePage>
)

export default Home
