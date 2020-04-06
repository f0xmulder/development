// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import React from 'react'
import { shallow } from 'enzyme'
import Header from './Header'

describe('Header', () => {
  it('should exist', () => {
    const wrapper = shallow(<Header />)
    expect(wrapper.exists()).toBe(true)
  })
})
