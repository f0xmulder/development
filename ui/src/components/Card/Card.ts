import { StyledCard, Body, Footer, Title } from './Card.styles'

// Card is a "Compound Component", it needs to be typed as such
export type CardType = typeof StyledCard & {
  Body: typeof Body
  Footer: typeof Footer
  Title: typeof Title
}

const Card = StyledCard as CardType
Card.Body = Body
Card.Footer = Footer
Card.Title = Title

export default Card
