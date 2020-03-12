import React, { Component } from 'react'
import debounce from 'debounce'

import { breakpoints } from '../../../theme'
import primaryNavigationTypes from './primaryNavigationTypes'
import DesktopNavigation from './DesktopNavigation'
import MobileNavigation from './MobileNavigation'

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

  handleWindowResize = () => {
    this.setState({ isMobile: window.innerWidth < breakpoints.md })
  }

  debouncedWindowResize = debounce(this.handleWindowResize, 150)

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
