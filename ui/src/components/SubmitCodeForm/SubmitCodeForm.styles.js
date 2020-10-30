// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import { Fieldset, Alert } from '@commonground/design-system'
import styled from 'styled-components'
import mq from '../../theme/mediaQueries'
import theme from '../../theme'

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

export const StyledAlert = styled(Alert)`
  margin-bottom: ${(p) => p.theme.tokens.spacing06};
`

export const ReactSelectStyle = {
  control: (styles, state) => ({
    ...styles,
    borderRadius: '0px',
    borderWidth: state.isFocused ? '2px' : '1px',
    borderColor: state.isFocused
      ? theme.colorBackgroundChoiceSelected
      : theme.tokens.colorPaletteGray500,
    minHeight: '50px',
    boxShadow: 'none',
    '&:hover': {
      boxShadow: 'none',
    },
  }),
}

export const Label = styled.label`
  color: ${(p) => p.theme.tokens.colorPaletteGray800};
`

export const Spacing = styled.div`
  margin-top: ${(p) => p.theme.tokens.spacing06} !important;
`
