import { mount } from 'enzyme/build'
import { Formik } from 'formik'
import CheckboxGroupField from './index'
import React from 'react'
import { ThemeProvider } from 'styled-components'
import theme from '../../theme'

const options = [
  { value: '41', label: '41', count: 1 },
  { value: '42', label: '42', count: 2 },
  { value: '43', label: '43', count: 3 },
]

const createForm = (onChange = () => {}) => {
  return mount(
    <ThemeProvider theme={theme}>
      <Formik initialValues={{ theNumber: ['42'] }}>
        {({ values }) => (
          <CheckboxGroupField
            name="theNumber"
            options={options}
            onChange={onChange}
            value={values.theNumber}
          />
        )}
      </Formik>
    </ThemeProvider>,
  )
}

describe('CheckboxGroupField', () => {
  it('displays the labels', () => {
    const wrapper = createForm()

    options.forEach((option, i) => {
      expect(wrapper.find(`label[htmlFor="theNumber.${i}"]`).text()).toEqual(
        option.label,
      )
    })
  })

  it('unchecks values not included in initialValue', () => {
    const wrapper = createForm()
    const firstInput = wrapper.find(`input[value="41"]`)

    expect(firstInput.getDOMNode().checked).toEqual(false)
  })

  it('checks values included in initialValue', () => {
    const wrapper = createForm()
    const secondInput = wrapper.find(`input[value="42"]`)

    expect(secondInput.getDOMNode().checked).toEqual(true)
  })

  it('triggers onChange when a checkbox is changed', () => {
    return new Promise((done) => {
      const onChange = jest.fn()
      const wrapper = createForm(onChange)

      const firstInput = wrapper.find(`input[value="41"]`)
      firstInput.simulate('change', { target: { checked: true } })

      setTimeout(() => {
        expect(onChange).toHaveBeenCalled()
        done()
      }, 1)
    })
  })

  it('returns the correct value when checked', () => {
    const wrapper = createForm()
    const form = wrapper.find(Formik)

    const firstInput = wrapper.find(`input[value="41"]`)
    firstInput.simulate('change', { target: { checked: true } })

    expect(form.state().values).toEqual({ theNumber: ['41', '42'] })
  })
})
