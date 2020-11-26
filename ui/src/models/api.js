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
  }
}

export const modelFromAPIResponse = (api) => {
  const apiType = APIType.valueOf(api.api_type)
  const scores = mapScores(api.scores)
  const designRuleScores = mockDesignRuleScores()

  const totalScore = {
    points: apiType.isREST()
      ? designRuleScores.results.reduce(
          (total, current) => (current.success ? total + 1 : total),
          0,
        )
      : Object.values(scores).reduce(
          (total, value) => (value ? total + 1 : total),
          0,
        ),
    maxPoints: apiType.isREST()
      ? designRuleScores.results.length
      : Object.values(scores).length,
  }

  return {
    id: api.id,
    serviceName: api.service_name,
    organizationName: api.organization_name,
    description: api.description,
    apiType,
    apiAuthentication: APIAuthentication.valueOf(api.api_authentication),
    environments: mapEnvironments(api.environments || []),
    forum: api.forum,
    badges: api.badges,
    isReferenceImplementation: api.is_reference_implementation,
    relations: api.relations,
    termsOfUse: mapTermsOfUse(api.terms_of_use || {}),
    scores,
    designRuleScores,
    totalScore,
    relatedCode: api.related_code,
  }
}
