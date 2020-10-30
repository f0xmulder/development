// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import React from 'react'
import { shallow } from 'enzyme'
import CodeOverview from './CodeOverview'

describe('CodeOverview', () => {
  it('should exist', () => {
    const wrapper = shallow(<CodeOverview />)
    expect(wrapper.exists()).toEqual(true)
  })
})
