import React from 'react'
import { shallow } from 'enzyme'
import About from './index'
import { StyledPageTitle } from './index.styles'

it('contains the page title', () => {
  const wrapper = shallow(<About />)
  expect(wrapper.find(StyledPageTitle).exists()).toBe(true)
})
