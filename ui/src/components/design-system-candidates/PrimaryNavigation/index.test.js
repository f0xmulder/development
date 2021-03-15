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

    resizeWindow(360, defaultWindowSize.y)
    await waitForDebounce()

    const element = await findByTestId('mobile-nav')
    expect(element).toBeTruthy()
  })

  it('should hide nav bar in mobile navigation if screen height is resized more than 15% and show it again when resized to less than 15% from the original height', async () => {
    resizeWindow(360, 1000)

    const { queryByTestId } = createInstance()

    resizeWindow(360, 800)

    const element = queryByTestId('mobile-nav')
    expect(element).toBeNull()

    resizeWindow(360, 1000)
    await waitForDebounce()

    const element2 = queryByTestId('mobile-nav')
    expect(element2).toBeTruthy()
  })

  it('should not hide nav bar in mobile navigation if screen height is resized less than 15%', async () => {
    resizeWindow(360, 1000)

    const { findByTestId } = createInstance()

    resizeWindow(360, 900)
    await waitForDebounce()

    const element = findByTestId('mobile-nav')
    expect(element).toBeTruthy()
  })

  it('should show desktop navigation if the screen is large', async () => {
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
