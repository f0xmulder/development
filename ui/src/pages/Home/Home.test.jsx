import React from 'react'
import { shallow } from 'enzyme'
import Home from './Home'
import { StyledHeading } from './Home.styles'

describe('Home', () => {
  describe('on initialization', () => {
    it('contains the page title', () => {
      const wrapper = shallow(<Home />)
      expect(wrapper.find(StyledHeading).exists()).toBe(true)
    })
  })
})
