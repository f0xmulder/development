// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import React from 'react'
import { shallow } from 'enzyme'
import APIOverview from './APIOverview'
import { StyledOverviewPage } from './APIOverview.styles'

describe('APIOverview', () => {
  it('should exist', () => {
    const wrapper = shallow(<APIOverview />)
    expect(wrapper.find(StyledOverviewPage).exists()).toBe(true)
  })
})
