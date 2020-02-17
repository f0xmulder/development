import styled from 'styled-components'

import availableIcon from './icons/available.svg'
import unavailableIcon from './icons/unavailable.svg'

export const StyledDesignRulesUl = styled.ul`
  list-style-position: inside;
  padding-left: 0;
  list-style-type: none;
`

export const StyledDesignRulesLi = styled.li`
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

export const StyledDesignRulesTitle = styled.h4`
  margin: 20px 0 5px 0;
`

export const StyledLink = styled.a`
  color: ${(p) => p.theme.color.primary.normal};
  text-decoration: none;
`
