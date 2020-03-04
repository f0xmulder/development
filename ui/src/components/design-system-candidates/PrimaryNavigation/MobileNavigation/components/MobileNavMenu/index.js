import React from 'react'
import { array, bool, func } from 'prop-types'

import MobileNavItem from '../MobileNavItem'
import MobileMoreButton from '../MobileMoreButton'

import { MobileNavWrapper } from './index.styles'

const MobileNavMenu = ({ items, hasMoreItems, onClick, isMoreActive }) => (
  <MobileNavWrapper data-testid="mobile-nav">
    {items.map((item) => (
      <MobileNavItem key={item.name} to={item.to} {...item} />
    ))}
    {hasMoreItems ? (
      <MobileMoreButton
        onClick={onClick}
        className={isMoreActive && 'active'}
        data-testid="mobile-nav-more"
      />
    ) : null}
  </MobileNavWrapper>
)

MobileNavMenu.propTypes = {
  items: array.isRequired,
  hasMoreItems: bool.isRequired,
  onClick: func.isRequired,
  isMoreActive: bool,
}

export default MobileNavMenu
