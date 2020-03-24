import styled from 'styled-components'

import mq from '../../theme/mediaQueries'
import PageContentCard from '../../components/PageContentCard/PageContentCard'

export const StyledPageTitle = styled.h1`
  color: ${(p) => p.theme.colorText};
  font-size: ${(p) => p.theme.tokens.fontSizeXXLarge};
  line-height: ${(p) => p.theme.tokens.lineHeightHeading};
  font-weight: ${(p) => p.theme.tokens.fontWeightBold};
`

export const StyledPageContentCard = styled(PageContentCard)`
  margin-top: ${(p) => p.theme.tokens.spacing07};

  /* ${mq.smUp`
    margin-top: ${(p) => p.theme.tokens.spacing07};
  `} */

  abbr {
    text-decoration: none;
    border-bottom: 1px dotted #a3aabf;
  }
`
