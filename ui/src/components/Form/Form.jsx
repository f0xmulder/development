// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import styled from 'styled-components'
import { Field as FormikField } from 'formik'
import mq from '../../theme/mediaQueries'
import ExtendedFormikField from '../design-system-candidates/Field'

import checkboxIcon from '../Icons/checkbox-icon.svg'
import arrowDownSolidIcon from '../Icons/arrow-down-solid-icon.svg'

export const Fieldset = styled.fieldset`
  border: none;
  padding: 0;
  margin: 0 0 40px 0;
`

export const Legend = styled.legend`
  font-size: ${(p) => p.theme.tokens.fontSizeXLarge};
  line-height: ${(p) => p.theme.tokens.lineHeightHeading};
  font-weight: ${(p) => p.theme.tokens.fontWeightRegular};
  color: ${(p) => p.theme.colorText};
  margin-bottom: ${(p) => p.theme.tokens.spacing06};
  padding: 0;
`

export const Label = styled.label`
  display: block;
  margin-bottom: ${(p) => p.theme.tokens.spacing02};
  color: ${(p) => p.theme.colorTextInputLabel};
  font-weight: ${(p) => p.theme.tokens.fontWeightRegular};
`

export const Field = styled(ExtendedFormikField)`
  height: 48px;
  border-radius: 0;
  background-color: ${(p) => p.theme.tokens.colorBackground};

  ${mq.xs`
    max-width: 100%;
  `}
`

export const SelectField = styled(ExtendedFormikField).attrs({
  // Axe can't analyse the contrast of elements with background images
  className: 'axe-ignore',
})`
  -webkit-appearance: none;
  appearance: none;
  height: 48px;
  border-radius: 0;
  background: url(${arrowDownSolidIcon}) right center no-repeat;
  background-color: ${(p) => p.theme.tokens.colorBackground};

  ${mq.xs`
    max-width: 100%;
  `}
`

export const CheckboxField = styled(FormikField)`
  -webkit-appearance: none;
  appearance: none;
  min-width: 18px;
  height: 18px;
  margin-right: ${(p) => p.theme.tokens.spacing05};
  padding: 0;
  position: relative;
  border: 1px solid ${(p) => p.theme.colorBorderInput};
  background: #ffffff;
  border-radius: 2px;

  &:focus {
    padding: 0;
  }

  &:checked {
    background: ${(p) => p.theme.tokens.colorBrand3};
    border: 0 none;

    &::after {
      content: '';
      background: url(${checkboxIcon}) no-repeat;
      background-position: center;
      position: absolute;
      width: 18px;
      height: 18px;
    }
  }
`

export const RadioOptionGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: fit-content;
  border: 1px solid ${(p) => p.theme.tokens.colorPaletteGray400};

  ${mq.xs`
    width: 100%;
  `}
`

export const RadioOptionWrapper = styled.div`
  position: relative;
  color: ${(p) => p.theme.colorText};
  font-weight: ${(p) => p.theme.tokens.fontWeightBold};

  &:not(:last-child) {
    border-right: 1px solid ${(p) => p.theme.tokens.colorPaletteGray400};
  }

  ${mq.xs`
    flex: 1 1 auto;
    text-align: center;
  `}

  label {
    margin: 0;
    padding: ${(p) =>
      `${p.theme.tokens.spacing04} ${p.theme.tokens.spacing06}`};
    white-space: nowrap;
    background-color: ${(p) => p.theme.tokens.colorPaletteGray300};
    font-weight: ${(p) => p.theme.tokens.fontWeightBold};
    box-shadow: inset 0 -3px 0 rgba(0, 0, 0, 0.16);
  }

  input {
    position: absolute;
    opacity: 0;
    cursor: pointer;

    &:checked + label {
      color: white;
      background-color: ${(p) => p.theme.tokens.colorBrand3};
      box-shadow: inset 0 3px 0 rgba(0, 0, 0, 0.16);
    }

    &:focus + label {
      color: white;
      background-color: ${(p) => p.theme.tokens.colorBrand3};
    }
  }
`
