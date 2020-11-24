// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import React from 'react'
import { shallow } from 'enzyme/build'
import Grade from './Grade'
import { gradeToColor } from './Grade.styles'

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

describe('convert grade to color', () => {
  it('should be green for grades >= 8', () => {
    expect(gradeToColor(8)).toEqual('#63D19E')
  })

  it('should be orange for grades >= 5', () => {
    expect(gradeToColor(5)).toEqual('#FEBF24')
  })

  it('should be red for grades < 5', () => {
    expect(gradeToColor(4.9)).toEqual('#F94747')
  })
})
