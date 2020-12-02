// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import React from 'react'

const Checkmark = ({ ...props }) => (
  /* From the Remix Icon library: check-line */
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="24"
    height="24"
    {...props}
  >
    <path fill="none" d="M0 0h24v24H0z" />
    <path d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z" />
  </svg>
)

export default Checkmark
