import React from 'react'
import { shallow } from 'enzyme'

import Overview from './Overview'
import { goApiMock } from '../../models/api.mock'
import { modelFromAPIResponse } from '../../models/api'
import { flushPromises } from '../../test-helpers'

describe('Overview', () => {
  beforeAll(() => {
    global.console.error = jest.fn()
  })

  describe('on initialization', () => {
    it('should fetch the available apis', () => {
      jest.spyOn(Overview.prototype, 'fetchApiList')

      const wrapper = shallow(<Overview />)
      expect(wrapper.instance().fetchApiList).toHaveBeenCalled()
    })
  })

  describe('loading the APIs', () => {
    it('should store the available apis as state', () => {
      const apiPromise = Promise.resolve({
        total: 1,
        apis: [goApiMock],
      })
      Overview.prototype.fetchApiList = jest.fn(() => apiPromise)

      const wrapper = shallow(<Overview />)

      return flushPromises().then(() => {
        expect(wrapper.state('result')).toEqual({
          total: 1,
          apis: [modelFromAPIResponse(goApiMock)],
        })
      })
    })
  })

  describe('listing the available apis', () => {
    let wrapper, apiList

    beforeEach(() => {
      wrapper = shallow(<Overview />)
      wrapper.setState({
        result: { total: 1, apis: [modelFromAPIResponse(goApiMock)] },
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
      wrapper.setState({ total: 0, result: { apis: [] }, loaded: true })
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

      /* eslint-disable @typescript-eslint/camelcase */
      const expectedQueryParams = {}
      expectedQueryParams.q = ''
      expectedQueryParams.api_type = []
      expectedQueryParams.organization_name = ['42']
      expectedQueryParams.tags = ['42']
      expectedQueryParams.page = '1'
      /* eslint-enable @typescript-eslint/camelcase */

      expect(wrapper.instance().getQueryParams()).toEqual(expectedQueryParams)
    })
  })

  describe('when changing the filters', () => {
    it('calls history to push a state', () => {
      const history = { push: jest.fn() }
      const wrapper = shallow(<Overview history={history} />)

      /* eslint-disable @typescript-eslint/camelcase */
      const newFilters = {}
      newFilters.q = ''
      newFilters.api_type = []
      newFilters.organization_name = ['42']
      newFilters.tags = ['42', '43']
      /* eslint-enable @typescript-eslint/camelcase */

      wrapper.instance().handleFilterChange(newFilters)
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

  describe('when changing the page', () => {
    it('should persist the page in the URL', () => {
      const history = { push: jest.fn() }
      const wrapper = shallow(<Overview history={history} />)

      wrapper.instance().handlePageChange(1)
      expect(history.push).toHaveBeenCalledWith('?pagina=1')
    })

    it('should preserve other query params', () => {
      const history = { push: jest.fn() }
      const wrapper = shallow(
        <Overview history={history} location={{ search: 'foo=bar' }} />,
      )

      wrapper.instance().handlePageChange(1)
      expect(history.push).toHaveBeenCalledWith('?foo=bar&pagina=1')
    })
  })
})
