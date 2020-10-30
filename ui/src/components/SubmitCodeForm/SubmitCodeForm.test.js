// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import React from 'react'
import { shallow } from 'enzyme'
import SubmitCodeForm from './SubmitCodeForm'

describe('SubmitCodeForm', () => {
  let wrapper

  beforeAll(() => {
    wrapper = shallow(<SubmitCodeForm />)
  })

  it('should exist', () => {
    expect(wrapper.exists()).toEqual(true)
  })
})
