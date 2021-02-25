// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import styled from 'styled-components'
import { Drawer } from '@commonground/design-system'
import { Container } from '../design-system-candidates/Grid'

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

// Quickfix the problem of other (relative/absolute) items overlapping the drawer,
// see https://gitlab.com/commonground/core/design-system/-/issues/33
export const StyledDrawer = styled(Drawer)`
  position: relative;
`

export const StyledContainer = styled(Container)`
  margin-bottom: ${(p) => p.theme.tokens.spacing05};
`
