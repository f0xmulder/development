import styled from 'styled-components'
import { Link } from 'react-router-dom'

import mq from '../../theme/mediaQueries'

import Card from '../Card/Card'
import APISummary from '../APISummary/APISummary'
import addIcon from '../../components/Icons/add_icon_brand_primary.svg'

export const APIListHeader = styled.header`
  display: flex;
  justify-content: space-between;
`

export const TotalAPIs = styled.span``

export const StyledIconLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  white-space: nowrap;
  border: none;
  font-size: ${(p) => p.theme.tokens.fontSizeMedium};
  font-weight: ${(p) => p.theme.tokens.fontWeightRegular};
  text-transform: none;
  text-decoration: none;

  ${mq.mdUp`
    display: none;
  `}

  &:hover {
    filter: brightness(90%);
  }

  &:before {
    height: 16px;
    margin-right: ${(p) => p.theme.tokens.spacing03};
    content: url(${addIcon});
    fill: green;
  }
`

export const StyledCard = styled(Card)`
  margin-top: 1rem;
`

export const StyledList = styled.ul`
  margin: 0 -${(p) => p.theme.tokens.spacing06};
  padding: 0;
  list-style: none;
`

export const StyledListItem = styled.li`
  &:not(:first-child) {
    border-top: 1px solid ${(p) => p.theme.tokens.colorPaletteGray100};
  }

  &:first-child a {
    padding-top: 0;
  }
`

export const StyledAPISummary = styled(APISummary)`
  padding: ${(p) => p.theme.tokens.spacing06};
`

// @TODO -- required stil?

export const StyledPill = styled.span`
  padding: 4px 12px;
  float: right;
  border-radius: 25px;
  text-align: center;
  font-size: ${(p) => p.theme.tokens.fontSizeSmall};
  background-color: ${(p) => p.theme.colorBackgroundButtonSecondary};
`
