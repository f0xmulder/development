export const formDataMock = {
  serviceName: 'service name',
  organizationName: 'organization name',
  description: 'description',
  apiUrl: 'api url',
  apiType: 'api type',
  specificationUrl: 'specification url',
  documentationUrl: 'documentation url',
  badges: '',
  isReferenceImplementation: true,
  referenceImplementation: '',
  termsOfUse: {
    governmentOnly: false,
    payPerUse: false,
    uptimeGuarantee: 99.9,
    supportResponseTime: 'asap',
  },
  tags: 'tag1, tag2',
  contact: {
    email: '',
    phone: '',
    fax: '',
    chat: '',
    url: '',
  },
}

export const submitDataMock = {
  /* eslint-disable camelcase */
  service_name: 'service name',
  organization_name: 'organization name',
  description: 'description',
  api_url: 'api url',
  api_type: 'api type',
  specification_url: 'specification url',
  documentation_url: 'documentation url',
  badges: [],
  is_reference_implementation: true,
  terms_of_use: {
    government_only: false,
    pay_per_use: false,
    uptime_guarantee: 99.9,
    support_response_time: 'asap',
  },
  tags: ['tag1', 'tag2'],
  contact: {
    email: '',
    phone: '',
    fax: '',
    chat: '',
    url: '',
  },
  /* eslint-enable camelcase */
}
