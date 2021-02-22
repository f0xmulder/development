// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import React from 'react'
import { string, elementType } from 'prop-types'

import { StyledNavLink, Name, StyledExternalLink } from './index.styles'

const MobileNavigationItem = ({ name, Icon, to, href, ...otherProps }) =>
  to ? (
    <StyledNavLink to={to} {...otherProps}>
      <Name>{name}</Name>
      {Icon ? <Icon /> : null}
    </StyledNavLink>
  ) : (
    <StyledExternalLink href={href} {...otherProps}>
      <Name>{name}</Name>
      {Icon ? <Icon /> : null}
    </StyledExternalLink>
  )

MobileNavigationItem.propTypes = {
  name: string.isRequired,
  to: string,
  href: string,
  Icon: elementType,
  testid: string,
}

export default MobileNavigationItem
