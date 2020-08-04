// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import { prettyTimePart } from './prettyDateTimes'

describe('prettyTimePart', () => {
  it('should make time parts look pretty', () => {
    expect(prettyTimePart('0')).toEqual('00')
    expect(prettyTimePart('1')).toEqual('01')
    expect(prettyTimePart('10')).toEqual('10')
    expect(prettyTimePart('11')).toEqual('11')
  })
})
