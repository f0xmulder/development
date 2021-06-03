// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import React from 'react'
import { Link } from 'react-router-dom'

import {
  FooterArea,
  FooterContainer,
  StyledText,
  FooterImageWrapper,
  StyledBZKLogo,
  StyledVNGLogo,
  StyledLink,
} from './Footer.styles'

const Footer = () => {
  return (
    <FooterArea>
      <FooterContainer>
        <StyledText>
          Een initiatief van
          <StyledLink variant="link" as={Link} to="/privacy">
            Privacyverklaring
          </StyledLink>
        </StyledText>
        <FooterImageWrapper>
          <StyledBZKLogo
            src="/logo_bzk.png"
            alt="Logo Ministerie van Binnenlandse Zaken en Koninkrijksrelaties"
          />
          <StyledVNGLogo src="/logo_vng.png" alt="Logo VNG Realisatie" />
        </FooterImageWrapper>
      </FooterContainer>
    </FooterArea>
  )
}

export default Footer
