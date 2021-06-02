// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//

import { EnvironmentType, APIType, APIAuthentication } from './enums'

export const backendApiMock = {
  /* eslint-disable camelcase */
  id: 'id',
  service_name: 'service name',
  organization_name: 'organization name',
  description: 'description',
  api_type: 'rest_json',
  api_authentication: 'api_key',
  badges: [],
  environments: [
    {
      name: 'production',
      api_url: 'api url',
      specification_url: 'specification_url',
      documentation_url: 'documentation_url',
    },
  ],
  forum: {
    vendor: 'discourse',
    url: 'https://forum.api',
  },
  is_reference_implementation: true,
  relations: {
    x: ['y'],
  },
  terms_of_use: {
    government_only: false,
    pay_per_use: false,
    uptime_guarantee: 99.9,
    support_response_time: 1,
  },
  scores: {
    has_documentation: false,
    has_specification: false,
    has_contact_details: false,
    provides_sla: false,
  },
  design_rule_scores: {
    results: [
      {
        rule_type_name: 'API-16: Use OAS 3.0 for documentation',
        rule_type_description:
          'Use Open API Specification (OAS) 3.0 or higher.',
        rule_type_url:
          'https://docs.geostandaarden.nl/api/API-Designrules/#api-16-use-oas-3-0-for-documentation',
        success: true,
        errors: null,
      },
      {
        rule_type_name: 'API-48: Leave off trailing slashes from API endpoints',
        rule_type_description: "URIs don't include a trailing slash.",
        rule_type_url:
          'https://docs.geostandaarden.nl/api/API-Designrules/#api-48-leave-off-trailing-slashes-from-api-endpoints',
        success: false,
        errors: [
          'Path: /provider-latest-badge-1/{uuid}/ ends with a slash',
          'Path: /provider-latest-badge-2/{uuid}/ ends with a slash',
        ],
      },
    ],
  },
  /* eslint-enable camelcase */
}

export const designRuleScoresMock = {
  results: [
    {
      name: 'API-16: Use OAS 3.0 for documentation',
      description: 'Use Open API Specification (OAS) 3.0 or higher.',
      url: 'https://docs.geostandaarden.nl/api/API-Designrules/#api-16-use-oas-3-0-for-documentation',
      success: true,
      errors: [],
    },
    {
      name: 'API-48: Leave off trailing slashes from API endpoints',
      description: "URIs don't include a trailing slash.",
      url: 'https://docs.geostandaarden.nl/api/API-Designrules/#api-48-leave-off-trailing-slashes-from-api-endpoints',
      success: false,
      errors: [
        'Path: /provider-latest-badge-1/{uuid}/ ends with a slash',
        'Path: /provider-latest-badge-2/{uuid}/ ends with a slash',
      ],
    },
  ],
}

export const apiMock = {
  id: 'id',
  serviceName: 'service name',
  organizationName: 'organization name',
  description: 'description',
  apiType: APIType.REST_JSON,
  apiAuthentication: APIAuthentication.API_KEY,
  badges: [],
  environments: [
    {
      name: EnvironmentType.PRODUCTION,
      apiUrl: 'api url',
      specificationUrl: 'specification_url',
      documentationUrl: 'documentation_url',
    },
  ],
  forum: {
    vendor: 'discourse',
    url: 'https://forum.api',
  },
  isReferenceImplementation: true,
  relations: {
    x: ['y'],
  },
  termsOfUse: {
    governmentOnly: false,
    payPerUse: false,
    uptimeGuarantee: 99.9,
    supportResponseTime: 1,
  },
  scores: {
    hasDocumentation: false,
    hasSpecification: false,
    hasContactDetails: false,
    providesSla: false,
  },
  designRuleScores: designRuleScoresMock,
  totalScore: {
    points: 1,
    maxPoints: 2,
  },
}
