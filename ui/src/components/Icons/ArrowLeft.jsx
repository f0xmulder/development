import React from 'react'
import { string } from 'prop-types'
import theme from '../../theme'

const ArrowLeft = ({ ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
    <path
      fill={theme.colorTextLink}
      d="M7.828 11H20v2H7.828l5.364 5.364-1.414 1.414L4 12l7.778-7.778 1.414 1.414z"
    />
  </svg>
)

ArrowLeft.propTypes = {
  width: string,
  height: string,
}

ArrowLeft.defaultProps = {
  width: '18px',
  height: '18px',
}

export default ArrowLeft
