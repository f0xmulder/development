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

    var resultJSON = ''
    try {
      resultJSON = await result.json()
    } catch (e) {}

    if (!result.ok) {
      if (resultJSON.detail) {
        throw new Error(
          'Er ging iets fout tijdens het toevoegen van de code: ' +
            resultJSON.detail,
        )
      } else {
        throw new Error()
      }
    }

    return resultJSON
  }
}
