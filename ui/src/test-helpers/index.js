// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//

import React from 'react'
import { ThemeProvider } from 'styled-components'
import { render } from '@testing-library/react'
import { node } from 'prop-types'

import theme from '../theme'

// helper function, because Jest does not take care of chained promises.
// see https://github.com/facebook/jest/issues/2157#issuecomment-279171856
export const flushPromises = () =>
  new Promise((resolve) => setImmediate(resolve))

// based on https://testing-library.com/docs/react-testing-library/setup#custom-render
const AllTheProviders = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}
AllTheProviders.propTypes = {
  children: node,
}

const renderWithProviders = (ui, options) =>
  render(ui, { wrapper: AllTheProviders, ...options })

// re-export everything
export * from '@testing-library/react'

// override render method
export { renderWithProviders }
