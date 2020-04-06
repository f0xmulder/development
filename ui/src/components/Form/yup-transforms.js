// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
export const convertEmptyValueTo = (n = null) => (value, originalValue) => {
  if (typeof originalValue === 'string' && originalValue === '') {
    return n
  }
  return value
}
