// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import styled from 'styled-components'

import mq from '../../theme/mediaQueries'

export const StyledList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`

export const StyledListItem = styled.div`
  width: 49%;

  ${mq.smDown`
    width: 100%;
  `}
`
