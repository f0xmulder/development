// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import styled from 'styled-components'

import mq from '../../theme/mediaQueries'

export const Description = styled.p`
  margin: ${(p) => p.theme.tokens.spacing06} 0 0;

  ${mq.smUp`
    margin-bottom: ${(p) => p.theme.tokens.spacing07};
  `}
`

export const CustomList = styled.ul`
  list-style-position: inside;
  padding-left: 0;
  list-style-type: none;
`

export const CustomListItem = styled.li`
  display: flex;
  align-items: flex-start;
  margin-top: ${(p) => p.theme.tokens.spacing03};
`

export const CustomListIcon = styled.div`
  flex-shrink: 0;
  margin-right: ${(p) => p.theme.tokens.spacing03};
`

export const CustomListContent = styled.div`
  padding-top: 3px;
`
