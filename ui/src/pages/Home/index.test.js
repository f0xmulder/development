import React from 'react'
import {shallow} from 'enzyme'
import Search from './index'
import {PageTitle, SubTitle} from './index.styles'

describe('Search', () => {
  it('contains the page title', () => {
    const wrapper = shallow(<Search/>)
    expect(wrapper.find(PageTitle).text()).toBe('developer.overheid.nl')
    expect(wrapper.find(SubTitle).text()).toBe('Een incompleet overzicht van alle API’s binnen de Nederlandse overheid.')
  })
})

