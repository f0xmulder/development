// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import { shallow } from 'enzyme/build'
import React from 'react'
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
      },
    ]

    wrapper = shallow(<APIList apis={apis} />)
    apiElements = wrapper.find('Styled(APISummary)')
  })

  it('should show all available APIs', () => {
    expect(apiElements).toHaveLength(1)
  })

  it('should link to the API', () => {
    const link = apiElements.find('Styled(APISummary)')
    expect(link.exists()).toBe(true)
  })
})
