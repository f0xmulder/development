// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import { Fieldset } from '@commonground/design-system'
import styled from 'styled-components'
import mq from '../../theme/mediaQueries'

export const StyledFieldset = styled(Fieldset)`
  input {
    ${mq.xs`
      width: 100%;
    `}
  }
`
