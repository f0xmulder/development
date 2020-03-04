import styled from 'styled-components'

import mq from '../../theme/mediaQueries'
import availableIcon from './icons/available.svg'
import unavailableIcon from './icons/unavailable.svg'

export const Description = styled.p`
  margin: ${(p) => p.theme.tokens.spacing06} 0 0;

  ${mq.smUp`
    margin-bottom: ${(p) => p.theme.tokens.spacing07};
  `}
`

export const StyledScoresUl = styled.ul`
  list-style-position: inside;
  padding-left: 0;
  list-style-type: none;
`

export const StyledScoresLi = styled.li`
  padding-left: 30px;
  position: relative;

  &:before {
    content: '';
    width: 18px;
    height: 24px;
    left: 0;
    position: absolute;
    ${(p) =>
      p.available
        ? `background-image: url(${availableIcon});`
        : `background-image: url(${unavailableIcon});`}
    background-size: 18px;
    background-position: left center;
    background-repeat: no-repeat;
  }
`
