import * as Yup from 'yup'

import { convertEmptyValueTo } from './yup-utils'

describe('yup-utils', () => {
  describe('convertEmptyValueTo', () => {
    it('should return null if empty string given', () => {
      const num = Yup.number()
        .nullable()
        .transform(convertEmptyValueTo())
      expect(num.validateSync('')).toBeNull()
    })

    it('should return zero when passed as argument', () => {
      const num = Yup.number().transform(convertEmptyValueTo(0))
      expect(num.validateSync('')).toBe(0)
    })

    it('should pass given value when allowed by Yup', () => {
      const num = Yup.number().transform(convertEmptyValueTo(0))
      expect(num.validateSync(123)).toBe(123)
    })
  })
})
