import React from 'react'
import { shallow } from 'enzyme'
import SubmitAPIForm from './index'

describe('SubmitAPIForm', () => {
  let wrapper

  beforeAll(() => {
    wrapper = shallow(<SubmitAPIForm apis={[]} />)
  })

  it('should exist', () => {
    expect(wrapper.exists()).toEqual(true)
  })
})
