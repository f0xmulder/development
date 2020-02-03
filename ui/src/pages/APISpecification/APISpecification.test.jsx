import React from 'react'
import { shallow } from 'enzyme'

import { RedocStandalone } from 'redoc'

import { modelFromAPIResponse } from '../../models/api'
import { flushPromises } from '../../test-helpers'

import APISpecification from './APISpecification'

/* eslint-disable camelcase */
const apiResponseObject = {}
apiResponseObject.description = 'Description'
apiResponseObject.organization_name = 'Organization Name'
apiResponseObject.service_name = 'Service Name'
apiResponseObject.api_type = 'API Type'
apiResponseObject.environments = [
  {
    name: 'Productie',
    api_url: 'API URL',
    specification_url: 'Specification URL',
    documentation_url: 'Documentation URL',
  },
]
/* eslint-enable camelcase */

describe('APISpecification', () => {
  describe('on initialization', () => {
    it('should load the API details', () => {
      jest.spyOn(APISpecification.prototype, 'loadDetailsForApi')

      const wrapper = shallow(
        <APISpecification match={{ params: { id: 'organization-service' } }} />,
      )
      expect(wrapper.instance().loadDetailsForApi).toHaveBeenCalled()
    })
  })

  describe('loading the API details', () => {
    it('should store the API model as state', () => {
      const apiPromise = Promise.resolve(apiResponseObject)
      APISpecification.prototype.fetchApiDetails = jest.fn(() => apiPromise)

      const wrapper = shallow(
        <APISpecification
          match={{
            params: { id: 'organization-service', environment: 'productie' },
          }}
        />,
      )
      return apiPromise.then(() => {
        expect(wrapper.state('details')).toEqual(
          modelFromAPIResponse(apiResponseObject),
        )
      })
    })

    it('should render the Redoc standalone component with the correct url', () => {
      const apiPromise = Promise.resolve(apiResponseObject)
      APISpecification.prototype.fetchApiDetails = jest.fn(() => apiPromise)

      const wrapper = shallow(
        <APISpecification
          match={{
            params: { id: 'organization-service', environment: 'productie' },
          }}
        />,
      )
      return apiPromise.then(() => {
        expect(wrapper.find(RedocStandalone).prop('specUrl')).toEqual(
          apiResponseObject.environments[0].specification_url,
        )
      })
    })

    it('should show an error message if loading failed', () => {
      console.error = jest.fn()

      const apiErrorPromise = Promise.reject(
        new Error('arbitrary reject reason'),
      )
      APISpecification.prototype.fetchApiDetails = jest.fn(
        () => apiErrorPromise,
      )

      const wrapper = shallow(
        <APISpecification
          match={{
            params: { id: 'organization-service', environment: 'productie' },
          }}
        />,
      )

      return flushPromises().then(() => {
        expect(wrapper.find('[data-test="error-message"]').exists()).toEqual(
          true,
        )
      })
    })
  })
})
