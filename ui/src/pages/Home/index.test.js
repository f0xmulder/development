import React from 'react'
import {shallow} from 'enzyme'
import Search from './index'

const historyPush = jest.fn()

describe('Search', () => {
  it('contains the page title', () => {
    const wrapper = shallow(<Search/>)
    expect(wrapper.find('h1').text()).toBe('developer.overheid.nl')
    expect(wrapper.find('h2').text()).toBe('Een incompleet overzicht van alle API’s binnen de Nederlandse overheid')
  })
})

