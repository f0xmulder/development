// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import React from 'react'
import { shape, string, arrayOf } from 'prop-types'
import APISummary from '../APISummary/APISummary'

import { StyledList, StyledListItem } from '../APIList/APIList.styles'

const ImplementedByList = ({ apis }) => (
  <div className="ImplementedByList">
    <StyledList>
      {apis.map((api, i) => (
        <StyledListItem key={i}>
          <APISummary {...api} />
        </StyledListItem>
      ))}
    </StyledList>
  </div>
)

ImplementedByList.propTypes = {
  apis: arrayOf(
    shape({
      id: string.isRequired,
      serviceName: string.isRequired,
      organizationName: string.isRequired,
    }),
  ),
}

export default ImplementedByList
