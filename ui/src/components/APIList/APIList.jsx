// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import React from 'react'
import { arrayOf, shape, string } from 'prop-types'

import APISummary from '../APISummary/APISummary'
import {
  StyledCard,
  StyledCardBody,
  StyledList,
  StyledListItem,
} from './APIList.styles'

const APIList = ({ apis }) => (
  <StyledCard>
    <StyledCardBody>
      <StyledList>
        {apis.map((api) => (
          <StyledListItem key={api.id}>
            <APISummary
              id={api.id}
              serviceName={api.serviceName}
              organizationName={api.organizationName}
              apiType={api.apiType}
              scores={api.scores}
            />
          </StyledListItem>
        ))}
      </StyledList>
    </StyledCardBody>
  </StyledCard>
)

APIList.propTypes = {
  apis: arrayOf(
    shape({
      id: string.isRequired,
      serviceName: string.isRequired,
      organizationName: string.isRequired,
    }),
  ),
}

export default APIList
