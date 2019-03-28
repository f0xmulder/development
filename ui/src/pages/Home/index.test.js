import React from 'react'
import { shallow } from 'enzyme'
import Search, {mapApisForQueryResponseToApis} from './index'

const dummyAPI = {
  id: 'test-api.json',
  organization_name: 'Organization Name',
  service_name: 'Service Name'
}

describe('Search', () => {
  afterEach(() => jest.clearAllMocks())

  it('contains the page title', () => {
    const wrapper = shallow(<Search/>)
    expect(wrapper.find('h1').text()).toBe('Een incompleet overzicht van alle API’s binnen de Nederlandse overheid')
  })

  describe('mapping api response to api list', () => {
    it('should return a list of apis', () => {
      const input = {
        hits: [{
          fields: {
            id: 'foo'
          }
        }]
      }
      const response = mapApisForQueryResponseToApis(input)
      expect(response).toEqual([{ id: 'foo' }])
    })
  })

  describe('on initialization', () => {
    describe('when a query is set', () => {
      it('should fetch the available apis', () => {
        jest.spyOn(Search.prototype, 'fetchApisForQuery')

        const wrapper = shallow(<Search location={({search: { query: 'foo' }})}/>)
        expect(wrapper.instance().fetchApisForQuery).toHaveBeenNthCalledWith(1, 'foo')
      })
    })

    describe('when the query is not set', () => {
      it('should not fetch the available apis', () => {
        jest.spyOn(Search.prototype, 'fetchApisForQuery')

        const wrapper = shallow(<Search/>)
        expect(wrapper.instance().fetchApisForQuery).toHaveBeenCalledTimes(0)
      })
    })
  })

  describe('loading the APIs', () => {
    it('should store the returned apis as state', () => {
      const apiPromise = Promise.resolve([dummyAPI])
      Search.prototype.fetchApisForQuery = jest.fn(() => apiPromise)

      const wrapper = shallow(<Search/>)
      return wrapper.instance().loadApisForQuery('foo')
          .then(() => {
            expect(wrapper.state('apis')).toEqual([dummyAPI])
          })
    })
  })

  describe('listing the found apis', () => {
    let apiList

    beforeEach(() => {
      const wrapper = shallow(<Search/>)
      wrapper.setState({ apis: [dummyAPI], loaded: true })
      apiList = wrapper.find('APIList')
    })

    it('should show the list of APIs', () => {
      expect(apiList.exists()).toBe(true)
    })
  })

  describe('when no apis are available', () => {
    it('should show a message saying no APIs have been found', () => {
      const wrapper = shallow(<Search/>)
      wrapper.setState({ apis: [], loaded: true })
      const noApisMessageElement = wrapper.find('[data-test="no-apis-found-message"]')
      expect(noApisMessageElement.exists()).toBe(true)
    })
  })

  describe('when an error occurred while fetching the apis', () => {
    it('should set the error state', done => {
      const thePromise = Promise.reject('arbitrary reject reason coming from tests')
      Search.prototype.fetchApisForQuery = jest.fn(() => thePromise)

      const wrapper = shallow(<Search location={({search: { query: 'foo' }})} />)

      return thePromise
          .catch(() => {
            expect(wrapper.state().error).toBe(true)
            done()
          })
    })
  })

  describe('when the component is in the error state', () => {
    it('an error message should be visible', () => {
      const wrapper = shallow(<Search/>)
      wrapper.setState({ error: true, loaded: true })
      const noApisMessageElement = wrapper.find('[data-test="error-message"]')
      expect(noApisMessageElement.exists()).toBe(true)
    })
  })

  describe('the input change handler', () => {
    it('should update the query params of the history object', () => {
      const pushSpy = jest.fn()
      const wrapper = shallow(<Search history={({ push: pushSpy })}/>)

      const event = {currentTarget: {value: 'my-query'}}
      wrapper.instance().onInputChangedHandler(event)

      expect(pushSpy).toHaveBeenCalledWith(`?query=my-query`)
    })
  })
})
