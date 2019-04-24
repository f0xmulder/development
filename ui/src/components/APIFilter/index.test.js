import React from 'react'
import {mount} from 'enzyme'
import APIFilter from './index'
import CheckboxGroupField from '../CheckboxGroupField';

const filters = [
    { key: 'tags', label: 'Tags' },
    { key: 'organization_name', label: 'Organisatie' },
    { key: 'api_type', label: 'API type' },
]

const facets = {
    tags: { terms: [ { term: '41', count: 5}, { term: '42', count: 100 } ]},
    organization_name: { terms: [ { term: 'VNG', count: 10} ]},
    api_type: { terms: [ { term: 'gRPC', count: 5}, { term: 'GraphQL', count: 75 } ]}
}

describe('APIFilter', () => {
    it('should format API terms as options', () => {
        const testCases = [
            { terms: [], expected: [] },
            { terms: [ { term: '42', count: 5 } ], expected: [ { value: '42', label: '42 (5)', disabled: false }] },
            { terms: [ { term: 'gRPC', count: 5}, { term: 'GraphQL', count: 0 } ], expected: [ { value: 'gRPC', label: 'gRPC (5)', disabled: false }, { value: 'GraphQL', label: 'GraphQL (0)', disabled: true } ] },
        ]

        testCases.forEach((testCase) => {
            const actual = APIFilter.prototype.formatOptions(testCase.terms)
            expect(actual).toEqual(testCase.expected)
        })
    })

    it('should show the filter headings', () => {
        const onSubmit = jest.fn()
        const wrapper = mount(
            <APIFilter
                initialValues={{ tags: [], organization_name: [], api_type: [] }}
                facets={facets}
                onSubmit={onSubmit}
            />
        )

        filters.forEach((filter, i) => {
            expect(wrapper.find('h2').at(i).text()).toEqual(filter.label)
        })
    })

    it('should format the options for CheckboxGroupField in the correct way', () => {
        const onSubmit = jest.fn()
        const wrapper = mount(
            <APIFilter
                initialValues={{ tags: [], organization_name: [], api_type: [] }}
                facets={facets}
                onSubmit={onSubmit}
            />
        )

        const firstField = wrapper.find(CheckboxGroupField).first()
        const expectedOptions = [
            { value: '41', label: '41 (5)', disabled: false },
            { value: '42', label: '42 (100)', disabled: false }
        ]

        expect(firstField.props().options).toEqual(expectedOptions)
    })
})