import React from "react";
import {shallow} from "enzyme/build";
import Grade, {calculateGrade} from "./index"

describe('Grade', () => {
    it('should display the calculated score', () => {
      const scores = {
        "has_documentation": true,
        "has_specification": true,
        "has_contact_details": true,
        "provides_sla": true
      }
      const wrapper = shallow(<Grade scores={scores} />)
      expect(wrapper.text()).toBe('10')
    })
})

describe('calculating the grade from scores', () => {
  it('should equal the amount of scores with value true on the total amount of scores', () => {
    const testCases = [
      {scores: {"foo": true }, grade: 10},
      {scores: {"foo": true, "bar": false }, grade: 5},
      {scores: {"foo": true, "bar": false, "baz": false, "foobar": false }, grade: 2.5}
    ]

    
    testCases.forEach(({scores, grade}) => {
      expect(calculateGrade(scores)).toBe(grade)
    })
  })
})

