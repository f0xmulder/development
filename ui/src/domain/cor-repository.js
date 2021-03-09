// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//

export default class CorRepository {
  static async search(search, page) {
    const result = await fetch(
      `/api/cor/?q=${search}&status=Actief&fields=naam,oin&page=${page}`,
    )

    if (!result.ok) {
      throw new Error('Kan de lijst met organisaties niet ophalen.')
    }

    return result.json()
  }
}
