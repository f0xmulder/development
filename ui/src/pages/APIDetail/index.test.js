import React from 'react'
import {shallow} from 'enzyme'
import APIDetail from './index'

describe('on initialization', () => {
  it('should fetch the API details', () => {
    jest.spyOn(APIDetail.prototype, 'fetchApiDetails')

    const wrapper = shallow(<APIDetail match={({ params: { id: '42' } })}/>)
    expect(wrapper.instance().fetchApiDetails).toHaveBeenCalledWith('42')
  })
})

describe('loading the API details', () => {
  it('should store the API info as state', () => {
    const apiPromise = Promise.resolve([{test: 'test'}])
    APIDetail.prototype.fetchApiDetails = jest.fn(() => apiPromise)

    const wrapper = shallow(<APIDetail/>)
    return apiPromise
        .then(() => {
          expect(wrapper.state('details')).toEqual([{ test: 'test'}])
        })
  })
})

describe('the API details', () => {
  let pageTitle
  let description
  let apiURL
  let apiSpecType
  let apiSpecUrl
  let documentationUrl

  beforeEach(() => {
    const wrapper = shallow(<APIDetail/>)

    const details = {
      "description": "Description",
      "organization_name": "Organization Name",
      "service_name": "Service Name",
      "api_url": "API URL",
      "api_specification_type": "Specification Type",
      "specification_url": "Specification URL",
      "documentation_url": "Documentation URL"
    }
    wrapper.setState({ details, loaded: true })

    pageTitle = wrapper.find('h1')
    description = wrapper.find('p')
    apiURL = wrapper.find('[data-test="api-url"]')
    apiSpecType = wrapper.find('[data-test="api-specification-type"]')
    apiSpecUrl = wrapper.find('[data-test="api-specification-url"]')
    documentationUrl = wrapper.find('[data-test="api-documentation-url"]')
  })

  it('should show the service & organization name as page title', () => {
    expect(pageTitle.text()).toBe('Service Name - Organization Name')
  })

  it('should show the description', () => {
    expect(description.text()).toBe('Description')
  })

  it('should show the API URL', () => {
    expect(apiURL.text()).toBe('API URL')
  })

  it('should show the specification type', () => {
    expect(apiSpecType.text()).toBe('Specification Type')
  })

  it('should show the specification URL', () => {
    expect(apiSpecUrl.text()).toBe('Specification URL')
  })

  it('should show the documentation url', () => {
    expect(documentationUrl.text()).toBe('Documentation URL')
  })
})

describe('when an error occurred while fetching the apis', () => {
  it('should set the error state', done => {
    const thePromise = Promise.reject('arbitrary reject reason coming from tests')
    APIDetail.prototype.fetchApiDetails = jest.fn(() => thePromise)

    const wrapper = shallow(<APIDetail />)

    return thePromise
        .catch(() => {
          expect(wrapper.state().error).toBe(true)
          done()
        })
  })
})

describe('when the component is in the error state', () => {
  it('an error message should be visible', () => {
    const wrapper = shallow(<APIDetail />)
    wrapper.setState({ error: true, loaded: true })
    const noApisMessageElement = wrapper.find('[data-test="error-message"]')
    expect(noApisMessageElement.exists()).toBe(true)
    expect(noApisMessageElement.text()).toBe('Failed loading the API details')
  })
})
