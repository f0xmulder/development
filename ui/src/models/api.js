const mapScores = (scores) =>
  scores
    ? {
        hasDocumentation: scores.has_documentation,
        hasSpecification: scores.has_specification,
        hasContactDetails: scores.has_contact_details,
        providesSla: scores.provides_sla,
      }
    : {}

export const modelFromAPIResponse = (api) => ({
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
  termsOfUse: api.terms_of_use,
  scores: mapScores(api.scores),
  tags: api.tags,
})
