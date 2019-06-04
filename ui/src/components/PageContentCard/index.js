import styled from 'styled-components'
import Card from '../Card'

export default styled(Card)`
  margin-bottom: 40px;

  @media screen and (min-width: 768px) {
    margin-bottom: 80px;
  }

  a {
    color: ${(p) => p.theme.color.primary.normal};
    text-decoration: none;
  }
`
