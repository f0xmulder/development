type ConvertTypes = null | string | number | boolean
// import { TransformFunction } from 'yup' // TODO: Can we use this?

/**
 * For instance useful when having a number field that can be submitted empty:
 * eg: Yup.number().transform(convertEmptyValueTo(0))
 */
export const convertEmptyValueTo = (n: ConvertTypes = null) => (
  value: string,
  originalValue: string | number,
): ConvertTypes => {
  if (typeof originalValue === 'string' && originalValue === '') {
    return n
  }
  return value
}
