// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import styled from 'styled-components'

import Card from '../Card/Card'
import APISummary from '../APISummary/APISummary'

export const APIListHeader = styled.header`
  display: flex;
  justify-content: space-between;
`

export const TotalAPIs = styled.span``

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
