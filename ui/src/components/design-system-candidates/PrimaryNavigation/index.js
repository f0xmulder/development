// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import React, { Component } from 'react'
import debounce from 'debounce'

import { breakpoints } from '../../../theme'
import primaryNavigationTypes from './primaryNavigationTypes'
import DesktopNavigation from './DesktopNavigation'
import MobileNavigation from './MobileNavigation'

export const DEBOUNCE_MILLIS = 150

class PrimaryNavigation extends Component {
  state = {
    isMobile: true,
    changedHeight: false,
  }

  componentDidMount() {
    // If more components start depending on window size,
    // consider using a library like: https://github.com/artsy/fresnel
    // which plays nice with the breakpoint setup we already have (and has cool SSR support).
    window.addEventListener('resize', this.debouncedWindowResize)
    this.handleWindowResize()

    this.initialScreenSize = window.innerHeight
    window.addEventListener('resize', this.checkHeight)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.debouncedWindowResize)
    window.removeEventListener('resize', this.checkHeight)
  }

  // Used to check if the height of the window is changed, which we use
  // as indicator that a virtual keyboard is shown on a smartphone. We
  // allow a margin of a small percentage as we don't want to trigger
  // this when the URL bar of a smartphone browser hides/shows.
  checkHeight = () => {
    if (
      window.innerHeight < this.initialScreenSize * 0.85 ||
      window.innerHeight > this.initialScreenSize * 1.15
    ) {
      !this.state.changedHeight && this.setState({ changedHeight: true })
    } else {
      this.state.changedHeight && this.setState({ changedHeight: false })
    }
  }

  handleWindowResize = () => {
    this.setState({ isMobile: window.innerWidth < breakpoints.md })
  }

  debouncedWindowResize = debounce(this.handleWindowResize, DEBOUNCE_MILLIS)

  render() {
    const { isMobile, changedHeight } = this.state
    return isMobile ? (
      // Don't show the mobile navigation when the height of the window
      // is changed as we assume that the virtual keyboard is shown.
      // This is needed because the navigation bar doesn't play well
      // with form input when react-select is used (the keyboard pops up
      // when selecting an input field after which the nav bar is
      // redrawn above the keyboard and (probably) takes focus, resulting
      // in the keyboard closing again)
      changedHeight ? null : (
        <MobileNavigation {...this.props} />
      )
    ) : (
      <DesktopNavigation {...this.props} />
    )
  }
}

PrimaryNavigation.propTypes = { ...primaryNavigationTypes }

export default PrimaryNavigation
