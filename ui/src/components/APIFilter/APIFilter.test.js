import React from 'react'
import APIFilter from './APIFilter'
import { shallow } from 'enzyme/build'

const generateOptions = (values) =>
  values.map((value) => ({
    value: value,
    label: value,
    count: 1,
    disabled: false,
  }))

describe('APIFilter', () => {
  let wrapper

  beforeAll(() => {
    wrapper = shallow(
      <APIFilter title="the title" name="MyFilter" options={[]} value={[]} />,
    )
  })

  it('should show its heading', () => {
    expect(wrapper.find('h2').text()).toEqual('the title')
  })

  describe('less than three options in the filter', () => {
    it('should show the filters without an Expandable component', () => {
      const options = generateOptions(['42'])
      wrapper.setProps({ options })
      expect(wrapper.find('Expandable').exists()).toBe(false)
    })
  })

  describe('more than three options in the filter', () => {
    it('should show the filters in an Expandable component', () => {
      const options = generateOptions(['42', '43', '44', '45'])
      wrapper.setProps({ options })
      expect(wrapper.find('Expandable').exists()).toBe(true)
    })
  })
})
