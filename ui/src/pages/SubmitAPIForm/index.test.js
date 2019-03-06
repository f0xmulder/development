import React from 'react'
import { shallow } from 'enzyme'
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

  it('has a non-submitted state when loaded', () => {
    expect(wrapper.state('submitted')).toBe(false)
  })
})
