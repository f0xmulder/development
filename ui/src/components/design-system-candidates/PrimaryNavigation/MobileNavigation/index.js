import React from 'react'
import { useLocation } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'

import primaryNavigationTypes from '../primaryNavigationTypes'
import { useToggleState } from '../../../../utils/hooks'
import MobileNavMenu from './components/MobileNavMenu'
import MobileSubNav from './components/MobileSubNav'

import Backdrop from './components/Backdrop'

const MOBILE_NAV_ITEMS = 4

const MobileNavigation = ({ items, ...props }) => {
  const [isSubNavVisible, toggleSubNav] = useToggleState(false)
  const location = useLocation()

  let mainItems = []
  let moreItems = []

  if (items.length > MOBILE_NAV_ITEMS) {
    mainItems = items.slice(0, 3)
    moreItems = items.slice(3)
  } else {
    mainItems = items.slice(0)
  }

  const isMoreActive = !!moreItems.find((item) => item.to === location.pathname)

  return (
    <>
      {moreItems.length > 0 ? (
        <>
          <CSSTransition in={isSubNavVisible} timeout={0} classNames="fade-in">
            <Backdrop onClick={toggleSubNav} hasVisibility={isSubNavVisible} />
          </CSSTransition>

          <CSSTransition
            in={isSubNavVisible}
            timeout={50}
            classNames="slide-in"
          >
            <MobileSubNav items={moreItems} closeFunction={toggleSubNav} />
          </CSSTransition>
        </>
      ) : null}

      <MobileNavMenu
        items={mainItems}
        hasMoreItems={moreItems.length > 0}
        isMoreActive={isMoreActive}
        onClick={toggleSubNav}
        {...props}
        data-primary-nav-type="mobile"
      />
    </>
  )
}

MobileNavigation.propTypes = { ...primaryNavigationTypes }

export default MobileNavigation
