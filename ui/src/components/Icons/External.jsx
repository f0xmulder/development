// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import React from 'react'
import { string } from 'prop-types'
import theme from '../../theme'

const External = ({ color, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="16"
    height="16"
    {...props}
  >
    <path fill="none" d="M0 0h24v24H0z" />
    <path
      d="M10 6v2H5v11h11v-5h2v6a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h6zm11-3v8h-2V6.413l-7.793 7.794-1.414-1.414L17.585 5H13V3h8z"
      fill={color}
    />
  </svg>
)

External.propTypes = {
  color: string,
}

External.defaultProps = {
  color: theme.tokens.colorPaletteGray600,
}

export default External
