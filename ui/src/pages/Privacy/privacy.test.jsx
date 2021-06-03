// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import React from 'react'
import { renderWithProviders, screen } from '../../test-helpers'
import Privacy from './privacy'

test('should render correctly', () => {
  renderWithProviders(<Privacy />)
  expect(screen.getByText('Privacyverklaring')).toBeInTheDocument()
})
