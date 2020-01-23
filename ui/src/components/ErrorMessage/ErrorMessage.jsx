import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const StyledErrorMessage = styled.span`
  color: ${(p) => {
    switch (p.level) {
      case 'notify':
        return p.theme.color.notify
      case 'error':
      default:
        return p.theme.color.error
    }
  }};
`

const ErrorMessage = (props) =>
  props.children ? <StyledErrorMessage {...props} /> : null

ErrorMessage.propTypes = {
  children: PropTypes.string,
  level: PropTypes.oneOf(['error', 'notify']),
}

ErrorMessage.defaultProps = {
  level: 'error',
}

export default ErrorMessage
