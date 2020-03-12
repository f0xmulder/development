import React from 'react'
import { shallow } from 'enzyme'
import External from './External'

test('exists', () => {
  const wrapper = shallow(<External />)
  expect(wrapper.exists()).toBe(true)
})
