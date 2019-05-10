import styled from 'styled-components'
import { Card } from '@commonground/design-system'

export const StyledAbout = styled.div`
  max-width: 600px;
  margin: 0 auto;
`

export const StyledPageTitle = styled.h1`
  color: #2D3240;
  font-size: 28px;
  font-weight: 800;
  text-align: center;
  margin-bottom: 32px;
`

export const StyledCard = styled(Card)`
  padding: 24px 24px;
  margin-bottom: 40px;

  @media screen and (min-width: 768px) {
    padding: 40px 56px;
    margin-bottom: 80px;
  }

  a {
    color: #2961FF;
    text-decoration: none;
  }

  abbr {
    text-decoration: none;
    border-bottom: 1px dotted #A3AABF;
  }
`

export const StyledH2 = styled.h2`
  
`
