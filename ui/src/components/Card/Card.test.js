import React from 'react'
import { shallow } from 'enzyme'
import Card from './Card'

describe('Card', () => {
  it('should exist', () => {
    const wrapper = shallow(<Card />)
    expect(wrapper.exists()).toBe(true)
  })
})
