// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import React from 'react'
import { shallow } from 'enzyme'

import { modelFromAPIResponse } from '../../models/api'
import APIDetail from './APIDetail'

/* eslint-disable camelcase */
const apiResponseObject = {}
apiResponseObject.id = 'organization-service'
apiResponseObject.description = 'Description'
apiResponseObject.organizationName = 'Organization Name'
apiResponseObject.serviceName = 'Service Name'
apiResponseObject.apiUrl = 'API URL'
apiResponseObject.apiType = 'rest_json'
apiResponseObject.specificationUrl = 'Specification URL'
apiResponseObject.documentationUrl = 'Documentation URL'
/* eslint-enable camelcase */

describe('APIDetail', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('on initialization', () => {
    it('should fetch the API details', () => {
      const apiPromise = Promise.resolve(apiResponseObject)
      const getApiDetailsByIdMock = jest.fn(() => apiPromise)

      shallow(
        <APIDetail
          match={{ params: { id: '42' } }}
          getApiDetailsById={getApiDetailsByIdMock}
        />,
      )

      expect(getApiDetailsByIdMock).toHaveBeenCalledWith('42')
    })
  })

  describe('when the provided API id changes', () => {
    it('should re-fetch the API details', () => {
      const apiPromise = Promise.resolve(apiResponseObject)
      const getApiDetailsByIdMock = jest.fn(() => apiPromise)

      const wrapper = shallow(
        <APIDetail
          match={{ params: { id: '42' } }}
          getApiDetailsById={getApiDetailsByIdMock}
        />,
      )
      wrapper.setProps({ match: { params: { id: '43' } } })

      expect(getApiDetailsByIdMock).toHaveBeenNthCalledWith(1, '42')
      expect(getApiDetailsByIdMock).toHaveBeenNthCalledWith(2, '43')
    })
  })

  describe('loading the API details', () => {
    it('should store the API model as state', () => {
      const apiPromise = Promise.resolve(apiResponseObject)
      const getApiDetailsByIdMock = jest.fn(() => apiPromise)

      const wrapper = shallow(
        <APIDetail getApiDetailsById={getApiDetailsByIdMock} />,
      )
      return apiPromise.then(() => {
        expect(wrapper.state('details')).toEqual(apiResponseObject)
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
    console.error = jest.fn()

    it('should set the error state', () => {
      global.console.error = jest.fn()

      return new Promise((resolve) => {
        const thePromise = Promise.reject(
          new Error('arbitrary reject reason coming from tests'),
        )
        const getApiDetailsByIdMock = jest.fn(() => thePromise)

        const wrapper = shallow(
          <APIDetail getApiDetailsById={getApiDetailsByIdMock} />,
        )

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
