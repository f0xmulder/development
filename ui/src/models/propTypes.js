// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import { bool, string, arrayOf, shape } from 'prop-types'

export const designRuleScores = shape({
  results: arrayOf(
    shape({
      name: string.isRequired,
      description: string.isRequired,
      url: string.isRequired,
      success: bool.isRequired,
      errors: arrayOf(string).isRequired,
    }),
  ),
})
