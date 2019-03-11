import React from 'react'
import { shallow } from 'enzyme'
import Search from './index'

it('contains the page title', () => {
  const wrapper = shallow(<Search/>)
  expect(wrapper.find('h1').text()).toBe('Search API')
})

describe('on initialization', () => {
  afterEach(() => jest.clearAllMocks())

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
    const apiPromise = Promise.resolve([{ id: 'api-id'}])
    Search.prototype.fetchApisForQuery = jest.fn(() => apiPromise)

    const wrapper = shallow(<Search/>)
    return wrapper.instance().loadApisForQuery('foo')
        .then(() => {
          expect(wrapper.state('apis')).toEqual([{ id: 'api-id'}])
        })
  })
})

xdescribe('listing the available apis', () => {
  let listItems

  beforeEach(() => {
    const wrapper = shallow(<Search/>)

    const apis = [{
      id: 'test-api.json',
      organization_name: 'Organization Name',
      service_name: 'Service Name'
    }]
    wrapper.setState({ apis, loaded: true })

    listItems = wrapper.find('ul li')
  })

  it('should show all available APIs', () => {
    expect(listItems.length).toBe(1)
  })

  describe('the API links', () => {
    let itemLink

    beforeAll(() => {
      const listItem = listItems.first()
      itemLink = listItem.find('[data-test="link"]')
    })

    it('should navigate to the API Detail page for the API', () => {
      expect(itemLink.props().to).toBe('/detail/test-api.json')
    })

    it('should show the organization name as label', () => {
      expect(itemLink.props().children).toEqual(['Service Name', ' - ', 'Organization Name'])
    })
  })
})

xdescribe('when no apis are available', () => {
  it('should show a message saying no APIs are available yet', () => {
    const wrapper = shallow(<Search/>)
    wrapper.setState({ apis: [], loaded: true })
    const noApisMessageElement = wrapper.find('[data-test="no-apis-available-message"]')
    expect(noApisMessageElement.exists()).toBe(true)
    expect(noApisMessageElement.text()).toBe('No APIs available (yet)')
  })
})

xdescribe('when an error occurred while fetching the apis', () => {
  it('should set the error state', done => {
    const thePromise = Promise.reject('arbitrary reject reason coming from tests')
    Search.prototype.fetchApisForQuery = jest.fn(() => thePromise)

    const wrapper = shallow(<Search />)

    return thePromise
        .catch(() => {
          expect(wrapper.state().error).toBe(true)
          done()
        })
  })
})

xdescribe('when the component is in the error state', () => {
  it('an error message should be visible', () => {
    const wrapper = shallow(<Search/>)
    wrapper.setState({ error: true, loaded: true })
    const noApisMessageElement = wrapper.find('[data-test="error-message"]')
    expect(noApisMessageElement.exists()).toBe(true)
    expect(noApisMessageElement.text()).toBe('Failed loading the available APIs')
  })
})
