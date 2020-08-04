// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import React from 'react'
import { shallow } from 'enzyme'
import EventOverview from './EventOverview'

describe('EventOverview', () => {
  it('should exist', () => {
    const wrapper = shallow(<EventOverview />)
    expect(wrapper.exists()).toEqual(true)
  })
})
