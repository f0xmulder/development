// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import React from 'react'
import { shallow } from 'enzyme/build'
import Grade, { calculateGrade } from './Grade'
import { gradeToColor } from './Grade.styles'

describe('Grade', () => {
  it('should display the calculated score', () => {
    const scores = {
      hasDocumentation: true,
      hasSpecification: true,
      hasContactDetails: true,
      providesSla: true,
    }
    const wrapper = shallow(<Grade scores={scores} />)
    expect(wrapper.text()).toBe('10/10')
  })
})

describe('calculating the grade from scores', () => {
  it('should equal the amount of scores with value true on the total amount of scores', () => {
    const testCases = [
      { scores: { foo: true }, grade: 10 },
      { scores: { foo: true, bar: false }, grade: 5 },
      {
        scores: { foo: true, bar: false, baz: false, foobar: false },
        grade: 2.5,
      },
    ]

    testCases.forEach(({ scores, grade }) => {
      expect(calculateGrade(scores)).toBe(grade)
    })
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
