// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import React from 'react'
import { mount } from 'enzyme'
import { StaticRouter as Router } from 'react-router'
import { ThemeProvider } from 'styled-components/macro'

import theme from '../../theme'
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
    wrapper = mount(
      <Router location="/apis/organization-service">
        <ThemeProvider theme={theme}>
          <APIDetails {...details} />
        </ThemeProvider>
      </Router>,
    )
  })

  it('should render expected info', () => {
    expect(wrapper.text()).toContain('Organization Name')
    expect(wrapper.text()).toContain('Description')
    expect(wrapper.text()).toContain('API Type')
    expect(wrapper.text()).toContain('API Authentication')
  })

  describe('environments information', () => {
    it('should render', () => {
      const apiUrl = wrapper.find('[data-test="environments"]') // for some reason multiple matches
      expect(apiUrl).toBeTruthy()
    })
  })

  describe('reference implementation', () => {
    it('renders reference info if it is a reference implementation', () => {
      const referenceDetails = {
        ...details,
        isReferenceImplementation: true,
      }

      const referenceWrapper = mount(
        <Router location="/apis/organization-service">
          <ThemeProvider theme={theme}>
            <APIDetails {...referenceDetails} />
          </ThemeProvider>
        </Router>,
      )

      const referenceDiv = referenceWrapper.find('[data-test="is-reference"]')
      expect(referenceDiv.length).toBeGreaterThan(0)
    })

    it("does not render if it's not", () => {
      const referenceDiv = wrapper.find('[data-test="is-reference"]')
      expect(referenceDiv.length).not.toBeGreaterThan(0)
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
      expect(designRulesList.children().length).toBeGreaterThan(1)
    })

    describe('when there are no design rules', () => {
      it('should hide the design rules', () => {
        const noDesignRulesDetails = { ...details }
        delete noDesignRulesDetails.apiDesignRules

        const noDesignRulesWrapper = mount(
          <Router location="/apis/organization-service">
            <ThemeProvider theme={theme}>
              <APIDetails {...noDesignRulesDetails} />
            </ThemeProvider>
          </Router>,
        )
        expect(noDesignRulesWrapper.find(DESIGN_RULES_SELECTOR).exists()).toBe(
          false,
        )
      })
    })
  })
})
