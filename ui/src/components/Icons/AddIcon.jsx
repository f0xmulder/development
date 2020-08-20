// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import React from 'react'
import { string } from 'prop-types'
import theme from '../../theme'

const AddIcon = ({ color, ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
    <path fill="none" d="M0 0h24v24H0z" />
    <path fill={color} d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2z" />
  </svg>
)

AddIcon.propTypes = {
  width: string,
  height: string,
  color: string,
}

AddIcon.defaultProps = {
  width: '18px',
  height: '18px',
  color: theme.colorText,
}

export default AddIcon
