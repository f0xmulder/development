// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import { formatOptions, facetsContainTermsForFilterByKey } from './APIFilters'

describe('formatting API terms to options', () => {
  it('should format terms to options', () => {
    const testCases = [
      { terms: [], expected: [] },
      {
        terms: [{ term: '42', count: 5 }],
        expected: [{ value: '42', label: '42', count: 5, disabled: false }],
      },
      {
        terms: [
          { term: 'gRPC', count: 5 },
          { term: 'GraphQL', count: 0 },
        ],
        expected: [
          { value: 'gRPC', label: 'gRPC', count: 5, disabled: false },
          { value: 'GraphQL', label: 'GraphQL', count: 0, disabled: true },
        ],
      },
    ]

    testCases.forEach((testCase) => {
      const actual = formatOptions(testCase.terms)
      expect(actual).toEqual(testCase.expected)
    })
  })
})

describe('check if facets contains terms for a filter', () => {
  it('should return a boolean', () => {
    const testCases = [
      {
        // eslint-disable-next-line camelcase
        facets: { organization_name: { terms: [] } },
        filter: 'organization_name',
        expected: false,
      },
      {
        // eslint-disable-next-line camelcase
        facets: { organization_name: { terms: [{ term: 'foo', count: 1 }] } },
        filter: 'organization_name',
        expected: true,
      },
    ]

    testCases.forEach((testCase) => {
      const actual = facetsContainTermsForFilterByKey(
        testCase.facets,
        testCase.filter,
      )
      expect(actual).toEqual(testCase.expected)
    })
  })
})
