// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import { modelFromAPIResponse } from '../models/api'

class APIDetailsRepository {
  static async getById(apiId) {
    const result = await fetch(`/api/apis/${apiId}`)

    if (!result.ok || result.status !== 200) {
      throw new Error(
        `Er ging iets fout bij het ophalen voor de API met ID '${apiId}'`,
      )
    }

    const apiDetails = await result.json()

    return modelFromAPIResponse(apiDetails)
  }
}

export default APIDetailsRepository
