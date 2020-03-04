import React from 'react'
import { arrayOf, shape, string, number } from 'prop-types'

import Card from '../Card/Card'
import {
  APIListHeader,
  TotalAPIs,
  StyledIconLink,
  StyledCard,
  StyledList,
  StyledListItem,
  StyledAPISummary,
} from './APIList.styles'

const APIList = ({ total, apis }) => (
  <>
    <APIListHeader>
      <TotalAPIs>
        <span data-test="total">{total}</span> API&#39;s
      </TotalAPIs>
      <StyledIconLink to="apis/toevoegen">API toevoegen</StyledIconLink>
    </APIListHeader>

    <StyledCard>
      <Card.Body>
        <StyledList>
          {apis.map((api) => (
            <StyledListItem key={api.id}>
              <StyledAPISummary
                id={api.id}
                serviceName={api.serviceName}
                organizationName={api.organizationName}
                apiType={api.apiType}
                scores={api.scores}
              />
            </StyledListItem>
          ))}
        </StyledList>
      </Card.Body>
    </StyledCard>
  </>
)

APIList.propTypes = {
  apis: arrayOf(
    shape({
      id: string.isRequired,
      serviceName: string.isRequired,
      organizationName: string.isRequired,
    }),
  ),
  total: number.isRequired,
}

export default APIList
