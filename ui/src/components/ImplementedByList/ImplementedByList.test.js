import React from 'react'
import { shallow } from 'enzyme/build'
import ImplementedByList from './ImplementedByList'

describe('ImplementedByList', () => {
  let wrapper

  beforeAll(() => {
    const apis = [
      {
        id: '42',
        serviceName: 'Service',
        organizationName: 'Organization',
        apiType: 'json',
        scores: {
          hasDocumentation: true,
          hasSpecification: true,
          hasContactDetails: false,
          providesSla: false,
        },
      },
    ]
    wrapper = shallow(<ImplementedByList apis={apis} />)
  })

  it('should list all provided apis', () => {
    const listItems = wrapper.find('APISummary')
    expect(listItems).toHaveLength(1)
  })
})
