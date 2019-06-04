import { modelFromAPIResponse } from './api'

describe('create an API model from the API response', () => {
  it('should transform the response to an API model', () => {
    const apiModel = {}
    apiModel['id'] = 'id'
    apiModel['service_name'] = 'service name'
    apiModel['organization_name'] = 'organization name'
    apiModel['description'] = 'description'
    apiModel['api_url'] = 'api url'
    apiModel['api_type'] = 'api type'
    apiModel['specification_url'] = 'specification url'
    apiModel['documentation_url'] = 'documentation url'
    apiModel['badges'] = 'badges'
    apiModel['is_reference_implementation'] = 'is reference implementation'
    apiModel['relations'] = 'relations'
    apiModel['terms_of_use'] = 'terms of use'
    apiModel['scores'] = {}
    apiModel['tags'] = ['tag']
    apiModel['scores']['has_documentation'] = false
    apiModel['scores']['has_specification'] = false
    apiModel['scores']['has_contact_details'] = false
    apiModel['scores']['provides_sla'] = false

    expect(modelFromAPIResponse(apiModel)).toEqual({
      id: 'id',
      serviceName: 'service name',
      organizationName: 'organization name',
      description: 'description',
      apiUrl: 'api url',
      apiType: 'api type',
      specificationUrl: 'specification url',
      documentationUrl: 'documentation url',
      badges: 'badges',
      tags: ['tag'],
      isReferenceImplementation: 'is reference implementation',
      relations: 'relations',
      termsOfUse: 'terms of use',
      scores: {
        hasDocumentation: false,
        hasSpecification: false,
        hasContactDetails: false,
        providesSla: false,
      },
    })
  })
})
