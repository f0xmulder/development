import React from 'react'
import {shallow} from 'enzyme'
import MobileNavigation from './index'
import {Menu, Link} from './index.styles'

describe('the MobileNavigation', () => {
  let menu

  beforeAll(() => {
    const wrapper = shallow(<MobileNavigation/>)
    menu = wrapper.find(Menu)
  })

  it('should contain a link to the Home page', () => {
    const homeLink = menu.childAt(0).find(Link)
    expect(homeLink.props().children).toBe('Home')
    expect(homeLink.props().to).toBe('/')
  })

  it('should contain a link to the Overview page', () => {
    const homeLink = menu.childAt(1).find(Link)
    expect(homeLink.props().children).toBe('Overzicht')
    expect(homeLink.props().to).toBe('/overzicht')
  })

  it('should contain a link to the About page', () => {
    const homeLink = menu.childAt(2).find(Link)
    expect(homeLink.props().children).toBe('Over')
    expect(homeLink.props().to).toBe('/over')
  })
})
