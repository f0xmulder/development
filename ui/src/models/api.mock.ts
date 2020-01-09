import { GoApi, Api } from './apiTypes'

export const goApiMock: GoApi = {
  /* eslint-disable @typescript-eslint/camelcase */
  id: 'id',
  service_name: 'service name',
  organization_name: 'organization name',
  description: 'description',
  api_url: 'api url',
  api_type: 'api type',
  specification_url: 'specification url',
  documentation_url: 'documentation url',
  badges: [],
  is_reference_implementation: true,
  relations: {
    x: ['y'],
  },
  terms_of_use: {
    government_only: false,
    pay_per_use: false,
    uptime_guarantee: 99.9,
    support_response_time: 'asap',
  },
  tags: ['tag1', 'tag2'],
  scores: {
    has_documentation: false,
    has_specification: false,
    has_contact_details: false,
    provides_sla: false,
  },
  /* eslint-enable @typescript-eslint/camelcase */
}

export const apiMock: Api = {
  id: 'id',
  serviceName: 'service name',
  organizationName: 'organization name',
  description: 'description',
  apiUrl: 'api url',
  apiType: 'api type',
  specificationUrl: 'specification url',
  documentationUrl: 'documentation url',
  badges: [],
  tags: ['tag1', 'tag2'],
  isReferenceImplementation: true,
  relations: {
    x: ['y'],
  },
  termsOfUse: {
    governmentOnly: false,
    payPerUse: false,
    uptimeGuarantee: 99.9,
    supportResponseTime: 'asap',
  },
  scores: {
    hasDocumentation: false,
    hasSpecification: false,
    hasContactDetails: false,
    providesSla: false,
  },
}
