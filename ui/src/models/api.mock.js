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
        name: 'API-16: Use OAS 3.0 for documentation',
        description: 'Use Open API Specification (OAS) 3.0 or higher.',
        url:
          'https://docs.geostandaarden.nl/api/API-Designrules/#api-16-use-oas-3-0-for-documentation',
        success: true,
        errors: [],
      },
      {
        name: 'API-48: Leave off trailing slashes from API endpoints',
        description: "URIs don't include a trailing slash.",
        url:
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
  /* TODO re-add this
  designRuleScores: {
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
  },
  totalScore: {
    points: 1,
    maxPoints: 2,
  },
  */
  designRuleScores: {
    results: [
      {
        name: 'API-03: Only apply default HTTP operations',
        description:
          'A RESTful API is an application programming interface that supports the default HTTP operations GET, PUT, POST, PATCH and DELETE',
        url:
          'https://docs.geostandaarden.nl/api/API-Designrules/#api-03-only-apply-default-http-operations',
        success: true,
        errors: [],
      },
      {
        name: 'API-09: Implement custom representation if supported',
        description:
          'Provide a comma-separated list of field names using the query parameter fields te retrieve a custom representation. In case non-existent field names are passed, a 400 Bad Request error message is returned.',
        url:
          'https://docs.geostandaarden.nl/api/API-Designrules/#api-09-implement-custom-representation-if-supported',
        success: true,
        errors: [],
      },
      {
        name: 'API-16: Use OAS 3.0 for documentation',
        description:
          'Publish specifications (documentation) as Open API Specification (OAS) 3.0 or higher.',
        url:
          'https://docs.geostandaarden.nl/api/API-Designrules/#api-16-use-oas-3-0-for-documentation',
        success: false,
        errors: ['There is no openapi version found'],
      },
      {
        name: 'API-20: Include the major version number only in the URI',
        description:
          'The URI of an API should include the major version number only. The minor and patch version numbers are in the response header of the message. Minor and patch versions have no impact on existing code, but major version do.',
        url:
          'https://docs.geostandaarden.nl/api/API-Designrules/#api-20-include-the-major-version-number-only-in-ihe-uri',
        success: true,
        errors: [],
      },
      {
        name: 'API-48: Leave off trailing slashes from API endpoints',
        description:
          "URIs to retrieve collections of resources or individual resources don't include a trailing slash. A resource is only available at one endpoint/path. Resource paths end without a slash.",
        url:
          'https://docs.geostandaarden.nl/api/API-Designrules/#api-48-leave-off-trailing-slashes-from-api-endpoints',
        success: false,
        errors: [
          'Path: /provider-latest-badge-1/{uuid}/ ends with a slash',
          'Path: /provider-latest-badge-2/{uuid}/ ends with a slash',
          'Path: /provider-latest-badge-3/{uuid}/ ends with a slash',
          'Path: /provider-latest-badge-4/{uuid}/ ends with a slash',
          'Path: /provider-latest-badge-5/{uuid}/ ends with a slash',
        ],
      },
    ],
  },
  totalScore: {
    points: 3,
    maxPoints: 5,
  },
}
