import React from 'react'
import { string } from 'prop-types'
import theme from '../../theme'

const External = ({ ...props }) => (
  <svg viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="M10 8h2v2a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h2v2H2v8h8V8zm0-4.808L5.414 7.778 4 6.364 8.364 2H6V0h6v6h-2V3.192z"
      fill={theme.colorTextInactive}
      fillRule="nonzero"
    />
  </svg>
)

External.propTypes = {
  width: string,
  height: string,
}

External.defaultProps = {
  width: '10px',
  height: '10px',
}

export default External
