import React from 'react'
import { shallow } from 'enzyme'
import App from './App'

it('contains the page title', () => {
  const wrapper = shallow(<App/>)
  expect(wrapper).toMatchSnapshot()
})
