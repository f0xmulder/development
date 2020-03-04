import React from 'react'
import { object, func, oneOfType, node, element } from 'prop-types'
import { StyledSearch, StyledInput, StyledSearchIcon } from './index.styles'
import { ThemeProvider } from 'styled-components/macro'
import theme from '../../../theme'

const Search = ({ inputProps, onQueryChanged, children, ...props }) => (
  <ThemeProvider theme={theme}>
    <StyledSearch {...props}>
      <StyledInput
        onChange={(event) => onQueryChanged(event.target.value)}
        {...inputProps}
      />
      <StyledSearchIcon />
      {children}
    </StyledSearch>
  </ThemeProvider>
)

Search.propTypes = {
  onQueryChanged: func,
  inputProps: object,
  children: oneOfType([node, element]),
}

Search.defaultProps = {
  onQueryChanged: () => {},
  inputProps: {
    placeholder: 'Zoeken…',
  },
}

export default Search
