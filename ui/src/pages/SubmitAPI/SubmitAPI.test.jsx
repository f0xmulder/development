import React from 'react'
import { shallow } from 'enzyme'
import SubmitAPI from './SubmitAPI'
import { StyledPageTitle } from './SubmitAPI.styles'

it('contains the page title', () => {
  const wrapper = shallow(<SubmitAPI match={{ url: 'https://don.nl' }} />)
  expect(wrapper.find(StyledPageTitle).exists()).toBe(true)
})
