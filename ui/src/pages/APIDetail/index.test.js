import React from 'react'
import {shallow} from 'enzyme'
import APIDetail from './index'

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

describe('APIDetail', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('on initialization', () => {
    it('should fetch the API details', () => {
      jest.spyOn(APIDetail.prototype, 'fetchApiDetails')

      const wrapper = shallow(<APIDetail match={({ params: { id: '42' } })}/>)
      expect(wrapper.instance().fetchApiDetails).toHaveBeenCalledWith('42')
    })
  })

  describe('when the provided API id changes', () => {
    it('should re-fetch the API details', () => {
      jest.spyOn(APIDetail.prototype, 'fetchApiDetails')

      const wrapper = shallow(<APIDetail match={({ params: { id: '42' } })}/>)
      wrapper.setProps({match: {params: {id: '43'}}})
      expect(wrapper.instance().fetchApiDetails).toHaveBeenNthCalledWith(1, '42')
      expect(wrapper.instance().fetchApiDetails).toHaveBeenNthCalledWith(2, '43')
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
})
