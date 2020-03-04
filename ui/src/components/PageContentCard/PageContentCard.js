import styled from 'styled-components'
import Card from '../Card/Card'

import mq from '../../theme/mediaQueries'

const PageContentCard = styled(Card)`
  width: auto;
  margin: ${(p) =>
    `0 -${p.theme.tokens.spacing05} ${p.theme.tokens.spacing09}`};

  ${mq.smUp`
    margin-left: 0;
    margin-right: 0;
  `}

  @media screen and (min-width: 768px) {
    margin-bottom: 40px;
    padding: ${(p) => `${p.theme.tokens.spacing07} 0 `};
  }
`

const Body = styled(Card.Body)`
  @media screen and (min-width: 768px) {
    padding: ${(p) => p.theme.tokens.spacing06};
  }
`

const Footer = styled(Card.Footer)`
  @media screen and (min-width: 768px) {
    padding: ${(p) => p.theme.tokens.spacing06};
  }
`

PageContentCard.Body = Body
PageContentCard.Footer = Footer

export default PageContentCard
