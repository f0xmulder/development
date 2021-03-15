// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import {
  filters,
  formatOptions,
  facetsContainTermsForFilterByKey,
} from './APIFilters'

describe('formatting API terms to options', () => {
  it('should format terms to options', () => {
    const apiTypeFilter = filters.find((filter) => filter.key === 'api_type')
    const organizationFilter = filters.find(
      (filter) => filter.key === 'organization_oin',
    )
    /* eslint-disable camelcase */
    const testCases = [
      {
        facets: {
          organization_oin: {
            terms: [],
          },
        },
        filter: organizationFilter,
        expected: [],
      },
      {
        facets: {
          organization_oin: {
            terms: [
              {
                term: '00000001001589623000',
                display_name: 'MijnBV',
                count: 5,
              },
            ],
          },
        },
        filter: organizationFilter,
        expected: [
          {
            value: '00000001001589623000',
            label: 'MijnBV',
            count: 5,
            disabled: false,
          },
        ],
      },
      {
        facets: {
          api_type: {
            terms: [
              { term: 'grpc', count: 5 },
              { term: 'graphql', count: 0 },
            ],
          },
        },
        filter: apiTypeFilter,
        expected: [
          { value: 'grpc', label: 'gRPC', count: 5, disabled: false },
          { value: 'graphql', label: 'GraphQL', count: 0, disabled: true },
        ],
      },
    ]
    /* eslint-enable camelcase */

    testCases.forEach((testCase) => {
      const actual = formatOptions(testCase.facets, testCase.filter)
      expect(actual).toEqual(testCase.expected)
    })
  })
})

describe('check if facets contains terms for a filter', () => {
  it('should return a boolean', () => {
    const testCases = [
      {
        // eslint-disable-next-line camelcase
        facets: { organization_oin: { terms: [] } },
        filter: 'organization_oin',
        expected: false,
      },
      {
        // eslint-disable-next-line camelcase
        facets: { organization_oin: { terms: [{ term: 'foo', count: 1 }] } },
        filter: 'organization_oin',
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
