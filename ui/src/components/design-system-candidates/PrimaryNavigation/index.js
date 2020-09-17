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
  }

  componentDidMount() {
    // If more components start depending on window size,
    // consider using a library like: https://github.com/artsy/fresnel
    // which plays nice with the breakpoint setup we already have (and has cool SSR support).
    window.addEventListener('resize', this.debouncedWindowResize)
    this.handleWindowResize()
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.debouncedWindowResize)
  }

  handleWindowResize = () => {
    this.setState({ isMobile: window.innerWidth < breakpoints.md })
  }

  debouncedWindowResize = debounce(this.handleWindowResize, DEBOUNCE_MILLIS)

  render() {
    const { isMobile } = this.state
    return isMobile ? (
      <MobileNavigation {...this.props} />
    ) : (
      <DesktopNavigation {...this.props} />
    )
  }
}

PrimaryNavigation.propTypes = { ...primaryNavigationTypes }

export default PrimaryNavigation
