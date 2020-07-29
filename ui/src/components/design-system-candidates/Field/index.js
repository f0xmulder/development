// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import React from 'react'
import { node, oneOf } from 'prop-types'
import styled from 'styled-components'
import { Field as FormikField } from 'formik'
import { WIDTH } from './const'

const getMaxWidth = (maxWidth) => {
  switch (maxWidth) {
    case WIDTH.EXTRA_SMALL:
      return '7.5rem'
    case WIDTH.SMALL:
      return '15rem'
    case WIDTH.MEDIUM:
      return '30rem'
    case WIDTH.LARGE:
      return '45rem'
    default:
      return '100%'
  }
}

// This filters the maxWidth prop from the passed props and is a workaround until
// htps://github.com/styled-components/styled-components/issues/2878 is implemented.
const FormikFieldWithFilteredProp = (props) => {
  const { maxWidth, ...rest } = props
  return <FormikField {...rest}>{props.children}</FormikField>
}

FormikFieldWithFilteredProp.propTypes = {
  maxWidth: oneOf([WIDTH.EXTRA_SMALL, WIDTH.SMALL, WIDTH.MEDIUM, WIDTH.LARGE]),
  children: node,
}

const Field = styled(FormikFieldWithFilteredProp)`
  display: block;
  width: 100%;
  max-width: ${(p) => getMaxWidth(p.maxWidth)};
  font-size: ${(p) => p.theme.tokens.fontSizeMedium};
  font-family: 'Source Sans Pro', sans-serif;
  padding: ${(p) => p.theme.tokens.spacing04};
  color: ${(p) => p.theme.colorText};
  border: 1px solid ${(p) => p.theme.tokens.colorPaletteGray500};
  outline: none;
  line-height: ${(p) => p.theme.tokens.lineHeightText};

  ${(p) =>
    p.component === 'textarea'
      ? `
        min-height: 10rem;
      `
      : null}

  &:focus {
    padding: calc(${(p) => p.theme.tokens.spacing04} - 1px);
    border: 2px solid ${(p) => p.theme.tokens.colorPaletteBlue700};
  }

  &:placeholder {
    color: ${(p) => p.theme.tokens.colorPaletteGray600};
  }

  &.invalid {
    padding: calc(${(p) => p.theme.tokens.spacing04} - 1px);
    border: 2px solid ${(p) => p.theme.tokens.colorAlertError};
  }
`

export default Field
