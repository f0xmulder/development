import { generateQueryParams } from './uriHelpers'

describe('uirHelpers', () => {
  describe('generateQueryParams', () => {
    it('should create expected string', () => {
      const result = generateQueryParams({
        q: '',
        tags: ['42', '43'],
        page: '2',
      })

      expect(result.toString()).toEqual('tags=42&tags=43&page=2')
    })
  })
})
