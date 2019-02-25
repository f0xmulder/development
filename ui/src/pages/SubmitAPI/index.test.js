import React from 'react'
import { shallow } from 'enzyme'
import SubmitAPI from './index'

it('contains the page title', () => {
  const wrapper = shallow(<SubmitAPI/>)
  expect(wrapper.find('h1').text()).toBe('Submit your API')
})
