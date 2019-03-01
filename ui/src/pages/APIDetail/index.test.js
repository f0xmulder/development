import React from 'react'
import {shallow} from 'enzyme'
import APIDetail from './index'
import { RedocStandalone } from 'redoc'

const details = {
  "description": "Description",
  "organization_name": "Organization Name",
  "service_name": "Service Name",
  "api_url": "API URL",
  "api_specification_type": "Specification Type",
  "specification_url": "Specification URL",
  "documentation_url": "Documentation URL",
  "badges": ["Golden API", "Well-written docs"]
}

describe('on initialization', () => {
  it('should fetch the API details', () => {
    jest.spyOn(APIDetail.prototype, 'fetchApiDetails')

    const wrapper = shallow(<APIDetail match={({ params: { id: '42' } })}/>)
    expect(wrapper.instance().fetchApiDetails).toHaveBeenCalledWith('42')
  })
})

describe('loading the API details', () => {
  it('should store the API info as state', () => {
    const apiPromise = Promise.resolve(details)
    APIDetail.prototype.fetchApiDetails = jest.fn(() => apiPromise)

    const wrapper = shallow(<APIDetail/>)
    return apiPromise
        .then(() => {
          expect(wrapper.state('details')).toEqual(details)
        })
  })
})

describe('the APIDetails', () => {
  let wrapper

  beforeEach(() => {
    const details = {
      "description": "Description",
      "organization_name": "Organization Name",
      "service_name": "Service Name",
      "api_url": "API URL",
      "api_specification_type": "Specification Type",
      "specification_url": "Specification URL",
      "documentation_url": "Documentation URL"
    }

    wrapper = shallow(<APIDetail/>)
    wrapper.setState({ details, loaded: true })
  })

  describe('the documentation', () => {
    it('should be included', () => {
      const documentation = wrapper.find(RedocStandalone)
      expect(documentation.exists()).toBe(true)
    })

    describe('when the specification URL can not be loaded', () => {
      it('should set the error state for the loading specification property', () => {
        const wrapper = shallow(<APIDetail />)
        expect(wrapper.state('errorLoadingSpecification')).toBe(false)

        wrapper.instance().onErrorLoadingSpecification()
        expect(wrapper.state('errorLoadingSpecification')).toBe(true)
      })

      it('an error message should be visible', () => {
        const wrapper = shallow(<APIDetail />)
        wrapper.setState({ errorLoadingSpecification: true, loaded: true, details })

        const noApisMessageElement = wrapper.find('[data-test="error-message-loading-specification"]')
        expect(noApisMessageElement.exists()).toBe(true)
        expect(noApisMessageElement.text()).toBe('Failed loading the API specification.')
      })
    })
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
