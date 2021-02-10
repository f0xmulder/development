// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import React from 'react'
import { shallow } from 'enzyme'
import Header from './Header'
import { StyledTopNavigationAnchor } from './Header.styles'

describe('Header', () => {
  it('should exist', () => {
    const wrapper = shallow(<Header />)
    expect(wrapper.exists()).toBe(true)
  })
  it('should have a forum link', () => {
    const wrapper = shallow(<Header />)
    expect(wrapper.find(StyledTopNavigationAnchor).at(0).props().href).toBe("https://forum.developer.overheid.nl")
  })
})
