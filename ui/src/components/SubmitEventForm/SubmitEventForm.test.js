// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import React from 'react'
import { shallow } from 'enzyme'
import SubmitEventForm from './SubmitEventForm'

describe('SubmitEventForm', () => {
  let wrapper

  beforeAll(() => {
    wrapper = shallow(<SubmitEventForm />)
  })

  it('should exist', () => {
    expect(wrapper.exists()).toEqual(true)
  })
})
