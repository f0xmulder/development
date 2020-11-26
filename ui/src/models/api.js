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

const mapDesignRuleScores = (designRuleScores) => ({
  results: designRuleScores.results.map((result) => ({
    name: result.rule_type_name,
    description: result.rule_type_description,
    url: result.rule_type_url,
    success: result.success,
    errors: result.errors || [],
  })),
})

export const modelFromAPIResponse = (api) => {
  const apiType = APIType.valueOf(api.api_type)
  const scores = mapScores(api.scores)
  const designRuleScores = api.design_rule_scores
    ? mapDesignRuleScores(api.design_rule_scores)
    : null

  const totalScore = {
    points: designRuleScores
      ? designRuleScores.results.reduce(
          (total, current) => (current.success ? total + 1 : total),
          0,
        )
      : Object.values(scores).reduce(
          (total, value) => (value ? total + 1 : total),
          0,
        ),
    maxPoints: designRuleScores
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
