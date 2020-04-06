// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import { camelCase } from 'change-case'

function objectKeysToCamelCase(obj) {
  const newObj = {}

  if (obj instanceof Array) {
    return obj.map((value) => {
      if (typeof value === 'object') {
        value = objectKeysToCamelCase(value)
      }
      return value
    })
  } else {
    Object.entries(obj).forEach(([key, value]) => {
      if (
        value instanceof Array ||
        (typeof value === 'object' && value !== null)
      ) {
        value = objectKeysToCamelCase(value)
      }
      newObj[camelCase(key)] = value
    })
  }
  return newObj
}

export default objectKeysToCamelCase
