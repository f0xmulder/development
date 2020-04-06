// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import React from 'react'

import {
  FooterArea,
  FooterContainer,
  StyledText,
  FooterImageWrapper,
  StyledBZKLogo,
  StyledVNGLogo,
} from './Footer.styles'

const Footer = () => {
  return (
    <FooterArea>
      <FooterContainer>
        <StyledText>Een initiatief van</StyledText>
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
