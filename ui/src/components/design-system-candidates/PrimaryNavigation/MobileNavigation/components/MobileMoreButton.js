import React from 'react'
import { func } from 'prop-types'

import MobileNavItem from './MobileNavItem'
import IconMore from './IconMore'

const MobileMoreButton = (props) => (
  <MobileNavItem
    as="button"
    type="button"
    Icon={IconMore}
    name="Meer"
    testid="link-more"
    {...props}
  />
)

MobileMoreButton.propTypes = {
  onClick: func.isRequired,
}

export default MobileMoreButton
