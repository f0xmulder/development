// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
const mapEnvironments = (environments) =>
  environments.map((env) => {
    return {
      name: env.name,
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
    uptimeGuarantee: termsOfUse.uptime_guarantee || 0,
    supportResponseTime: termsOfUse.support_response_time || '',
  }
}

export const modelFromAPIResponse = (api) => ({
  id: api.id,
  serviceName: api.service_name,
  organizationName: api.organization_name,
  description: api.description,
  apiType: api.api_type,
  apiAuthentication: api.api_authentication,
  environments: mapEnvironments(api.environments || []),
  forum: api.forum,
  badges: api.badges,
  isReferenceImplementation: api.is_reference_implementation,
  relations: api.relations,
  termsOfUse: mapTermsOfUse(api.terms_of_use || {}),
  scores: mapScores(api.scores),
  apiDesignRules: api.api_design_rules,
})
