// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import React from 'react'
import { mount } from 'enzyme'
import { StaticRouter as Router } from 'react-router'
import { ThemeProvider } from 'styled-components/macro'

import theme from '../../theme'
import { APIType, APIAuthentication, EnvironmentType } from '../../models/enums'
import { renderWithProviders, screen } from '../../test-helpers'
import APIDetails, { referenceImplementationsFromRelations } from './APIDetails'

const details = {
  id: 'organization-service',
  description: 'Description',
  organizationName: 'Organization Name',
  serviceName: 'Service Name',
  apiType: APIType.SOAP_XML,
  apiAuthentication: APIAuthentication.MUTUAL_TLS,
  badges: ['Golden API', 'Well-written docs'],
  environments: [
    {
      name: EnvironmentType.PRODUCTION,
      apiUrl: 'API URL',
      specificationUrl: 'Specification URL',
      documentationUrl: 'Documentation URL',
    },
  ],
  termsOfUse: {
    governmentOnly: true,
    payPerUse: false,
    uptimeGuarantee: 99.9,
    supportResponseTime: 2,
  },
  scores: {
    hasDocumentation: true,
    hasSpecification: false,
    hasContactDetails: false,
    providesSla: false,
  },
  designRuleScores: {
    results: [
      {
        name: 'API-16: Use OAS 3.0 for documentation',
        description:
          'Publish specifications (documentation) as Open API Specification (OAS) 3.0 or higher.',
        url: 'http://example.com/rule1',
        success: false,
        errors: ['There is no openapi version found'],
      },
      {
        name: 'API-20: Include the major version number only in the URI',
        description:
          'The URI of an API should include the major version number only. The minor and patch version numbers are in the response header of the message. Minor and patch versions have no impact on existing code, but major version do.',
        url: 'http://example.com/rule2',
        success: true,
        errors: [],
      },
    ],
  },
  totalScore: {
    points: 1,
    maxPoints: 4,
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
    expect(wrapper.text()).toContain('SOAP/XML')
    expect(wrapper.text()).toContain('Mutual TLS')
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
})

describe('APIDetails scores', () => {
  it('renders the Design Rule score if it is provided', () => {
    renderWithProviders(
      <Router location="/apis/organization-service">
        <APIDetails {...details} />
      </Router>,
    )

    expect(screen.getByText('Design Rule score')).toBeTruthy()
    expect(screen.queryByText('API score')).toBeNull()
  })

  it('renders the API score otherwise', () => {
    const testDetails = {
      ...details,
      designRuleScores: null,
    }

    renderWithProviders(
      <Router location="/apis/organization-service">
        <APIDetails {...testDetails} />
      </Router>,
    )

    expect(screen.getByText('API score')).toBeTruthy()
    expect(screen.queryByText('Design Rule score')).toBeNull()
  })

  describe('/score-detail route', () => {
    it('renders the API Design Rule Pane if the Design Rule scores are provided', () => {
      renderWithProviders(
        <Router location="/apis/organization-service/score-detail">
          <APIDetails {...details} />
        </Router>,
      )

      expect(screen.getByTestId('design-rules-pane')).toBeTruthy()
      expect(screen.queryByTestId('scores-pane')).toBeNull()
    })

    it('renders the API Scores Pane otherwise', () => {
      const testDetails = {
        ...details,
        designRuleScores: null,
      }

      renderWithProviders(
        <Router location="/apis/organization-service/score-detail">
          <APIDetails {...testDetails} />
        </Router>,
      )

      expect(screen.getByTestId('scores-pane')).toBeTruthy()
      expect(screen.queryByTestId('design-rules-pane')).toBeNull()
    })
  })
})
