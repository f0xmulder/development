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

export const HelperMessage = styled.small`
  display: block;
  margin-bottom: ${(p) => p.theme.tokens.spacing02};
  font-size: ${(p) => p.theme.tokens.fontSizeSmall};
  line-height: ${(p) => p.theme.tokens.lineHeightHeading};
  color: ${(p) => p.theme.colorTextLabel};
`
export const Spacing = styled.div`
  margin-top: ${(p) => p.theme.tokens.spacing06} !important;
`
