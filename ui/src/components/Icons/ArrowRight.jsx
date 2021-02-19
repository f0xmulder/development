// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import React from 'react'
import { string } from 'prop-types'

const ArrowRight = ({ ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    {...props}
  >
    <path d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z" />
  </svg>
)

ArrowRight.propTypes = {
  width: string,
  height: string,
}

ArrowRight.defaultProps = {
  width: '18px',
  height: '18px',
}

export default ArrowRight
