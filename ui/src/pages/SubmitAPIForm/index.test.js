import React from 'react'
import { shallow } from 'enzyme'
import SubmitAPI, {
  convertRIFormDataToAPIDefinition,
  convertLinkToRIToRelation,
  mapFormValuesToAPIRequestBody,
} from './index'
import { Formik } from 'formik'
import Overview from '../Overview'
import { flushPromises } from '../../test-helpers'
import { modelFromAPIResponse } from '../../models/api'

describe('convertRIFormDataToAPIDefinition', () => {
  it('should unset the link to a RI if the API itself is marked as a RI', () => {
    const referenceImplementationFormData = {}
    referenceImplementationFormData.isReferenceImplementation = true
    referenceImplementationFormData.referenceImplementation = 'dummy-api-id'

    const result = convertRIFormDataToAPIDefinition(
      referenceImplementationFormData,
    )
    expect(result.referenceImplementation).toBeUndefined()
  })
})

describe('convertLinkToRIToRelation', () => {
  it('should convert the link to a relation object', () => {
    const linkToReferenceImplementation = {}
    linkToReferenceImplementation.referenceImplementation = 'dummy-api-id'

    const result = convertLinkToRIToRelation(linkToReferenceImplementation)

    expect(result).toEqual({
      relations: {
        'dummy-api-id': ['reference-implementation'],
      },
    })
  })
})

describe('map form values to API request body for submitting an API', () => {
  it('should map the values from camelBack notation to snake_case', () => {
    const input = {
      description: '',
      organizationName: '',
      serviceName: '',
      apiURL: '',
      apiType: '',
      specificationURL: '',
      documentationURL: '',
      tags: [],
      badges: '',
      contact: {
        email: '',
        phone: '',
        fax: '',
        chat: '',
        url: '',
      },
      termsOfUse: {
        governmentOnly: false,
        payPerUse: false,
        uptimeGuarantee: 99.5,
        supportResponseTime: '',
      },
      isReferenceImplementation: false,
      referenceImplementation: '',
    }

    /* eslint-disable camelcase */
    expect(mapFormValuesToAPIRequestBody(input)).toEqual({
      description: '',
      organization_name: '',
      service_name: '',
      api_url: '',
      api_type: '',
      specification_url: '',
      documentation_url: '',
      tags: [],
      badges: '',
      contact: {
        email: '',
        phone: '',
        fax: '',
        chat: '',
        url: '',
      },
      terms_of_use: {
        government_only: false,
        pay_per_use: false,
        uptime_guarantee: 99.5,
        support_response_time: '',
      },
      is_reference_implementation: false,
      reference_implementation: '',
    })
    /* eslint-enable camelcase */
  })
})

describe('SubmitAPI', () => {
  afterEach(() => jest.clearAllMocks())

  describe('on initialization', () => {
    it('should fetch the available apis', () => {
      jest.spyOn(SubmitAPI.prototype, 'fetchApiList')

      const wrapper = shallow(<SubmitAPI />)
      expect(wrapper.instance().fetchApiList).toHaveBeenCalled()
    })
  })

  describe('loading the available APIs', () => {
    /* eslint-disable camelcase */
    const apiFromAPIResponse = {}
    apiFromAPIResponse.id = 'test-api.json'
    apiFromAPIResponse.organization_name = 'Organization Name'
    apiFromAPIResponse.service_name = 'Service Name'
    /* eslint-enable camelcase */

    it('should store the available apis as state', () => {
      const apiPromise = Promise.resolve({
        total: 1,
        apis: [apiFromAPIResponse],
      })
      Overview.prototype.fetchApiList = jest.fn(() => apiPromise)

      const wrapper = shallow(<SubmitAPI />)

      return flushPromises().then(() => {
        expect(wrapper.state('result')).toEqual({
          total: 1,
          apis: [modelFromAPIResponse(apiFromAPIResponse)],
        })
      })
    })
  })

  describe("when the API's are loaded", () => {
    let wrapper
    let onSubmitSpy
    let submitToApiSpy

    beforeEach(() => {
      onSubmitSpy = jest.spyOn(SubmitAPI.prototype, 'onSubmit')
      submitToApiSpy = jest.spyOn(SubmitAPI.prototype, 'submitToApi')
      wrapper = shallow(<SubmitAPI />)
      wrapper.setState({ apis: [], apisLoaded: true })
    })

    it('contains a form', () => {
      const form = wrapper.find(Formik)
      expect(form.exists()).toBe(true)
    })

    it('has a non-submitted state when loaded', () => {
      expect(wrapper.state('submitted')).toBe(false)
    })

    describe('when component state is submitted', () => {
      beforeEach(() => {
        const responseData = {}
        /* eslint-disable camelcase */
        responseData.id = 1
        responseData.web_url = 'http://gitlab.com/issues/1'
        /* eslint-enable camelcase */

        wrapper.setState({
          submitted: true,
          responseData,
        })
      })

      it('should display the success message', () => {
        const apiSubmittedMessage = wrapper.find(
          '[data-test="api-submitted-message"]',
        )
        expect(apiSubmittedMessage.exists()).toBe(true)
      })

      it('should show the link to the issue', () => {
        const apiSubmittedMessage = wrapper.find(
          'a[href="http://gitlab.com/issues/1"]',
        )
        expect(apiSubmittedMessage.exists()).toBe(true)
      })
    })

    describe('when submit event on form is triggered', () => {
      it('should call the onSubmit function', () => {
        const form = wrapper.find(Formik)
        form.simulate('submit')

        expect(onSubmitSpy).toHaveBeenCalled()
      })
    })

    describe('when onSubmit is called', () => {
      it('should call the submitToApi method', () => {
        wrapper.instance().onSubmit()
        expect(submitToApiSpy).toHaveBeenCalled()
      })

      describe('submitToApi is succesful', () => {
        it('should set submitted to true', () => {
          const apiPromise = Promise.resolve({ id: 42 })
          SubmitAPI.prototype.submitToApi = jest.fn(() => apiPromise)

          const wrapper = shallow(<SubmitAPI />)
          wrapper.instance().onSubmit({}, { setSubmitting: () => {} })

          return apiPromise.then(() => {
            expect(wrapper.state('submitted')).toEqual(true)
            expect(wrapper.state('responseData')).toEqual({ id: 42 })
          })
        })
      })

      describe('submitToApi is unsuccessful', () => {
        it('should call the setStatus action', () => {
          const apiPromise = Promise.reject(
            new Error('arbitrary reject reason coming from tests'),
          )
          SubmitAPI.prototype.submitToApi = jest.fn(() => apiPromise)

          const wrapper = shallow(<SubmitAPI />)

          const actions = {
            setSubmitting: jest.fn(),
            setStatus: jest.fn(),
          }

          return wrapper
            .instance()
            .onSubmit({}, actions)
            .then(() => {
              expect(actions.setStatus).toHaveBeenCalled()
            })
        })
      })
    })
  })
})
