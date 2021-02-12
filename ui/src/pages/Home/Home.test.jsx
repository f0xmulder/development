// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import React from 'react'
import { shallow } from 'enzyme'
import { screen } from '@testing-library/react'
import { renderWithProviders } from '../../test-helpers'
import Home from './Home'
import { StyledHeading } from './Home.styles'

describe('Home', () => {
  describe('on initialization', () => {
    it('contains the page title', () => {
      const wrapper = shallow(<Home />)
      expect(wrapper.find(StyledHeading).exists()).toBe(true)
    })
  })

  describe('when rendered', () => {
    beforeEach(() => {
      renderWithProviders(<Home />)
    })
    it('should contain a link to the API overview', () => {
      expect(screen.getByText(/Bekijk API's/)).toBeInTheDocument()
    })
    it('should contain a link to developer forum', () => {
      expect(screen.getByText(/Ga naar forum/)).toBeInTheDocument()
    })
  })
})
