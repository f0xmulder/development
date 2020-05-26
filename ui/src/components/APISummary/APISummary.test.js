// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import React from 'react'
import { shallow } from 'enzyme/build'
import { APIType } from '../../models/enums'
import APISummary from './APISummary'
import { StyledLink } from './APISummary.styles'

describe('APISummary', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(
      <APISummary
        id="test-api.json"
        organizationName="Organization"
        serviceName="Service"
        apiType={APIType.REST_JSON}
        scores={{
          hasDocumentation: true,
          hasSpecification: true,
          hasContactDetails: false,
          providesSla: false,
        }}
      />,
    )
  })

  it('should show a Link', () => {
    expect(wrapper.type()).toBe(StyledLink)
  })

  it('should link to the API detail page', () => {
    expect(wrapper.props().to).toBe('/apis/test-api.json')
  })

  it('should display the service and organization name', () => {
    expect(
      wrapper.containsAllMatchingElements(['Service', 'Organization']),
    ).toBeTruthy()
  })
})
