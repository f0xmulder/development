import React from 'react'
import { shallow } from 'enzyme'
import Home from './index'

const dummyAPI = {
  id: 'test-api.json',
  organization_name: 'Organization Name',
  service_name: 'Service Name'
}

describe('Home', () => {
  it('contains the page title', () => {
    const wrapper = shallow(<Home/>)
    expect(wrapper.find('h1').text()).toBe('API overview')
  })

  describe('on initialization', () => {
    it('should fetch the available apis', () => {
      jest.spyOn(Home.prototype, 'fetchApiList')

      const wrapper = shallow(<Home/>)
      expect(wrapper.instance().fetchApiList).toHaveBeenCalled()
    })
  })

  describe('loading the APIs', () => {
    it('should store the available apis as state', () => {
      const apiPromise = Promise.resolve([dummyAPI])
      Home.prototype.fetchApiList = jest.fn(() => apiPromise)

      const wrapper = shallow(<Home/>)
      return apiPromise
          .then(() => {
            expect(wrapper.state('apis')).toEqual([dummyAPI])
          })
    })
  })

  describe('listing the available apis', () => {
    let apiList

    beforeEach(() => {
      const wrapper = shallow(<Home/>)
      wrapper.setState({ apis: [dummyAPI], loaded: true })
      apiList = wrapper.find('APIList')
    })

    it('should show the list of APIs', () => {
      expect(apiList.exists()).toBe(true)
    })
  })

  describe('when no apis are available', () => {
    it('should show a message saying no APIs are available yet', () => {
      const wrapper = shallow(<Home/>)
      wrapper.setState({ apis: [], loaded: true })
      const noApisMessageElement = wrapper.find('[data-test="no-apis-available-message"]')
      expect(noApisMessageElement.exists()).toBe(true)
      expect(noApisMessageElement.text()).toBe('No APIs available (yet)')
    })
  })

  describe('when an error occurred while fetching the apis', () => {
    it('should set the error state', done => {
      const thePromise = Promise.reject('arbitrary reject reason coming from tests')
      Home.prototype.fetchApiList = jest.fn(() => thePromise)

      const wrapper = shallow(<Home />)

      return thePromise
          .catch(() => {
            expect(wrapper.state().error).toBe(true)
            done()
          })
    })
  })

  describe('when the component is in the error state', () => {
    it('an error message should be visible', () => {
      const wrapper = shallow(<Home/>)
      wrapper.setState({ error: true, loaded: true })
      const noApisMessageElement = wrapper.find('[data-test="error-message"]')
      expect(noApisMessageElement.exists()).toBe(true)
      expect(noApisMessageElement.text()).toBe('Failed loading the available APIs')
    })
  })
})
