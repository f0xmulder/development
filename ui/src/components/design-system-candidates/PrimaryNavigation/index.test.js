import React from 'react'
import { render, wait } from '@testing-library/react'
import { MemoryRouter as Router } from 'react-router-dom'
import { ThemeProvider } from 'styled-components/macro'

import theme from '../../../theme'
import PrimaryNavigation from './index'

const navItems = [
  {
    name: 'Home',
    to: '/',
    'data-testid': 'link-homepage',
  },
  {
    name: 'Producten',
    to: '/producten',
    'data-testid': 'link-products',
  },
  {
    name: 'Componenten',
    to: '/componenten',
    'data-testid': 'link-components',
  },
  {
    name: 'Principes',
    to: '/principes',
    'data-testid': 'link-principes',
  },
]

// We don't care about the component tree, just to see if the screen-width logic works
jest.mock('./MobileNavigation', () => () => <nav data-testid="mobile-nav" />)
jest.mock('./DesktopNavigation', () => () => <nav data-testid="desktop-nav" />)

// Because of the debounce
jest.useFakeTimers()

const defaultWindowSize = {
  x: global.innerWidth,
  y: global.innerHeight,
}

const resizeWindow = (x, y) => {
  global.innerWidth = x
  global.innerHeight = y
  global.dispatchEvent(new Event('resize'))
}

const createInstance = () =>
  render(
    <ThemeProvider theme={theme}>
      <Router>
        <PrimaryNavigation items={navItems} />
      </Router>
    </ThemeProvider>,
  )

describe('PrimaryNavigation', () => {
  afterEach(() => {
    global.innerWidth = defaultWindowSize.x
    global.innerHeight = defaultWindowSize.y
  })

  it('should show mobile navigation on small screens', () => {
    const { getByTestId } = createInstance()
    resizeWindow(360, 500)

    wait(() => {
      expect(getByTestId('mobile-nav')).toBeTruthy()
    })
  })

  it('should show wide navigation on larger screens', () => {
    const { getByTestId } = createInstance()
    resizeWindow(1200, 800)

    wait(() => {
      expect(getByTestId('primary-nav')).toBeTruthy()
    })
  })
})