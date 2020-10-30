// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import React from 'react'
import { string } from 'prop-types'
import theme from '../../theme'

const StarIcon = ({ color, ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
    <title>Sterren</title>
    <path fill="none" d="M0 0h24v24H0z" />
    <path
      fill={color}
      d="M12 18.26l-7.053 3.948 1.575-7.928L.587 8.792l8.027-.952L12 .5l3.386 7.34 8.027.952-5.935 5.488 1.575 7.928L12 18.26zm0-2.292l4.247 2.377-.949-4.773 3.573-3.305-4.833-.573L12 5.275l-2.038 4.42-4.833.572 3.573 3.305-.949 4.773L12 15.968z"
    />
  </svg>
)

StarIcon.propTypes = {
  width: string,
  height: string,
  color: string,
}

StarIcon.defaultProps = {
  width: theme.tokens.spacing05,
  height: theme.tokens.spacing05,
  color: theme.tokens.colorPaletteGray600,
}

export default StarIcon
