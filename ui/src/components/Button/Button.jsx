import React from 'react'
import { bool } from 'prop-types'
import { Link } from 'react-router-dom'
import { Button } from '@commonground/design-system'

const ButtonLink = (props) => (
  <Button {...props} as={props.disabled ? null : Link} />
)

const ButtonA = (props) => (
  <Button {...props} as={props.disabled ? null : 'a'} />
)

const propTypes = {
  disabled: bool,
}

Button.propTypes = propTypes
ButtonLink.propTypes = propTypes
ButtonA.propTypes = propTypes

export default Button
export { ButtonLink, ButtonA }
