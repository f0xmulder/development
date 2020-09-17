// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import React from 'react'
import { render } from '@testing-library/react'
import { MemoryRouter as Router } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'

import theme from '../../../theme'
import PrimaryNavigation, { DEBOUNCE_MILLIS } from './index'

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

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const waitForDebounce = () => sleep(DEBOUNCE_MILLIS + 1)

describe('PrimaryNavigation', () => {
  afterEach(() => {
    global.innerWidth = defaultWindowSize.x
    global.innerHeight = defaultWindowSize.y
  })

  it('should show mobile navigation if the screen is small', async () => {
    resizeWindow(360, 500)

    const { findByTestId } = createInstance()

    const element = await findByTestId('mobile-nav')
    expect(element).toBeTruthy()
  })

  it('should show mobile navigation if the screen becomes small', async () => {
    const { findByTestId } = createInstance()

    resizeWindow(360, 500)
    await waitForDebounce()

    const element = await findByTestId('mobile-nav')
    expect(element).toBeTruthy()
  })

  it('should desktop navigation if the screen is large', async () => {
    resizeWindow(1200, 800)

    const { findByTestId } = createInstance()

    const element = await findByTestId('desktop-nav')
    expect(element).toBeTruthy()
  })

  it('should show desktop navigation if the screen becomes large', async () => {
    const { findByTestId } = createInstance()

    resizeWindow(1200, 800)
    await waitForDebounce()

    const element = await findByTestId('desktop-nav')
    expect(element).toBeTruthy()
  })
})
