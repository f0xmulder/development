import React from 'react'
import { shallow } from 'enzyme'
import About from './index'

it('contains the page title', () => {
  const wrapper = shallow(<About/>)
  expect(wrapper.find('h1').exists()).toBe(true)
})
