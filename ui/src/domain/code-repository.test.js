// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import { GITLAB_REPO_URL } from '../constants'
import CodeRepository from './code-repository'

const codeMock = {
  url: GITLAB_REPO_URL,
}

const codeListMock = {
  results: [codeMock, codeMock],
}

describe('Code repository', () => {
  describe('Getting a list of all code', () => {
    beforeEach(() => {
      jest.spyOn(global, 'fetch').mockImplementation(() =>
        Promise.resolve({
          ok: true,
          status: 200,
          json: () => Promise.resolve(codeListMock),
        }),
      )
    })

    afterEach(() => global.fetch.mockRestore())

    it('should return a list of code', async () => {
      const result = await CodeRepository.getAll('1')
      expect(result).toEqual(codeListMock)
      expect(global.fetch).toHaveBeenCalledWith('/api/code?page=1')
    })
  })

  describe('Creating a code project', () => {
    beforeEach(() => {
      jest.spyOn(global, 'fetch').mockImplementation(() =>
        Promise.resolve({
          ok: true,
          status: 201,
          json: () => Promise.resolve(codeMock),
        }),
      )
    })

    afterEach(() => global.fetch.mockRestore())

    it('should create a code project', async () => {
      const result = await CodeRepository.create(codeMock)
      expect(result).toEqual(codeMock)
      expect(global.fetch).toHaveBeenCalledWith('/api/code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': undefined,
        },
        body: JSON.stringify(codeMock),
      })
    })
  })

  describe('Error while creating a code project', () => {
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
        await CodeRepository.create(codeMock)
        throw Error('expected to be unreachable')
      } catch (e) {
        expect(e).toEqual(new Error('invalid json'))
      }
    })
  })
})
