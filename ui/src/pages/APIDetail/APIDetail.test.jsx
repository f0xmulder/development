import React from 'react'
import { shallow } from 'enzyme'

import { modelFromAPIResponse } from '../../models/api'
import APIDetail from './APIDetail'

/* eslint-disable @typescript-eslint/camelcase */
const apiResponseObject = {}
apiResponseObject.description = 'Description'
apiResponseObject.organization_name = 'Organization Name'
apiResponseObject.service_name = 'Service Name'
apiResponseObject.api_url = 'API URL'
apiResponseObject.api_type = 'API Type'
apiResponseObject.specification_url = 'Specification URL'
apiResponseObject.documentation_url = 'Documentation URL'
/* eslint-enable @typescript-eslint/camelcase */

describe('APIDetail', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('on initialization', () => {
    it('should fetch the API details', () => {
      jest.spyOn(APIDetail.prototype, 'fetchApiDetails')

      const wrapper = shallow(<APIDetail match={{ params: { id: '42' } }} />)
      expect(wrapper.instance().fetchApiDetails).toHaveBeenCalledWith('42')
    })
  })

  describe('when the provided API id changes', () => {
    it('should re-fetch the API details', () => {
      jest.spyOn(APIDetail.prototype, 'fetchApiDetails')

      const wrapper = shallow(<APIDetail match={{ params: { id: '42' } }} />)
      wrapper.setProps({ match: { params: { id: '43' } } })
      expect(wrapper.instance().fetchApiDetails).toHaveBeenNthCalledWith(
        1,
        '42',
      )
      expect(wrapper.instance().fetchApiDetails).toHaveBeenNthCalledWith(
        2,
        '43',
      )
    })
  })

  describe('loading the API details', () => {
    it('should store the API model as state', () => {
      const apiPromise = Promise.resolve(apiResponseObject)
      APIDetail.prototype.fetchApiDetails = jest.fn(() => apiPromise)

      const wrapper = shallow(<APIDetail />)
      return apiPromise.then(() => {
        expect(wrapper.state('details')).toEqual(
          modelFromAPIResponse(apiResponseObject),
        )
      })
    })
  })

  describe('the APIDetails', () => {
    let wrapper

    beforeEach(() => {
      const apiModel = modelFromAPIResponse(apiResponseObject)
      wrapper = shallow(<APIDetail />)
      wrapper.setState({ details: apiModel, loaded: true })
    })
  })

  describe('when an error occurred while fetching the apis', () => {
    it('should set the error state', () => {
      return new Promise((resolve) => {
        const thePromise = Promise.reject(
          new Error('arbitrary reject reason coming from tests'),
        )
        APIDetail.prototype.fetchApiDetails = jest.fn(() => thePromise)

        const wrapper = shallow(<APIDetail />)

        return thePromise.catch(() => {
          expect(wrapper.state().error).toBe(true)
          resolve()
        })
      })
    })
  })

  describe('when the component is in the error state', () => {
    it('an error message should be visible', () => {
      const wrapper = shallow(<APIDetail />)
      wrapper.setState({ error: true, loaded: true })
      const noApisMessageElement = wrapper.find('[data-test="error-message"]')
      expect(noApisMessageElement.exists()).toBe(true)
    })
  })
})
