// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import { formatAsTimeAgo } from './timeAgo'

describe('formatAsTimeAgo', () => {
  it('should work for a single unit of time', () => {
    expect(formatAsTimeAgo(Date.now() - 60 * 1000)).toEqual('1 minuut geleden')
  })

  it('should work for multiple units of time', () => {
    expect(formatAsTimeAgo(Date.now() - 3 * 60 * 60 * 1000)).toEqual(
      '3 uur geleden',
    )
  })
})
