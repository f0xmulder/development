import React from 'react'
import { shallow } from 'enzyme'
import Search from './Search'

it('exists', () => {
  const wrapper = shallow(<Search />)
  expect(wrapper.exists()).toBe(true)
})
