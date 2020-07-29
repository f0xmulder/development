// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//

import { EnvironmentType, APIType, APIAuthentication } from './enums'

export const goApiMock = {
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
  api_design_rules: [
    {
      id: 'API-01',
      title: 'API-01: First API Design Rule',
      description: 'Description of first API Design Rule',
      link: 'https://docs.geostandaarden.nl/api/API-Designrules/#api-01',
      compliant: true,
    },
  ],
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
  apiDesignRules: [
    {
      id: 'API-01',
      title: 'API-01: First API Design Rule',
      description: 'Description of first API Design Rule',
      link: 'https://docs.geostandaarden.nl/api/API-Designrules/#api-01',
      compliant: true,
    },
  ],
}
