// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//

/**
 * For instance useful when having a number field that can be submitted empty:
 * eg: Yup.number().transform(convertEmptyValueTo(0))
 */
export const convertEmptyValueTo =
  (n = null) =>
  (value, originalValue) => {
    if (typeof originalValue === 'string' && originalValue === '') {
      return n
    }
    return value
  }
