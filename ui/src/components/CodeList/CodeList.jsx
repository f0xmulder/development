// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import React from 'react'
import { arrayOf, shape, number } from 'prop-types'
import CodeSummary from '../CodeSummary/CodeSummary'

import { StyledList, StyledListItem } from './CodeList.styles'

const CodeList = ({ code }) => (
  <StyledList>
    {code.map((code) => (
      <StyledListItem key={code.id}>
        <CodeSummary {...code} />
      </StyledListItem>
    ))}
  </StyledList>
)

CodeList.propTypes = {
  code: arrayOf(
    shape({
      id: number.isRequired,
    }),
  ),
}

export default CodeList
