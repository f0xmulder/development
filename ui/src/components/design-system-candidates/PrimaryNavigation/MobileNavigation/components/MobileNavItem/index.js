import React from 'react'
import { string, elementType } from 'prop-types'

import { StyledNavLink, Name } from './index.styles'

const MobileNavigationItem = ({ name, Icon, ...otherProps }) => (
  <StyledNavLink {...otherProps}>
    <Name>{name}</Name>
    {Icon ? <Icon /> : null}
  </StyledNavLink>
)

MobileNavigationItem.propTypes = {
  name: string.isRequired,
  Icon: elementType,
  testid: string,
  type: string,
}

MobileNavigationItem.defaultProps = {
  type: 'button',
}

export default MobileNavigationItem
