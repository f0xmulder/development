import {
  Api,
  TermsOfUse,
  Scores,
  GoApi,
  GoTermsOfUse,
  GoScores,
} from './apiTypes'

const mapScores = (scores: GoScores): Scores =>
  scores
    ? {
        hasDocumentation: scores.has_documentation,
        hasSpecification: scores.has_specification,
        hasContactDetails: scores.has_contact_details,
        providesSla: scores.provides_sla,
      }
    : {}

const mapTermsOfUse = (termsOfUse: GoTermsOfUse): TermsOfUse => {
  return {
    governmentOnly: termsOfUse.government_only,
    payPerUse: termsOfUse.pay_per_use,
    uptimeGuarantee: termsOfUse.uptime_guarantee || 0,
    supportResponseTime: termsOfUse.support_response_time || '',
  }
}

export const modelFromAPIResponse = (api: GoApi): Api => ({
  id: api.id,
  serviceName: api.service_name,
  organizationName: api.organization_name,
  description: api.description,
  apiUrl: api.api_url,
  apiType: api.api_type,
  specificationUrl: api.specification_url,
  documentationUrl: api.documentation_url,
  badges: api.badges,
  isReferenceImplementation: api.is_reference_implementation,
  relations: api.relations,
  termsOfUse: mapTermsOfUse(api.terms_of_use || {}),
  scores: mapScores(api.scores),
  tags: api.tags,
})
