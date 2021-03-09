// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import CorRepository from './cor-repository'

const codeMock = {
  page: 1,
  rowsPerPage: 30,
  totalResults: 1,
  results: [
    {
      oin: '00000004130854102000',
      naam: 'Digitaal Stelsel Omgevingswet (DSO-LV)',
    },
  ],
}

describe('COR repository', () => {
  describe('Search for an organisation', () => {
    beforeEach(() => {
      jest.spyOn(global, 'fetch').mockImplementation(() =>
        Promise.resolve({
          ok: true,
          status: 200,
          json: () => Promise.resolve(codeMock),
        }),
      )
    })

    afterEach(() => global.fetch.mockRestore())

    it('should return a list of code', async () => {
      const result = await CorRepository.search('dso', 1)
      expect(result).toEqual(codeMock)
      expect(global.fetch).toHaveBeenCalledWith(
        '/api/cor/?q=dso&status=Actief&fields=naam,oin&page=1',
      )
    })
  })

  describe('Error while searching for an organisation', () => {
    beforeEach(() => {
      jest.spyOn(global, 'fetch').mockImplementation(() =>
        Promise.resolve({
          ok: false,
          status: 500,
          json: () => Promise.reject(Error('invalid json')),
        }),
      )
    })

    afterEach(() => global.fetch.mockRestore())

    it('should throw an error', async () => {
      try {
        await CorRepository.search('dso', 1)
        throw Error('expected to be unreachable')
      } catch (e) {
        expect(e).toEqual(
          new Error('Kan de lijst met organisaties niet ophalen.'),
        )
      }
    })
  })
})
