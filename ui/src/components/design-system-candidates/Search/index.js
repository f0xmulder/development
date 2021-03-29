// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import React from 'react'
import { object, func, oneOfType, node, element, bool } from 'prop-types'
import { ThemeProvider } from 'styled-components'
import theme from '../../../theme'
import {
  StyledSearch,
  StyledInput,
  StyledSearchIcon,
  StyledSpinner,
} from './index.styles'

const Search = ({
  inputProps,
  onQueryChanged,
  searching,
  children,
  ...props
}) => (
  <ThemeProvider theme={theme}>
    <StyledSearch {...props}>
      <StyledInput
        onChange={(event) => onQueryChanged(event.target.value)}
        {...inputProps}
      />
      <StyledSearchIcon />
      {children}
      {searching && <StyledSpinner />}
    </StyledSearch>
  </ThemeProvider>
)

Search.propTypes = {
  onQueryChanged: func,
  inputProps: object,
  children: oneOfType([node, element]),
  searching: bool,
}

Search.defaultProps = {
  onQueryChanged: () => {},
  inputProps: {
    placeholder: 'Zoeken…',
  },
  searching: false,
}

export default Search
