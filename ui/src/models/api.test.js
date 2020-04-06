// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import { modelFromAPIResponse } from './api'
import { goApiMock, apiMock } from './api.mock'

describe('create an API model from the API response', () => {
  it('should transform the response to an API model', () => {
    expect(modelFromAPIResponse(goApiMock)).toEqual(apiMock)
  })
})
