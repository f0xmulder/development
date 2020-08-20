// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import styled from 'styled-components'
import { Button } from '@commonground/design-system'

import mq from '../../theme/mediaQueries'

export const StyledFilterButton = styled(Button)`
  width: 100%;
  justify-content: center;
  margin-bottom: ${(p) => (p.showFilters ? '0' : p.theme.tokens.spacing08)};

  ${mq.mdUp`
    display: none;
  `}

  & svg {
    width: 16px;
    height: 16px;
    margin-right: ${(p) => p.theme.tokens.spacing04};
  }
`

export const StyledAPIFilters = styled.div`
  display: ${(p) => (p.showFilters ? 'block' : 'none')};
  width: 215px;
  margin-bottom: ${(p) => p.theme.tokens.spacing09};
`
