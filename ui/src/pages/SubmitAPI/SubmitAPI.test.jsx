import React from 'react'
import { shallow } from 'enzyme'
import SubmitAPI from './SubmitAPI'

test('contains the page title', () => {
  const wrapper = shallow(<SubmitAPI match={{ url: 'https://don.nl' }} />)
  expect(wrapper.find('h1').exists()).toBe(true)
})
