// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import React from 'react'

const Cross = ({ ...props }) => (
  /* From the Remix Icon library: close-line */
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="24"
    height="24"
    {...props}
  >
    <path fill="none" d="M0 0h24v24H0z" />
    <path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z" />
  </svg>
)

export default Cross
