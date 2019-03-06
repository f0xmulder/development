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
