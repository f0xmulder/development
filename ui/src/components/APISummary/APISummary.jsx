// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import React from 'react'
import { string, object } from 'prop-types'

import PillBadge from '../PillBadge/PillBadge'

import {
  StyledLink,
  StyledServiceName,
  StyledOrganizationName,
  PillContainer,
  StyledGrade,
} from './APISummary.styles'

const APISummary = ({
  id,
  serviceName,
  organizationName,
  apiType,
  scores,
  ...props
}) => (
  <StyledLink to={`/apis/${id}`} data-test="link" {...props}>
    <StyledServiceName>{serviceName}</StyledServiceName>
    <StyledOrganizationName>{organizationName}</StyledOrganizationName>
    <PillContainer>
      <PillBadge>{apiType}</PillBadge>
    </PillContainer>
    <StyledGrade scores={scores} />
  </StyledLink>
)

APISummary.propTypes = {
  id: string.isRequired,
  serviceName: string.isRequired,
  organizationName: string.isRequired,
  apiType: string.isRequired,
  scores: object.isRequired,
}

export default APISummary
