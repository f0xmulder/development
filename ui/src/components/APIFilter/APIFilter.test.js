import React from 'react'
import APIFilter from './APIFilter'
import { shallow } from 'enzyme/build'

const generateOptions = (values) =>
  values.map((value) => ({
    value: value.toString(),
    label: value.toString(),
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

  describe('twenty or less options in the filter', () => {
    it('should show the filters without an Expandable component', () => {
      const options = generateOptions(Array(20).fill(20))
      wrapper.setProps({ options })
      expect(wrapper.find('Expandable').exists()).toBe(false)
    })
  })

  describe('more than twenty options in the filter', () => {
    it('should show the filters in an Expandable component', () => {
      const options = generateOptions(Array(21).fill(21))
      wrapper.setProps({ options })
      expect(wrapper.find('Expandable').exists()).toBe(true)
    })
  })
})
