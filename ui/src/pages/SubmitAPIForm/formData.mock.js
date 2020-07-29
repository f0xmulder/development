// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
export const rawFormDataMock = {
  serviceName: 'service name',
  organizationName: 'organization name',
  description: ' description ',
  apiType: 'rest_json',
  apiAuthentication: 'none',
  isBasedOnReferenceImplementation: 'false',
  referenceImplementation: '',

  productionApiUrl: 'http://api.url',
  productionSpecificationUrl: 'http://specification.url',
  productionDocumentationUrl: 'http://documentation.url',

  hasAcceptanceEnvironment: 'false',
  acceptanceApiUrl: '',
  acceptanceDocumentationUrl: '',
  acceptanceSpecificationUrl: '',

  hasDemoEnvironment: 'false',
  demoApiUrl: '',
  demoDocumentationUrl: '',
  demoSpecificationUrl: '',

  termsOfUse: {
    governmentOnly: false,
    payPerUse: false,
    uptimeGuarantee: 99.9,
    supportResponseTime: 1,
  },
  contact: {
    email: '',
    phone: '',
    url: '',
  },
}

export const parsedFormDataMock = {
  ...rawFormDataMock,
  description: 'description',
  isBasedOnReferenceImplementation: false,
  hasAcceptanceEnvironment: false,
  hasDemoEnvironment: false,
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
      api_url: 'http://api.url',
      specification_url: 'http://specification.url',
      documentation_url: 'http://documentation.url',
    },
  ],
  terms_of_use: {
    government_only: false,
    pay_per_use: false,
    uptime_guarantee: 99.9,
    support_response_time: 1,
  },
  contact: {
    email: '',
    phone: '',
    url: '',
  },
  /* eslint-enable camelcase */
}
