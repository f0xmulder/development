// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//

import { rawFormDataMock } from './formData.mock'
import { schema } from './validationSchema'

describe('validationSchema', () => {
  const validSchema = rawFormDataMock
  const invalidSchema = {
    ...rawFormDataMock,
    productionApiUrl: undefined,
  }

  it('should return true when schema is valid', async () => {
    expect(await schema.isValid(validSchema)).toBeTruthy()
  })

  it('should return false when schema is invalid', async () => {
    expect(await schema.isValid(invalidSchema)).toBeFalsy()
  })

  it('should accept an acceptence API URL only', async () => {
    const acceptanceApiUrl = {
      ...invalidSchema,
      hasAcceptanceEnvironment: 'true',
      acceptanceApiUrl: 'http://www.test.com',
    }
    expect(await schema.isValid(acceptanceApiUrl)).toBeTruthy()
  })

  it('should accept a demo API URL only', async () => {
    const acceptanceApiUrl = {
      ...invalidSchema,
      hasDemoEnvironment: 'true',
      demoApiUrl: 'http://www.test.com',
    }
    expect(await schema.isValid(acceptanceApiUrl)).toBeTruthy()
  })
})
