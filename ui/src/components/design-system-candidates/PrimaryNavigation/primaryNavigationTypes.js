// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import { arrayOf, shape, string, elementType, bool } from 'prop-types'

export default {
  items: arrayOf(
    shape({
      name: string.isRequired,
      Icon: elementType,
      to: string.isRequired,
      exact: bool,
      'data-testid': string.isRequired,
    }),
  ).isRequired,
}
