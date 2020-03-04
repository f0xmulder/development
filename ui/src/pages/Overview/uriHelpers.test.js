import { generateQueryParams } from './uriHelpers'

describe('uirHelpers', () => {
  describe('generateQueryParams', () => {
    it('should create expected string', () => {
      const result = generateQueryParams({
        q: '',
        page: '2',
      })

      expect(result.toString()).toEqual('page=2')
    })
  })
})
