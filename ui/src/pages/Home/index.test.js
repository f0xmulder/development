import React from 'react'
import {shallow, mount} from 'enzyme'
import Search from './index'

const historyPush = jest.fn()

describe('Search', () => {
  it('contains the page title', () => {
    const wrapper = shallow(<Search/>)
    expect(wrapper.find('h1').text()).toBe('Een incompleet overzicht van alle API’s binnen de Nederlandse overheid')
  })
})

