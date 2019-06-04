import React from 'react'
import { shallow } from 'enzyme'
import External from './External'

it('exists', () => {
  const wrapper = shallow(<External />)
  expect(wrapper.exists()).toBe(true)
})
