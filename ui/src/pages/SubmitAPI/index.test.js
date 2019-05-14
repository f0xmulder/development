import React from 'react'
import { shallow } from 'enzyme'
import SubmitAPI from './index'
import { StyledPageTitle } from './index.styles'

it('contains the page title', () => {
  const wrapper = shallow(<SubmitAPI />)
  expect(wrapper.find(StyledPageTitle).exists()).toBe(true)
})
