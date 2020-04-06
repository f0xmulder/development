// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import React from 'react'
import { shallow } from 'enzyme'
import Footer from './Footer'

describe('Footer', () => {
  it('should exist', () => {
    const wrapper = shallow(<Footer />)
    expect(wrapper.exists()).toBe(true)
  })
})
