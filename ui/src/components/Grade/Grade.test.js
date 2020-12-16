// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import React from 'react'
import { shallow } from 'enzyme/build'
import Grade from './Grade'

describe('Grade', () => {
  it('should display the calculated score', () => {
    const totalScore = {
      points: 5,
      maxPoints: 7,
    }
    const wrapper = shallow(<Grade totalScore={totalScore} />)
    expect(wrapper.text()).toBe('5/7')
  })
})
