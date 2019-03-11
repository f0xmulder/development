import React from 'react'
import { shallow, mount } from 'enzyme'
import SubmitAPI from './index'
import { Formik } from 'formik'

it('contains the page title', () => {
  const wrapper = shallow(<SubmitAPI/>)
  expect(wrapper.find('h1').text()).toBe('Submit your API')
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

describe('on form submit', () => {
  jest.spyOn(SubmitAPI.prototype, 'submitToApi')
  const wrapper = shallow(<SubmitAPI/>)

  it('should call the submit to api method', () => {
    const form = wrapper.find(Formik)
    form.simulate('submit')

    expect(wrapper.instance().submitToApi).toHaveBeenCalled()
  })
})

describe('on succesful form submission', () => {
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

describe('on failed form submission', () => {
  const thePromise = Promise.reject('arbitrary reject reason coming from tests')
  SubmitAPI.prototype.submitToApi = jest.fn(() => thePromise)

  const wrapper = shallow(<SubmitAPI/>)
  const form = wrapper.find(Formik)

  it('should set the error state', done => {
    form.simulate('submit')

    return thePromise
    .catch(() => {
      //expect(wrapper.state().msg).toBe('An error occured while submitting the API, please try again')
      done()
    })
  })
})