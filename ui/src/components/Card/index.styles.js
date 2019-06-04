import styled from 'styled-components'
import { Card } from '@commonground/design-system'

export const StyledCard = styled(Card)``

export const Body = styled.div`
  padding: 12px 10px;

  @media screen and (min-width: 768px) {
    padding: 20px 40px;
  }
`
export const Footer = styled.div`
  border-top: 1px solid #f0f2f7;
  padding: 12px 10px;

  @media screen and (min-width: 768px) {
    padding: 20px 40px;
  }
`

export const Title = styled.p`
  font-size: 18px;
  font-weight: 600;
`
