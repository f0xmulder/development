import styled from 'styled-components'
import { Card } from '@commonground/design-system'

export default styled(Card)`
  padding: 24px 20px;
  margin-bottom: 40px;

  @media screen and (min-width: 768px) {
    padding: 40px 80px;
    margin-bottom: 80px;
  }

  a {
    color: ${p => p.theme.color.primary.main};
    text-decoration: none;
  }
`
