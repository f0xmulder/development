import React from 'react'
import { shallow } from 'enzyme'
import Feedback from './Feedback'

describe('Feedback', () => {
  it('should exist', () => {
    const wrapper = shallow(<Feedback />)
    expect(wrapper.exists()).toBe(true)
  })
})
