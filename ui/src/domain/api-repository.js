// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import Cookies from 'js-cookie'
import { modelFromAPIResponse } from '../models/api'

class APIRepository {
  static async getAll(queryParams) {
    const params = queryParams || `rowsPerPage=${Number.MAX_SAFE_INTEGER}`
    const result = await fetch(`/api/apis?${params}`)

    if (!result.ok) {
      throw new Error(
        `Er ging iets fout tijdens het ophalen van de beschikbare API's`,
      )
    }

    return result.json()
  }

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

  static async fetchImplementedByInfo(id) {
    const response = await fetch(`/api/apis/${id}/implemented-by`)
    if (response.ok) {
      const json = await response.json()
      return json.map((api) => modelFromAPIResponse(api))
    } else {
      throw new Error(
        `Er ging iets fout bij het ophalen van de referentie implementaties voor API met ID '${id}'`,
      )
    }
  }

  static async create(data) {
    const response = await fetch('/api/submit-api', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': Cookies.get('csrftoken'),
      },
    })
    if (response.ok) {
      return response.json()
    } else {
      throw new Error('Er ging iets fout tijdens het toevoegen van de API.')
    }
  }
}

export default APIRepository
