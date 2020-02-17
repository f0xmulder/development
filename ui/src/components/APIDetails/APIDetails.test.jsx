import React from 'react'
import { shallow } from 'enzyme'

import APIDetails, { referenceImplementationsFromRelations } from './APIDetails'

const details = {
  id: 'organization-service',
  description: 'Description',
  organizationName: 'Organization Name',
  serviceName: 'Service Name',
  apiType: 'API Type',
  apiAuthentication: 'API Authentication',
  badges: ['Golden API', 'Well-written docs'],
  environments: [
    {
      name: 'Productie',
      apiUrl: 'API URL',
      specificationUrl: 'Specification URL',
      documentationUrl: 'Documentation URL',
    },
  ],
  termsOfUse: {
    governmentOnly: true,
    payPerUse: false,
    uptimeGuarantee: 99.9,
    supportResponseTime: '2 days',
  },
  scores: {
    hasDocumentation: true,
    hasSpecification: false,
    hasContactDetails: false,
    providesSla: false,
  },
  apiDesignRules: [
    {
      id: 'API-03',
      title: 'API-03: Only apply default HTTP operations',
      description:
        'A RESTful API is an application programming interface that supports the default HTTP operations GET, PUT, POST, PATCH and DELETE.',
      link: 'https://docs.geostandaarden.nl/api/API-Designrules/#api-03',
      compliant: true,
    },
    {
      id: 'API-04',
      title:
        'API-04: Define interfaces in Dutch unless there is an official English glossary',
      description:
        'Define resources and the underlying entities, fields and so on (the information model ad the external interface) in Dutch. English is allowed in case there is an official English glossary.',
      link: 'https://docs.geostandaarden.nl/api/API-Designrules/#api-04',
      compliant: true,
    },
  ],
}

const detailsWithMultipleEnvironments = {
  description: 'Description',
  organizationName: 'Organization Name',
  serviceName: 'Service Name',
  apiType: 'API Type',
  badges: ['Golden API', 'Well-written docs'],
  environments: [
    {
      name: 'Productie',
      apiUrl: 'API URL',
      specificationUrl: 'Specification URL',
      documentationUrl: 'Documentation URL',
    },
    {
      name: 'Acceptance',
      apiUrl: 'API URL',
      specificationUrl: 'Specification URL',
      documentationUrl: 'Documentation URL',
    },
    {
      name: 'Demo',
      apiUrl: 'API URL',
      specificationUrl: 'Specification URL',
      documentationUrl: 'Documentation URL',
    },
  ],
  termsOfUse: {
    governmentOnly: true,
    payPerUse: false,
    uptimeGuarantee: 99.9,
    supportResponseTime: '2 days',
  },
  scores: {
    hasDocumentation: true,
    hasSpecification: false,
    hasContactDetails: false,
    providesSla: false,
  },
}

describe('referenceImplementationsFromRelations', () => {
  it('should return the API ids for its reference implementations', () => {
    const result = referenceImplementationsFromRelations({
      'an-api': ['reference-implementation'],
      'another-api': [],
    })

    expect(result).toEqual(['an-api'])
  })
})

describe('APIDetails', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<APIDetails {...details} />)
  })

  it('should show the description', () => {
    const description = wrapper.find('p')
    expect(description.text()).toBe('Description')
  })

  describe('api type', () => {
    it('should show the api type', () => {
      const apiSpecType = wrapper.find('[data-test="api-type"]')
      expect(apiSpecType.text()).toBe('API Type')
    })
  })

  describe('api authentication', () => {
    it('should show the api authentication', () => {
      const apiAuthentication = wrapper.find('[data-test="api-authentication"]')
      expect(apiAuthentication.text()).toBe('API Authentication')
    })
  })

  describe('environments table', () => {
    it('should show the API URL', () => {
      const apiUrl = wrapper.find('[data-test="api-url"]')

      expect(apiUrl.prop('href')).toBe('API URL')
    })

    it('should link to the specification page', () => {
      const apiSpecUrl = wrapper.find('[data-test="api-specification-url"]')
      expect(apiSpecUrl.prop('to')).toBe(
        `/detail/${
          details.id
        }/${details.environments[0].name.toLowerCase()}/specificatie`,
      )
    })

    describe('documentation', () => {
      it('should show a link to the documentation url', () => {
        const documentationUrl = wrapper.find(
          '[data-test="api-documentation-url"]',
        )
        expect(documentationUrl.prop('href')).toBe('Documentation URL')
      })
    })

    it('should have a single row for the production environment', () => {
      const tableBody = wrapper.find('[data-test="environments-table-body"]')

      expect(tableBody.children()).toHaveLength(1)
    })

    it('should show a row for the each environment', () => {
      wrapper = shallow(<APIDetails {...detailsWithMultipleEnvironments} />)
      const tableBody = wrapper.find('[data-test="environments-table-body"]')

      expect(tableBody.children()).toHaveLength(3)
    })
  })

  describe('API Design Rules', () => {
    let designRules
    let designRulesList

    const DESIGN_RULES_SELECTOR = '[data-test="api-design-rules"]'
    const DESIGN_RULES_LIST_SELECTOR = '[data-test="api-design-rules-list"]'

    beforeEach(() => {
      designRules = wrapper.find(DESIGN_RULES_SELECTOR)
      designRulesList = wrapper.find(DESIGN_RULES_LIST_SELECTOR)
    })

    it('should show the API Design Rules', () => {
      expect(designRules.exists()).toBe(true)
    })

    it('should display every design rule', () => {
      expect(designRulesList.children()).toHaveLength(2)
    })

    describe('when there are no design rules', () => {
      beforeEach(() => {
        wrapper.setProps({ apiDesignRules: null })
      })

      it('should hide the design rules', () => {
        expect(wrapper.find(DESIGN_RULES_SELECTOR).exists()).toBe(false)
      })
    })
  })

  describe('badges', () => {
    let badges
    let badgesList

    const BADGES_SELECTOR = '[data-test="api-badges"]'
    const BADGES_LIST_SELECTOR = '[data-test="api-badges-list"]'

    beforeEach(() => {
      badges = wrapper.find(BADGES_SELECTOR)
      badgesList = wrapper.find(BADGES_LIST_SELECTOR)
    })

    it('should show the badges', () => {
      expect(badges.exists()).toBe(true)
    })

    it('should display every badge', () => {
      expect(badgesList.children()).toHaveLength(2)
    })

    describe('when the API has no badges', () => {
      beforeEach(() => {
        wrapper.setProps({ badges: null })
      })

      it('should hide the badges', () => {
        expect(wrapper.find(BADGES_SELECTOR).exists()).toBe(false)
      })
    })
  })

  describe('terms of use', () => {
    it('should display the terms of use', () => {
      const termsOfUse = wrapper.find('[data-test="api-terms-of-use"]')
      expect(termsOfUse.exists()).toBe(true)
    })
  })

  describe('scores', () => {
    it('should display the scores', () => {
      const scores = wrapper.find('[data-test="api-scores"]')
      expect(scores.exists()).toBe(true)
    })
  })
})
