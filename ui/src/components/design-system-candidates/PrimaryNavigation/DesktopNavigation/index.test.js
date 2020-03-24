import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import { MemoryRouter as Router } from 'react-router-dom'

import theme from '../../../../theme'
import DesktopNav from './index'

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

describe('the Primary Desktop Navigation', () => {
  it('should render expected number of nav items', () => {
    const result = render(
      <Router>
        <ThemeProvider theme={theme}>
          <DesktopNav items={navItems} />
        </ThemeProvider>
      </Router>,
    )
    expect(result.getAllByTestId('primary-nav-item')).toHaveLength(4)
  })
})
