import React from 'react'
import { shallow } from 'enzyme'
import SubmitAPI from './index'
import { Formik } from 'formik'

describe('SubmitAPI', () => {
  afterEach(() => jest.clearAllMocks())

  it('contains the page title', () => {
    const wrapper = shallow(<SubmitAPI/>)
    expect(wrapper.find('h1').exists()).toBe(true)
  })

  describe('on initialization', () => {
    const wrapper = shallow(<SubmitAPI/>)

    it('contains a form', () => {
      const form = wrapper.find(Formik)
      expect(form.exists()).toBe(true)
    })

    it('has a non-submitted state when loaded', () => {
      expect(wrapper.state('submitted')).toBe(false)
    })
  })

  describe('when component state is submitted', () => {
    const wrapper = shallow(<SubmitAPI/>)
    wrapper.setState({ submitted: true, responseData: { id: 1, web_url: 'http://gitlab.com/issues/1' } })

    it('should display the success message', () => {
      const apiSubmittedMessage = wrapper.find('[data-test="api-submitted-message"]')
      expect(apiSubmittedMessage.exists()).toBe(true)
    })

    it('should show the link to the issue', () => {
      const apiSubmittedMessage = wrapper.find('a[href="http://gitlab.com/issues/1"]')
      expect(apiSubmittedMessage.exists()).toBe(true)
    })
  })

  describe('when submit event on form is triggered', () => {
    it('should call the onSubmit function', () => {
      const onSubmitSpy = jest.spyOn(SubmitAPI.prototype, 'onSubmit')
      const wrapper = shallow(<SubmitAPI/>)

      const form = wrapper.find(Formik)
      form.simulate('submit')

      expect(onSubmitSpy).toHaveBeenCalled()
    })
  })

  describe('when onSubmit is called', () => {
    it('should call the submitToApi method', () => {
      const submitToApiSpy = jest.spyOn(SubmitAPI.prototype, 'submitToApi')
      const wrapper = shallow(<SubmitAPI/>)
      wrapper.instance().onSubmit()

      expect(submitToApiSpy).toHaveBeenCalled()
    })

    describe('submitToApi is succesful', () => {
      it('should set submitted to true', () => {
        const apiPromise = Promise.resolve({id: 42})
        SubmitAPI.prototype.submitToApi = jest.fn(() => apiPromise)

        const wrapper = shallow(<SubmitAPI/>)
        wrapper.instance().onSubmit({}, { setSubmitting: () => {}})

        return apiPromise
          .then(() => {
            expect(wrapper.state('submitted')).toEqual(true)
            expect(wrapper.state('responseData')).toEqual({id: 42})
          })
      })
    })

    describe('submitToApi is unsuccesful', () => {
      it('should call the setStatus action', () => {
        const apiPromise = Promise.reject('arbitrary reject reason coming from tests')
        SubmitAPI.prototype.submitToApi = jest.fn(() => apiPromise)

        const wrapper = shallow(<SubmitAPI/>)

        const actions = {
          setSubmitting: jest.fn(),
          setStatus: jest.fn()
        }

        return wrapper.instance().onSubmit({}, actions)
          .then(() => {
            expect(actions.setStatus).toHaveBeenCalled()
          })
      })
    })
  })
})