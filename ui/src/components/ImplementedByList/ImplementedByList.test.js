// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import React from 'react'
import { shallow } from 'enzyme/build'
import { APIType } from '../../models/enums'
import ImplementedByList from './ImplementedByList'

describe('ImplementedByList', () => {
  let wrapper

  beforeAll(() => {
    const apis = [
      {
        id: '42',
        serviceName: 'Service',
        organizationName: 'Organization',
        apiType: APIType.REST_JSON,
        scores: {
          hasDocumentation: true,
          hasSpecification: true,
          hasContactDetails: false,
          providesSla: false,
        },
        totalScore: { points: 10, maxPoints: 10 },
      },
    ]
    wrapper = shallow(<ImplementedByList apis={apis} />)
  })

  it('should list all provided apis', () => {
    const listItems = wrapper.find('APISummary')
    expect(listItems).toHaveLength(1)
  })
})
