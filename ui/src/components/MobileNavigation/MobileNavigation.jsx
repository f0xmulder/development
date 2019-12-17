import React, { Fragment, useState } from 'react'
import {
  NavButton,
  Navigation,
  Menu,
  Link,
  Divider,
} from './MobileNavigation.styles'

const HamburgerIcon = ({ ...props }) => (
  <svg viewBox="0 0 18 12" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="M0,12 L18,12 L18,10 L0,10 L0,12 Z M0,7 L18,7 L18,5 L0,5 L0,7 Z M0,0 L0,2 L18,2 L18,0 L0,0 Z"
      fill="#676D80"
    />
  </svg>
)

HamburgerIcon.defaultProps = {
  width: '18px',
  height: '12px',
}

const CrossIcon = ({ ...props }) => (
  <svg viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg" {...props}>
    <polygon
      fill="#676D80"
      points="14 1.41 12.59 0 7 5.59 1.41 0 0 1.41 5.59 7 0 12.59 1.41 14 7 8.41 12.59 14 14 12.59 8.41 7"
    />
  </svg>
)

CrossIcon.defaultProps = {
  width: '14px',
  height: '14px',
}

const MobileNavigation = () => {
  const [isVisible, setIsVisible] = useState(false)

  return (
    <Fragment>
      <NavButton onClick={() => setIsVisible(!isVisible)}>
        {isVisible ? <CrossIcon /> : <HamburgerIcon />}
      </NavButton>

      <Navigation isVisible={isVisible}>
        <Menu>
          <li>
            <Link exact to="/" onClick={() => setIsVisible(false)}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/overzicht" onClick={() => setIsVisible(false)}>
              Overzicht
            </Link>
          </li>
          <li>
            <Link to="/over" onClick={() => setIsVisible(false)}>
              Over
            </Link>
          </li>
        </Menu>
        <Divider />
        <Link to="/api-toevoegen" onClick={() => setIsVisible(false)}>
          + Voeg API toe
        </Link>
      </Navigation>
    </Fragment>
  )
}

export default MobileNavigation
