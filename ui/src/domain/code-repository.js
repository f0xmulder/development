// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import Cookies from 'js-cookie'

export default class CodeRepository {
  static async getAll(page) {
    const result = await fetch(`/api/code?page=${encodeURIComponent(page)}`)

    if (!result.ok) {
      throw new Error('Kan de lijst met projecten niet ophalen')
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
