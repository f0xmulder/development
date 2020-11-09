// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import React from 'react'
import { shallow } from 'enzyme'
import { Formik } from 'formik'

import { goApiMock } from '../../models/api.mock'
import { flushPromises } from '../../test-helpers'
import { modelFromAPIResponse } from '../../models/api'
import {
  rawFormDataMock,
  parsedFormDataMock,
  submitDataMock,
} from './formData.mock'

import SubmitAPI, {
  createRelation,
  convertFormDataToRequestBody,
} from './SubmitAPIForm'

describe('createRelation', () => {
  it('should not create a relation object when it is not based on a reference implementation', () => {
    const result = createRelation(false, undefined)
    expect(result).toBeUndefined()
  })

  it('should create a relation object when this has a link to a referenceImplementation', () => {
    const result = createRelation(true, 'dummy-api-id')
    expect(result).toEqual({
      'dummy-api-id': ['reference-implementation'],
    })
  })
})

describe('map form values to API request body for submitting an API', () => {
  it('should map the values from camelBack notation to snake_case', () => {
    const submitData = JSON.parse(JSON.stringify(submitDataMock))
    delete submitData.id

    expect(convertFormDataToRequestBody(parsedFormDataMock)).toEqual(submitData)
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
    it('should store (only) the available apis as state', async () => {
      const apiPromise = Promise.resolve({
        total: 1,
        page: 1,
        results: [goApiMock],
      })
      SubmitAPI.prototype.fetchApiList = jest.fn(() => apiPromise)

      const wrapper = shallow(<SubmitAPI />)

      await flushPromises()
      expect(wrapper.state('result')).toEqual({
        apis: [modelFromAPIResponse(goApiMock)],
      })
    })
  })

  describe("when the API's are loaded", () => {
    let wrapper
    let submitToApiSpy

    beforeEach(() => {
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
    })

    describe('when handleSubmit is called', () => {
      it('should call the submitToApi method', () => {
        wrapper.instance().handleSubmit(rawFormDataMock, {
          setSubmitting: jest.fn(),
          setStatus: jest.fn(),
        })
        expect(submitToApiSpy).toHaveBeenCalled()
      })

      describe('submitToApi is succesful', () => {
        it('should set submitted to true', async () => {
          const apiPromise = Promise.resolve({ id: 42 })
          SubmitAPI.prototype.submitToApi = jest.fn(() => apiPromise)

          const wrapper = shallow(<SubmitAPI />)
          wrapper.instance().handleSubmit(rawFormDataMock, {
            setSubmitting: jest.fn(),
            setStatus: jest.fn(),
          })

          await apiPromise
          expect(wrapper.state('submitted')).toEqual(true)
          expect(wrapper.state('responseData')).toEqual({ id: 42 })
        })
      })

      describe('submitToApi is unsuccessful', () => {
        it('should call the setStatus action', async () => {
          // Suppress error in test console
          global.console.error = jest.fn()

          const apiPromise = Promise.reject(
            new Error('arbitrary reject reason coming from tests'),
          )
          SubmitAPI.prototype.submitToApi = jest.fn(() => apiPromise)

          const wrapper = shallow(<SubmitAPI />)

          const actions = {
            setSubmitting: jest.fn(),
            setStatus: jest.fn(),
          }

          await wrapper.instance().handleSubmit(rawFormDataMock, actions)
          expect(actions.setStatus).toHaveBeenCalled()
        })
      })
    })
  })

  describe('Form data', () => {
    let formWrapper
    const testValue = { organizationName: 'VNG' }

    beforeEach(() => {
      global.sessionStorage.removeItem('storedFormValues')
      formWrapper = shallow(<SubmitAPI />)
      formWrapper.setState({ storedFormValues: testValue })
    })

    it('Should be saved when the component unmounts', () => {
      formWrapper.unmount()

      const storedValue = JSON.parse(
        global.sessionStorage.getItem('storedFormValues'),
      )
      expect(storedValue).toEqual(testValue)
    })

    it('should clear stored values when resetting the form', () => {
      formWrapper.instance().handleReset()
      expect(formWrapper.state('storedFormValues')).toBeNull()
      expect(global.sessionStorage.getItem('storedFormValues')).toBeNull()
    })
  })
})
