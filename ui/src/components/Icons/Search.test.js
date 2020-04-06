// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import React from 'react'
import { shallow } from 'enzyme'
import Search from './Search'

test('exists', () => {
  const wrapper = shallow(<Search />)
  expect(wrapper.exists()).toBe(true)
})
