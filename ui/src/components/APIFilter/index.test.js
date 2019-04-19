import React from 'react'
import {mount} from 'enzyme'
import APIFilter from './index'
import CheckboxField from '../CheckboxField';

const filters = [
    { key: 'tags', label: 'Tags' },
    { key: 'organization_name', label: 'Organisatie' },
    { key: 'api_specification_type', label: 'API type' },
]

const facets = {
    tags: { terms: [ { term: '41', count: 5}, { term: '42', count: 100 } ]},
    organization_name: { terms: [ { term: 'VNG', count: 10} ]},
    api_specification_type: { terms: [ { term: 'OAS2', count: 5}, { term: 'OAS3', count: 75 } ]}
}

describe('APIFilter', () => {
    it('should show the filter headings', () => {
        const onSubmit = jest.fn()
        const wrapper = mount(
            <APIFilter
                initialValues={{ tags: [], organization_name: [], api_specification_type: [] }}
                facets={facets}
                onSubmit={onSubmit}
            />
        )

        filters.forEach((filter, i) => {
            expect(wrapper.find('h2').at(i).text()).toEqual(filter.label)
        })
    })

    it('should format the options for CheckBoxField in the correct way', () => {
        const onSubmit = jest.fn()
        const wrapper = mount(
            <APIFilter
                initialValues={{ tags: [], organization_name: [], api_specification_type: [] }}
                facets={facets}
                onSubmit={onSubmit}
            />
        )

        const firstField = wrapper.find(CheckboxField).first()
        const expectedOptions = [
            { value: '41', label: '41 (5)', disabled: false },
            { value: '42', label: '42 (100)', disabled: false }
        ]

        expect(firstField.props().options).toEqual(expectedOptions)
    })
})