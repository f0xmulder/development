// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import styled from 'styled-components'

import Card from '../Card/Card'

export const StyledCard = styled(Card)`
  margin-top: 1rem;
`

export const StyledCardBody = styled(Card.Body)`
  padding: 0;
`

export const StyledList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`

export const StyledListItem = styled.li`
  &:not(:first-child) {
    border-top: 1px solid ${(p) => p.theme.tokens.colorPaletteGray100};
  }
`
