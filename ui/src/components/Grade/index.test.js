import {shallow} from "enzyme/build";
import Grade from "./index"
import React from "react";

const testCases = [
    { scores: { "has_documentation": true, "has_specification": false, "has_contact_details": false, "provides_sla": false }, grade: '2.5' },
    { scores: { "has_documentation": true, "has_specification": true, "has_contact_details": false, "provides_sla": true }, grade: '7.5' },
    { scores: { "has_documentation": true, "has_specification": false, "has_contact_details": true, "provides_sla": false }, grade: '5' }
]

describe('Grade', () => {
    let wrapper

    it('should display the correct score', () => {
        testCases.forEach((testCase) => {
            wrapper = shallow(<Grade scores={testCase.scores} />)
            expect(wrapper.text()).toBe(testCase.grade)
        })
    })
})
