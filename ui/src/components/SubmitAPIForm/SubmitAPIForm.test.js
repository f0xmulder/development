// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import React from 'react'
import { shallow } from 'enzyme'
import { APIType } from '../../models/enums'
import SubmitAPIForm from './SubmitAPIForm'

describe('SubmitAPIForm', () => {
  let wrapper
  const apis = [
    {
      id: 'test-api.json',
      organizationName: 'Organization Name',
      serviceName: 'Service Name',
      apiType: APIType.REST_JSON,
      totalScore: { points: 10, maxPoints: 10 },
    },
  ]

  beforeAll(() => {
    wrapper = shallow(
      <SubmitAPIForm
        apis={{ data: apis, error: null, loaded: true }}
        touched={{}}
      />,
    )
  })

  it('should exist', () => {
    expect(wrapper.exists()).toEqual(true)
  })
})
