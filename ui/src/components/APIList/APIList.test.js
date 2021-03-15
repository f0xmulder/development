// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import { shallow } from 'enzyme/build'
import React from 'react'
import { APIType } from '../../models/enums'
import APIList from './APIList'

describe('APIList', () => {
  let apiElements
  let wrapper

  beforeEach(() => {
    const apis = [
      {
        id: 'test-api.json',
        organizationName: 'Organization Name',
        serviceName: 'Service Name',
        apiType: APIType.REST_JSON,
        totalScore: { points: 10, maxPoints: 10 },
      },
    ]

    wrapper = shallow(<APIList apis={apis} />)
    apiElements = wrapper.find('APISummary')
  })

  it('should show all available APIs', () => {
    expect(apiElements).toHaveLength(1)
  })

  it('should link to the API', () => {
    const link = apiElements.find('APISummary')
    expect(link.exists()).toBe(true)
  })
})
