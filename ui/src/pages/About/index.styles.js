import styled from 'styled-components'
import { Card } from '@commonground/design-system'

export const StyledAbout = styled.div`
  max-width: 600px;
  margin: 0 auto;
`

export const StyledPageTitle = styled.h1`
  color: ${p => p.theme.color.text.normal};
  font-size: ${p => p.theme.font.size.title.normal};
  line-height: ${p => p.theme.font.lineHeight.title.normal};
  font-weight: ${p => p.theme.font.weight.bold};
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
