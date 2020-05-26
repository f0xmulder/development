// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
export const formDataMock = {
  serviceName: 'service name',
  organizationName: 'organization name',
  description: 'description',
  apiType: 'rest_json',
  apiAuthentication: 'none',
  isBasedOnReferenceImplementation: false,
  referenceImplementation: '',

  productionApiUrl: 'api url',
  productionSpecificationUrl: 'specification url',
  productionDocumentationUrl: 'documentation url',

  hasAcceptanceEnvironment: false,
  acceptanceApiUrl: '',
  acceptanceDocumentationUrl: '',
  acceptanceSpecificationUrl: '',

  hasDemoEnvironment: false,
  demoApiUrl: '',
  demoDocumentationUrl: '',
  demoSpecificationUrl: '',

  termsOfUse: {
    governmentOnly: false,
    payPerUse: false,
    uptimeGuarantee: 99.9,
    supportResponseTime: 'asap',
  },
  contact: {
    email: '',
    phone: '',
    url: '',
  },
}

export const submitDataMock = {
  /* eslint-disable camelcase */
  service_name: 'service name',
  organization_name: 'organization name',
  description: 'description',
  api_type: 'rest_json',
  api_authentication: 'none',
  environments: [
    {
      name: 'production',
      api_url: 'api url',
      specification_url: 'specification url',
      documentation_url: 'documentation url',
    },
  ],
  terms_of_use: {
    government_only: false,
    pay_per_use: false,
    uptime_guarantee: 99.9,
    support_response_time: 'asap',
  },
  contact: {
    email: '',
    phone: '',
    url: '',
  },
  /* eslint-enable camelcase */
}
