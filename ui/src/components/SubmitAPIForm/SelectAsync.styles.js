// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import styled, { css } from 'styled-components'
import { AsyncPaginate as ReactSelectAsync } from 'react-select-async-paginate'
import { Link } from 'react-router-dom'

export const StyledReactSelectAsync = styled(ReactSelectAsync)`
  margin-top: ${(p) => p.theme.tokens.spacing01};

  .ReactSelect__control {
    width: 100%;
    border-radius: 0;
    background-color: ${(p) => p.theme.colorBackgroundSelect};
    padding: ${(p) => p.theme.tokens.spacing02};
    border-color: ${(p) => p.theme.colorBorderSelect};
    color: ${(p) => p.theme.colorText};

    &:hover {
      border-color: ${(p) => p.theme.colorBorderSelect};
    }

    &--menu-is-open,
    &--menu-is-open:hover,
    &--is-focused,
    &--is-focused:hover {
      border-color: black;
      box-shadow: 0 0 0 1px ${(p) => p.theme.colorBorderSelectFocus};
    }

    &--is-disabled,
    &--is-disabled:hover {
      background-color: ${(p) => p.theme.colorBackgroundSelectDisabled};
      pointer-events: all;
      cursor: not-allowed;
      border-color: ${(p) => p.theme.colorBorderSelectDisabled};
      box-shadow: none;
    }
  }

  .ReactSelect__value-container {
    padding-top: ${(p) => p.theme.tokens.spacing02};
    padding-bottom: ${(p) => p.theme.tokens.spacing02};
  }

  .ReactSelect__single-value {
    color: ${(p) => p.theme.colorText};
  }

  .ReactSelect__menu {
    background-color: ${(p) => p.theme.colorBackgroundSelect};
    border-radius: 0;
  }

  .ReactSelect__option {
    &--is-focused {
      background-color: ${(p) => p.theme.colorBackgroundSelectOptionHover};
    }

    &--is-selected {
      color: ${(p) => p.theme.colorText};
      background-color: ${(p) => p.theme.colorBackgroundSelectOptionSelect};
    }
  }

  .ReactSelect__indicator-separator {
    background-color: ${(p) => p.theme.colorBackgroundSelectSeparator};
  }

  &.invalid {
    .ReactSelect__control {
      border-color: ${(p) => p.theme.colorBorderSelectError};
      box-shadow: 0 0 0 1px ${(p) => p.theme.colorBorderSelectError};
    }
  }

  .ReactSelect__placeholder {
    color: ${(p) => p.theme.colorTextSelectPlaceholder};
  }

  ${(p) => {
    let width
    switch (p.size) {
      case 'xs':
        width = '5rem'
        break

      case 's':
        width = '10rem'
        break

      case 'm':
        width = '20rem'
        break

      case 'l':
        width = '30rem'
        break

      case 'xl':
        width = '46rem'
        break

      default:
        console.warn(
          `invalid size '${p.size}' provided. the supported values are xs, s, m, l and xl`,
        )
    }

    return css`
      width: ${width};
    `
  }}
`
export const StyledMessage = styled.span`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
`

export const StyledLink = styled(Link)`
  color: #f02b41;
`
