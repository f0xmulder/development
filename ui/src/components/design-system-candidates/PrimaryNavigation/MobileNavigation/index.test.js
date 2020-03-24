import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent, wait } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import { MemoryRouter as Router } from 'react-router-dom'

import theme from '../../../../theme'
import MobileNav from './index'

const Icon = () => <span>Icon</span>

const navItems3 = [
  {
    name: 'Home',
    Icon,
    to: '/',
    'data-testid': 'link-homepage',
  },
  {
    name: 'Producten',
    Icon,
    to: '/producten',
    'data-testid': 'link-products',
  },
  {
    name: 'Componenten',
    Icon,
    to: '/componenten',
    'data-testid': 'link-components',
  },
]

const navItems5 = [
  {
    name: 'Home',
    Icon,
    to: '/',
    'data-testid': 'link-homepage',
  },
  {
    name: 'Producten',
    Icon,
    to: '/producten',
    'data-testid': 'link-products',
  },
  {
    name: 'Componenten',
    Icon,
    to: '/componenten',
    'data-testid': 'link-components',
  },
  {
    name: 'Principes',
    to: '/principes',
    'data-testid': 'link-principes',
  },
  {
    name: 'Docs',
    to: '/docs',
    'data-testid': 'link-docs',
  },
]

function buildMobileNav(items) {
  return render(
    <Router>
      <ThemeProvider theme={theme}>
        <MobileNav items={items} />
      </ThemeProvider>
    </Router>,
  )
}

describe('the Primary Mobile Navigation', () => {
  it('should render expected number of nav items', () => {
    const { queryAllByTestId, queryByTestId } = buildMobileNav(navItems3)

    expect(queryAllByTestId(/link-/)).toHaveLength(3)
    expect(queryByTestId('mobile-nav').children).toHaveLength(3)
    expect(queryByTestId('mobile-nav-more')).not.toBeInTheDocument()
  })

  it('should render a maximum of three links items', () => {
    const { queryAllByTestId, queryByTestId } = buildMobileNav(navItems5)

    expect(queryAllByTestId(/link-/)).toHaveLength(3)
    expect(queryByTestId('mobile-nav').children).toHaveLength(4)
    expect(queryByTestId('mobile-nav-more')).toBeInTheDocument()
  })

  it('should show subnav when more button is clicked', async () => {
    const { queryByTestId } = buildMobileNav(navItems5)
    const subnav = queryByTestId('mobile-subnav')

    expect(subnav).not.toHaveClass('slide-in-enter-done')

    fireEvent.click(queryByTestId('mobile-nav-more'))

    await wait(() => {
      expect(subnav).toHaveClass('slide-in-enter-done')
    })

    expect(subnav.children).toHaveLength(2)

    const links = subnav.querySelectorAll('a')
    expect(links[0]).toHaveAttribute('href', '/principes')
    expect(links[1]).toHaveAttribute('href', '/docs')
  })
})
