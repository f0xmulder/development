// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import Cookies from 'js-cookie'

export default class CodeRepository {
  static async getAll(queryParams) {
    const result = await fetch(`/api/code?${queryParams}`)

    if (!result.ok) {
      throw new Error('Er ging iets fout tijdens het ophalen van de code')
    }

    return result.json()
  }

  static async create(code) {
    const result = await fetch(`/api/code`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': Cookies.get('csrftoken'),
      },
      body: JSON.stringify(code),
    })

    var resultJSON = await result.json()

    if (!result.ok) {
      throw new Error(
        'Er ging iets fout tijdens het toevoegen van de code' +
        resultJSON.detail
          ? ': ' + resultJSON.detail
          : '',
      )
    }

    return resultJSON
  }
}
