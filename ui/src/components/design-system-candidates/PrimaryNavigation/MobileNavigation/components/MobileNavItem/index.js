// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
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
}

export default MobileNavigationItem
