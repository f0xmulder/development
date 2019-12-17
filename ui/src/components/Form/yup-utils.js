/**
 * Useful when having a number field that can be submitted empty
 */
export const emptyIsZero = () => (value, originalValue) =>
  typeof originalValue === 'string' && originalValue.trim() === ''
    ? null
    : value
