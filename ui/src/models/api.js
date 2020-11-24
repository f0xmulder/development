// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//

import { APIType, APIAuthentication, EnvironmentType } from './enums'

const mapEnvironments = (environments) =>
  environments.map((env) => {
    return {
      name: EnvironmentType.valueOf(env.name),
      apiUrl: env.api_url,
      specificationUrl: env.specification_url,
      documentationUrl: env.documentation_url,
    }
  })

const mapScores = (scores) =>
  scores
    ? {
        hasDocumentation: scores.has_documentation,
        hasSpecification: scores.has_specification,
        hasContactDetails: scores.has_contact_details,
        providesSla: scores.provides_sla,
      }
    : {}

const mapTermsOfUse = (termsOfUse) => {
  return {
    governmentOnly: termsOfUse.government_only,
    payPerUse: termsOfUse.pay_per_use,
    uptimeGuarantee: isNaN(parseFloat(termsOfUse.uptime_guarantee))
      ? 0
      : parseFloat(termsOfUse.uptime_guarantee),
    supportResponseTime:
      typeof termsOfUse.support_response_time === 'number'
        ? termsOfUse.support_response_time
        : null,
  }
}

const mockDesignRuleScores = () => {
  return {
    results: [
      {
        name: 'API-03: Only apply default HTTP operations',
        description: 'A RESTful API is an application programming interface that supports the default HTTP operations GET, PUT, POST, PATCH and DELETE',
        success: true,
        errors: [],
      },
      {
        name: 'API-09: Implement custom representation if supported',
        description: 'Provide a comma-separated list of field names using the query parameter fields te retrieve a custom representation. In case non-existent field names are passed, a 400 Bad Request error message is returned.',
        success: true,
        errors: [],
      },
      {
        name: 'API-16: Use OAS 3.0 for documentation',
        description: 'Publish specifications (documentation) as Open API Specification (OAS) 3.0 or higher.',
        success: false,
        errors: ['There is no openapi version found'],
      },
      {
        name: 'API-20: Include the major version number only in the URI',
        description: 'The URI of an API should include the major version number only. The minor and patch version numbers are in the response header of the message. Minor and patch versions have no impact on existing code, but major version do.',
        success: true,
        errors: [],
      },
      {
        name: 'API-48: Leave off trailing slashes from API endpoints',
        description: 'URIs to retrieve collections of resources or individual resources don\'t include a trailing slash. A resource is only available at one endpoint/path. Resource paths end without a slash.',
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
  }
}

export const modelFromAPIResponse = (api) => ({
  id: api.id,
  serviceName: api.service_name,
  organizationName: api.organization_name,
  description: api.description,
  apiType: APIType.valueOf(api.api_type),
  apiAuthentication: APIAuthentication.valueOf(api.api_authentication),
  environments: mapEnvironments(api.environments || []),
  forum: api.forum,
  badges: api.badges,
  isReferenceImplementation: api.is_reference_implementation,
  relations: api.relations,
  termsOfUse: mapTermsOfUse(api.terms_of_use || {}),
  scores: mapScores(api.scores),
  designRuleScores: mockDesignRuleScores(),
  relatedCode: api.related_code,
})
