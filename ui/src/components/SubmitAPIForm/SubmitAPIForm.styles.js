// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import styled, { css } from 'styled-components'
import { AsyncPaginate as ReactSelectAsync } from 'react-select-async-paginate'
import { Field } from 'formik'

export const StyledFormGroupColumnContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  @media screen and (min-width: 688px) {
    margin: 0 -28px;
  }
`

export const StyledFormGroupColumn = styled.div`
  flex: 1 0 100%;
  padding: 0;

  @media screen and (min-width: 688px) {
    padding: 0 28px;
    flex: 1 1 50%;
  }
`

export const StyledFormGroup = styled.div`
  margin-bottom: 1rem;
`

export const StyledFormSetting = styled.div`
  display: flex;

  label {
    flex: 0 1 auto;
    order: 2;
    margin-bottom: 0;
    cursor: pointer;
    user-select: none;
  }
`

export const HelperMessage = styled.small`
  display: block;
  margin-bottom: ${(p) => p.theme.tokens.spacing02};
  font-size: ${(p) => p.theme.tokens.fontSizeSmall};
  line-height: ${(p) => p.theme.tokens.lineHeightHeading};
  color: ${(p) => p.theme.colorTextLabel};
`

export const SelectFieldLoading = styled.div`
  background-color: ${(p) => `1px solid ${p.theme.colorBackgroundInput}`};
  background: url(/static/media/arrow-down-solid-icon.cc2fbbbb.svg) right center
    no-repeat;
  border-radius: 0;
  border: ${(p) => `1px solid ${p.theme.colorBorderChoice}`};
  display: block;
  height: 48px;
  max-width: 45rem;
  outline: none;
  padding: ${(p) => p.theme.tokens.spacing04};
`
export const StyledField = styled(Field)`
  display: flex;
  padding: 0;
  width: 100%;
  border: none;
`

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
