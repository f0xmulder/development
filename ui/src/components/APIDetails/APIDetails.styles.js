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

export const IconList = styled.ul`
  list-style-position: inside;
  padding-left: 0;
  list-style-type: none;
`

IconList.ListItem = styled.li`
  display: flex;
  align-items: flex-start;
  margin-top: ${(p) => p.theme.tokens.spacing03};
`

IconList.ListItem.Icon = styled.div`
  flex-shrink: 0;
  margin-right: ${(p) => p.theme.tokens.spacing03};
`

IconList.ListItem.Content = styled.div`
  padding-top: 3px;
`
