// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import objectKeysToSnakeCase from './objectKeysToSnakeCase'

/* eslint camelcase: 0 */

describe('objectKeysToSnakeCase', () => {
  it('should convert a flat object', () => {
    const obj = {
      key: 'value',
      camelKey: 'value',
      anArray: ['one', 'two'],
      nestEd: {
        camelKey: 'value',
        anotherKey: null,
        key: 42,
      },
    }

    expect(objectKeysToSnakeCase(obj)).toEqual({
      key: 'value',
      camel_key: 'value',
      an_array: ['one', 'two'],
      nest_ed: {
        camel_key: 'value',
        another_key: null,
        key: 42,
      },
    })
  })
})
