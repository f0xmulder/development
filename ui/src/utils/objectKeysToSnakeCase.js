// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import { snakeCase } from 'change-case'

function objectKeysToSnakeCase(obj) {
  if (obj instanceof Array) {
    return obj.map((value) => {
      return objectKeysToSnakeCase(value)
    })
  } else if (typeof obj === 'object' && obj !== null) {
    const newObj = {}

    Object.entries(obj).forEach(([key, value]) => {
      value = objectKeysToSnakeCase(value)
      newObj[snakeCase(key)] = value
    })

    return newObj
  }

  return obj
}

export default objectKeysToSnakeCase
