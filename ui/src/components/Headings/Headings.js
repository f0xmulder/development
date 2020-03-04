import styled from 'styled-components'

import mq from '../../theme/mediaQueries'

export const H1 = styled.h1`
  margin: ${(p) => `${p.theme.tokens.spacing07} 0 ${p.theme.tokens.spacing05}`};
  line-height: ${(p) => p.theme.tokens.lineHeightHeading};
  font-size: ${(p) => p.theme.tokens.fontSizeXLarge};
  font-weight: ${(p) => p.theme.tokens.fontWeightBold};
  color: ${(p) => p.theme.tokens.colors.colorText};

  ${mq.smUp`
    font-size: ${(p) => p.theme.tokens.fontSizeXXLarge};
  `}
`

export const H2 = styled.h2`
  margin: ${(p) => p.theme.tokens.spacing05} 0;
  line-height: ${(p) => p.theme.tokens.lineHeightHeading};
  font-size: ${(p) => p.theme.tokens.fontSizeXLarge};
  font-weight: ${(p) => p.theme.tokens.fontWeightRegular};
  color: ${(p) => p.theme.tokens.colors.colorText};

  ${mq.smUp`
    margin: ${(p) =>
      `${p.theme.tokens.spacing05} 0 ${p.theme.tokens.spacing07}`};
  `}
`

export const H3 = styled.h3`
  font-size: ${(p) => p.theme.tokens.fontSizeMedium};
`
