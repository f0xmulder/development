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

  describe('when filters are set in the search parameter', () => {
    it('is can be fetched with getFilterValues()', () => {
      const wrapper = shallow(<Overview location={{ search: 'tags=42&organization_name=42' }} />)
      expect(wrapper.instance().getFilterValues()).toEqual({ q: '', api_specification_type: [], organization_name: ['42'], tags: ['42']})
    })
  })

  describe('when a url is generated for a specific filter setting', () => {
    it('is translated correctly into search parameters', () => {
      const wrapper = shallow(<Overview />)
      const result = wrapper.instance().generateURL({ q: 'test', tags: ['42', '43']})
      expect(result.toString()).toEqual('q=test&tags=42&tags=43')
    })
  })

  describe('when filters are changed', () => {
    it('calls history to push a state', () => {
      const history = { push: jest.fn() }
      const wrapper = shallow(<Overview history={history} />)

      wrapper.instance().onFilterChange({ q: '', api_specification_type: [], organization_name: ['42'], tags: ['42', '43'] })
      expect(history.push).toHaveBeenCalledWith('?tags=42&tags=43&organization_name=42')
    })
  })

  describe('when the search parameter of the location changes', () => {
    it('refetches the APIs', () => {
      jest.spyOn(Overview.prototype, 'fetchApiList').mockClear()

      const wrapper = shallow(<Overview location={{search: '' }} />)
      wrapper.setProps({ location: { search: 'tags=42' }})
      expect(wrapper.instance().fetchApiList).toHaveBeenCalledTimes(2)
    })
  })
})
