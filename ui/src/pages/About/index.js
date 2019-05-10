import React from 'react'
import {StyledCard, StyledAbout, StyledPageTitle, StyledH2} from './index.styles'

const About = () =>
    <StyledAbout>
      <StyledPageTitle>Over</StyledPageTitle>

      <StyledCard>
        <p>
            De website developer.overheid.nl is een wegwijzer naar de <abbr title="Application Programming Interfaces">API’s</abbr> die (semi-)overheidsorganisaties in Nederland aanbieden.
        </p>
        <p>
            Deze website is ‘permanent beta’, en zal worden aangepast naar de behoeften van gebruikers. Wensen en opmerkingen kunnen via een <a href="https://gitlab.com/commonground/developer.overheid.nl/issues" target="_blank" rel="noopener noreferrer">melding op Gitlab</a> doorgegeven worden.
        </p>
        <p>
            Deze website is een initiatief van het ministerie van Binnenlandse Zaken en Koninkrijksrelaties in samenwerking met de Vereniging van Nederlandse Gemeenten / VNG Realisatie.
        </p>

        <StyledH2>Verantwoordelijkheid</StyledH2>
        <p>
            De informatie die op deze site wordt aangeboden is afkomstig van andere overheidsorganisaties. Deze organisaties zijn zelf verantwoordelijk voor hun diensten en gegevens.
        </p>

        <StyledH2>Persoonsgegevens en cookies</StyledH2>
        <p>
            Deze website verzamelt geen persoonsgegevens, zet geen cookies en verzamelt geen persoonsgebonden analytische informatie.
        </p>

        <StyledH2>Toegankelijkheid</StyledH2>
        <p>
            Deze site is ontworpen om te voldoen aan de vereisten van WCAG 2.0 en de Nederlandse extensies daarop. Omdat aanmelden en omschrijven van de API’s een open systeem is, kunnen we niet garanderen dat de site altijd aan de redactionele vereisten voldoet. Verbeterpunten kunnen worden doorgegeven via <a href="https://gitlab.com/commonground/developer.overheid.nl/" target="_blank" rel="noopener noreferrer">Gitlab</a>.
        </p>

        <p>
          De broncode van deze website is te vinden op <a href="https://gitlab.com/commonground/developer.overheid.nl" target="_blank" rel="noopener noreferrer">GitLab</a>.
        </p>
      </StyledCard>
    </StyledAbout>

export default About
