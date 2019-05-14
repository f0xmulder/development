import React from 'react'
import { shallow } from 'enzyme/build'
import TopBar from './index'

describe('the TopBar', () => {
  let wrapper
  let navigation

  beforeAll(() => {
    wrapper = shallow(<TopBar />)
    navigation = wrapper.find('Styled(Navigation)')
  })

  it('should contain a link to the Home page', () => {
    const homeLink = wrapper.find('Styled(Link)')
    expect(homeLink.props().children).toBe('developer.overheid.nl')
    expect(homeLink.props().to).toBe('/')
  })

  it('should contain a link to the Overview page', () => {
    const overviewLink = navigation.childAt(0).find('NavLink')
    expect(overviewLink.props().children).toBe('Overzicht')
    expect(overviewLink.props().to).toBe('/overzicht')
  })

  it('should contain a link to the Submit API page', () => {
    const submitAPILink = navigation.childAt(1).find('NavLink')
    expect(submitAPILink.props().children).toBe('API toevoegen')
    expect(submitAPILink.props().to).toBe('/api-toevoegen')
  })

  it('should contain a link to the About page', () => {
    const aboutLink = navigation.childAt(2).find('NavLink')
    expect(aboutLink.props().children).toBe('Over')
    expect(aboutLink.props().to).toBe('/over')
  })
})
