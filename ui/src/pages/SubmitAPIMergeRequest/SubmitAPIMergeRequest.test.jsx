import React from 'react'
import { shallow } from 'enzyme'
import SubmitAPIMergeRequest from './SubmitAPIMergeRequest'

test('should render', () => {
  const wrapper = shallow(<SubmitAPIMergeRequest />)
  expect(wrapper.exists()).toBe(true)
})
