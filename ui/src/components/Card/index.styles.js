import styled from 'styled-components'
import { Card } from '@commonground/design-system'

export const StyledCard = styled(Card)`
  a {
    color: ${(p) => p.theme.color.primary.normal};
    text-decoration: none;
  }
`

export const Body = styled.div`
  padding: 24px 21px;

  @media screen and (min-width: 768px) {
    padding: 24px;
  }
`

export const Footer = styled(Body)`
  border-top: 1px solid #f0f2f7;
`

export const Title = styled.p`
  font-size: 18px;
  font-weight: 600;
`
