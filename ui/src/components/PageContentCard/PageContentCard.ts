import styled from 'styled-components'
import Card, { CardType } from '../Card/Card'

const PageContentCard = styled(Card)`
  margin-bottom: 20px;

  @media screen and (min-width: 768px) {
    margin-bottom: 40px;
  }
` as CardType

const Body = styled(Card.Body)`
  @media screen and (min-width: 768px) {
    padding: 40px;
  }
`

const Footer = styled(Card.Footer)`
  @media screen and (min-width: 768px) {
    padding: 40px;
  }
`

PageContentCard.Body = Body
PageContentCard.Footer = Footer

export default PageContentCard
export type PageContentCardType = CardType
