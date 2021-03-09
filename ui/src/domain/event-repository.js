// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import Cookies from 'js-cookie'

export default class EventRepository {
  static async getAll(queryParams) {
    const result = await fetch(`/api/events?${queryParams}`)

    if (!result.ok) {
      throw new Error('Kan de lijst met evenementen niet ophalen')
    }

    return result.json()
  }

  static async create(event) {
    const result = await fetch(`/api/events`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': Cookies.get('csrftoken'),
      },
      body: JSON.stringify(event),
    })

    if (result.status === 400) {
      throw new Error(
        'Ongeldige gebruikersinvoer bij het aanmaken van het evenement',
      )
    }

    if (!result.ok) {
      throw new Error('Kan het evenement niet aanmaken')
    }

    return result.json()
  }
}
