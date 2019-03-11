import React from 'react'
import { shallow } from 'enzyme'
import App from './App'

describe('the navigation', () => {
  let navigation

  beforeAll(() => {
    const wrapper = shallow(<App/>)
    navigation = wrapper.find('ul')
  })

  it('should contain a link to the Homepage', () => {
    const homeLink = navigation.childAt(0).find('Link')
    expect(homeLink.props().children).toBe('Home')
    expect(homeLink.props().to).toBe('/')
  })

  it('should contain a link to the Search page', () => {
    const homeLink = navigation.childAt(1).find('Link')
    expect(homeLink.props().children).toBe('Search')
    expect(homeLink.props().to).toBe('/search')
  })

  it('should contain a link to the Submit API page', () => {
    const homeLink = navigation.childAt(2).find('Link')
    expect(homeLink.props().children).toBe('Submit your API')
    expect(homeLink.props().to).toBe('/submit-api')
  })

  it('should contain a link to the About page', () => {
    const homeLink = navigation.childAt(3).find('Link')
    expect(homeLink.props().children).toBe('About')
    expect(homeLink.props().to).toBe('/about')
  })
})
