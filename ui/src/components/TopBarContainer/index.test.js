import React from 'react'
import { shallow } from 'enzyme'
import { TopBarContainer, isURLHomePage } from './index'

describe('TopBarContainer', () => {
  let wrapper
  let props

  beforeEach(() => {
    const location = { pathname: '/' }
    const history = { push: jest.fn() }
    props = { location, history }
    wrapper = shallow(<TopBarContainer {...props} />)
  })

  describe('the onSearchSubmitHandler', () => {
    it('should navigate to the Overzicht page and pass the query', () => {
      wrapper.instance().onSearchSubmitHandler('amsterdam')
      expect(props.history.push).toHaveBeenCalledWith('/overzicht?q=amsterdam')
    })

    it('should encode the query', () => {
      wrapper.instance().onSearchSubmitHandler('special # query')
      expect(props.history.push).toHaveBeenCalledWith(
        '/overzicht?q=special+%23+query',
      )
    })
  })
})

describe('is URL Home page', () => {
  it('should detect if a location path is the Home page', () => {
    expect(isURLHomePage('/')).toEqual(true)
    expect(isURLHomePage('/contact')).toEqual(false)
  })
})
