import React from 'react'
import { shallow } from 'enzyme'
import Overview from './index'

const dummyAPI = {
  id: 'test-api.json',
  organization_name: 'Organization Name',
  service_name: 'Service Name'
}

describe('Overview', () => {
  it('contains the page title', () => {
    const wrapper = shallow(<Overview/>)
    expect(wrapper.find('h1').exists()).toBe(true)
  })

  describe('on initialization', () => {
    it('should fetch the available apis', () => {
      jest.spyOn(Overview.prototype, 'fetchApiList')

      const wrapper = shallow(<Overview/>)
      expect(wrapper.instance().fetchApiList).toHaveBeenCalled()
    })
  })

  describe('loading the APIs', () => {
    it('should store the available apis as state', () => {
      const apiPromise = Promise.resolve({ apis: [dummyAPI] })
      Overview.prototype.fetchApiList = jest.fn(() => apiPromise)

      const wrapper = shallow(<Overview/>)
      return apiPromise
          .then(() => {
            expect(wrapper.state('list')).toEqual({ apis: [dummyAPI] })
          })
    })
  })

  describe('listing the available apis', () => {
    let wrapper, apiList

    beforeEach(() => {
      wrapper = shallow(<Overview/>)
      wrapper.setState({ list: { apis: [dummyAPI] }, loaded: true })
      apiList = wrapper.find('APIList')
    })

    it('should show the list of APIs', () => {
      expect(apiList.exists()).toBe(true)
    })
  })

  describe('when no apis are available', () => {
    it('should show a message saying no APIs are available yet', () => {
      const wrapper = shallow(<Overview/>)
      wrapper.setState({ list: { apis: [] }, loaded: true })
      const noApisMessageElement = wrapper.find('[data-test="no-apis-available-message"]')
      expect(noApisMessageElement.exists()).toBe(true)
    })
  })

  describe('when an error occurred while fetching the apis', () => {
    it('should set the error state', done => {
      const thePromise = Promise.reject('arbitrary reject reason coming from tests')
      Overview.prototype.fetchApiList = jest.fn(() => thePromise)

      const wrapper = shallow(<Overview />)

      return thePromise
          .catch(() => {
            expect(wrapper.state().error).toBe(true)
            done()
          })
    })
  })

  describe('when the component is in the error state', () => {
    it('an error message should be visible', () => {
      const wrapper = shallow(<Overview/>)
      wrapper.setState({ error: true, loaded: true })
      const noApisMessageElement = wrapper.find('[data-test="error-message"]')
      expect(noApisMessageElement.exists()).toBe(true)
    })
  })
})
