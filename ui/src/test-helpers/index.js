// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//

import React from 'react'
import { ThemeProvider } from 'styled-components'
import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react'
import { node } from 'prop-types'
import { BrowserRouter as Router } from 'react-router-dom'
import '@testing-library/jest-dom/extend-expect'
import { rest } from 'msw'
import { setupServer } from 'msw/node'

import theme from '../theme'

// helper function, because Jest does not take care of chained promises.
// see https://github.com/facebook/jest/issues/2157#issuecomment-279171856
export const flushPromises = () =>
  new Promise((resolve) => setImmediate(resolve))

// based on https://testing-library.com/docs/react-testing-library/setup#custom-render
const AllTheProviders = ({ children }) => {
  return (
    <Router>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </Router>
  )
}
AllTheProviders.propTypes = {
  children: node,
}

const renderWithProviders = (ui, options) =>
  render(ui, { wrapper: AllTheProviders, ...options })

const renderWithRouter = (ui, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route)

  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>, {
    wrapper: Router,
  })
}

class SetupTest {
  constructor(Component, apiUrl, apiResponse) {
    this.Component = Component
    this.apiUrl = apiUrl
    if (apiUrl) {
      this.server = setupServer(
        rest.get(apiUrl, (_, res, ctx) => {
          return res(ctx.json(apiResponse))
        }),
      )
    }
  }

  renderComponent = (route, props) => {
    const historyMock = { push: jest.fn() }
    const component = React.cloneElement(this.Component, {
      history: historyMock,
      ...props,
    })
    this.Component = component
    const result = renderWithRouter(component, route)
    return {
      ...result,
      historyMock,
    }
  }

  setup = async ({
    throwBackendError,
    customResponse,
    assert,
    waitForLoadingToFinish = true,
    route,
    additionalProps,
  }) => {
    // Filter expected errors to keep the console clean
    const error = console.error

    if (throwBackendError) {
      console.error = jest.fn

      this.server.use(
        rest.get(this.apiUrl, (_, res, ctx) => {
          return res.once(
            ctx.status(500),
            ctx.json({ message: 'Internal server error' }),
          )
        }),
      )
    }

    if (customResponse) {
      this.server.use(
        rest.get(this.apiUrl, (_, res, ctx) => {
          return res.once(ctx.json(customResponse))
        }),
      )
    }

    // Arrange
    const render = this.renderComponent(route, additionalProps)

    // Act
    // Assert
    await waitFor(async () => {
      await assert(render)
    })

    // Allow components to gracefully unmount
    if (waitForLoadingToFinish) {
      await expect(
        waitForElementToBeRemoved(() => screen.getByTestId('loading')),
      ).resolves.not.toThrow()
    }

    // Restore error reporting
    console.error = error
  }
}

// re-export everything
export * from '@testing-library/react'

// override render method
export { renderWithProviders, SetupTest }
