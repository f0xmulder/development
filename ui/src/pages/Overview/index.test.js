import React from 'react'
import { shallow } from 'enzyme'
import Overview from './index'
import { modelFromAPIResponse } from '../../models/api'
import { flushPromises } from '../../test-helpers'

const apiFromAPIResponse = {}
apiFromAPIResponse['id'] = 'test-api.json'
apiFromAPIResponse['organization_name'] = 'Organization Name'
apiFromAPIResponse['service_name'] = 'Service Name'

describe('Overview', () => {
  describe('on initialization', () => {
    it('should fetch the available apis', () => {
      jest.spyOn(Overview.prototype, 'fetchApiList')

      const wrapper = shallow(<Overview />)
      expect(wrapper.instance().fetchApiList).toHaveBeenCalled()
    })
  })

  describe('loading the APIs', () => {
    it('should store the available apis as state', () => {
      const apiPromise = Promise.resolve({ apis: [apiFromAPIResponse] })
      Overview.prototype.fetchApiList = jest.fn(() => apiPromise)

      const wrapper = shallow(<Overview />)

      return flushPromises().then(() => {
        expect(wrapper.state('result')).toEqual({
          apis: [modelFromAPIResponse(apiFromAPIResponse)],
        })
      })
    })
  })

  describe('listing the available apis', () => {
    let wrapper, apiList

    beforeEach(() => {
      wrapper = shallow(<Overview />)
      wrapper.setState({
        result: { apis: [modelFromAPIResponse(apiFromAPIResponse)] },
        loaded: true,
      })
      apiList = wrapper.find('APIList')
    })

    it('should show the list of APIs', () => {
      expect(apiList.exists()).toBe(true)
    })
  })

  describe('when no apis are available', () => {
    it('should show a message saying no APIs are available yet', () => {
      const wrapper = shallow(<Overview />)
      wrapper.setState({ result: { apis: [] }, loaded: true })
      const noApisMessageElement = wrapper.find(
        '[data-test="no-apis-available-message"]',
      )
      expect(noApisMessageElement.exists()).toBe(true)
    })
  })

  describe('when an error occurred while fetching the apis', () => {
    it('should set the error state', () => {
      const ARBITRARY_ERROR_MESSAGE =
        'arbitrary reject reason coming from tests'
      const thePromise = Promise.reject(new Error(ARBITRARY_ERROR_MESSAGE))
      Overview.prototype.fetchApiList = jest.fn(() => thePromise)

      const wrapper = shallow(<Overview />)

      return flushPromises().then(() => {
        expect(wrapper.state().error).toBe(true)
      })
    })
  })

  describe('when the component is in the error state', () => {
    it('an error message should be visible', () => {
      const wrapper = shallow(<Overview />)
      wrapper.setState({ error: true, loaded: true })
      const noApisMessageElement = wrapper.find('[data-test="error-message"]')
      expect(noApisMessageElement.exists()).toBe(true)
    })
  })

  describe('getting the filters', () => {
    it('should return the values from the query parameters', () => {
      const wrapper = shallow(
        <Overview location={{ search: 'tags=42&organisatie=42' }} />,
      )

      const expectedQueryParams = {}
      expectedQueryParams['q'] = ''
      expectedQueryParams['api_type'] = []
      expectedQueryParams['organization_name'] = ['42']
      expectedQueryParams['tags'] = ['42']

      expect(wrapper.instance().getQueryParams()).toEqual(expectedQueryParams)
    })
  })

  describe('generating query parameters for set of filters', () => {
    it('should translate the filters into query parameters', () => {
      const wrapper = shallow(<Overview />)
      const result = wrapper
        .instance()
        .generateQueryParams({ q: 'test', tags: ['42', '43'] })
      expect(result.toString()).toEqual('q=test&tags=42&tags=43')
    })
  })

  describe('when changing the filters', () => {
    it('calls history to push a state', () => {
      const history = { push: jest.fn() }
      const wrapper = shallow(<Overview history={history} />)

      const newFilters = {}
      newFilters['q'] = ''
      newFilters['api_type'] = []
      newFilters['organization_name'] = ['42']
      newFilters['tags'] = ['42', '43']

      wrapper.instance().onFilterChange(newFilters)
      expect(history.push).toHaveBeenCalledWith(
        '?tags=42&tags=43&organisatie=42',
      )
    })
  })

  describe('changing the filters in the URL', () => {
    it('refetches the APIs', () => {
      jest.spyOn(Overview.prototype, 'fetchApiList').mockClear()

      const wrapper = shallow(<Overview location={{ search: '' }} />)
      wrapper.setProps({ location: { search: 'tags=42' } })
      expect(wrapper.instance().fetchApiList).toHaveBeenCalledTimes(2)
    })
  })
})
