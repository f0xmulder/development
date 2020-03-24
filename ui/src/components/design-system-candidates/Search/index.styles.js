import React from 'react'
import styled from 'styled-components'

export const StyledSearch = styled.div`
  position: relative;
`

const SearchIcon = ({ ...props }) => (
  <svg viewBox="0 0 12 12" {...props}>
    <path
      d="M8.576 7.547h-.542l-.192-.185A4.44 4.44 0 0 0 8.92 4.46a4.46 4.46 0 1 0-4.46 4.46 4.44 4.44 0 0 0 2.903-1.078l.185.192v.542L10.977 12 12 10.978l-3.424-3.43zm-4.116 0A3.083 3.083 0 0 1 1.372 4.46 3.083 3.083 0 0 1 4.46 1.372 3.083 3.083 0 0 1 7.547 4.46 3.083 3.083 0 0 1 4.46 7.547z"
      fill="#757575"
      fillRule="nonzero"
    />
  </svg>
)

export const StyledSearchIcon = styled(SearchIcon)`
  position: absolute;
  width: ${(p) => p.theme.tokens.spacing05};
  height: ${(p) => p.theme.tokens.spacing05};
  left: ${(p) => p.theme.tokens.spacing05};
  top: calc(50% - ${(p) => p.theme.tokens.spacing03});
`

export const StyledInput = styled.input`
  width: 100%;
  font-size: ${(p) => p.theme.tokens.fontSizeMedium};
  font-family: 'Source Sans Pro', sans-serif;
  padding-left: ${(p) => p.theme.tokens.spacing08};
  padding-top: ${(p) => p.theme.tokens.spacing04};
  padding-bottom: ${(p) => p.theme.tokens.spacing04};
  padding-right: ${(p) => p.theme.tokens.spacing04};
  color: ${(p) => p.theme.colorText};
  border: 1px solid ${(p) => p.theme.tokens.colorPaletteGray500};
  outline: none;
  line-height: ${(p) => p.theme.tokens.lineHeightText};

  &:focus {
    padding-left: calc(${(p) => p.theme.tokens.spacing08} - 1px);
    padding-top: calc(${(p) => p.theme.tokens.spacing04} - 1px);
    padding-bottom: calc(${(p) => p.theme.tokens.spacing04} - 1px);
    padding-right: calc(${(p) => p.theme.tokens.spacing04} - 1px);
    border: 2px solid ${(p) => p.theme.tokens.colorPaletteBlue700};
  }

  &:placeholder {
    color: ${(p) => p.theme.tokens.colorPaletteGray600};
  }
`
