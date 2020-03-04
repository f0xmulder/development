import React from 'react'
import { bool } from 'prop-types'
import { Link } from 'react-router-dom'

import { StyledButton } from './Button.styles'

const ButtonLink = (props) => (
  <StyledButton {...props} as={props.disabled ? null : Link} />
)

const ButtonA = (props) => (
  <StyledButton {...props} as={props.disabled ? null : 'a'} />
)

const propTypes = {
  disabled: bool,
}

StyledButton.propTypes = propTypes
ButtonLink.propTypes = propTypes
ButtonA.propTypes = propTypes

export default StyledButton
export { ButtonLink, ButtonA }
