import React from 'react'
import { Link } from 'react-router-dom'
import { shallow } from 'enzyme'
import Home from './index'

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
    const apiPromise = Promise.resolve([{test: 'test'}])
    Home.prototype.fetchApiList = jest.fn(() => apiPromise)

    const wrapper = shallow(<Home/>)
    return apiPromise
        .then(() => {
          expect(wrapper.state('apis')).toEqual([{ test: 'test'}])
        })
  })
})

describe('listing the available apis', () => {
  let listItems

  beforeEach(() => {
    const wrapper = shallow(<Home/>)

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
