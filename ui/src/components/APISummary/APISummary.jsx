// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import React from 'react'
import { string, shape, number, instanceOf } from 'prop-types'

import PillBadge from '../PillBadge/PillBadge'

import { APIType } from '../../models/enums'
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
  totalScore,
  ...props
}) => (
  <StyledLink to={`/apis/${id}`} data-test="link" {...props}>
    <StyledServiceName>{serviceName}</StyledServiceName>
    <StyledOrganizationName>{organizationName}</StyledOrganizationName>
    <PillContainer>
      <PillBadge>{apiType.label}</PillBadge>
    </PillContainer>
    <StyledGrade totalScore={totalScore} />
  </StyledLink>
)

APISummary.propTypes = {
  id: string.isRequired,
  serviceName: string.isRequired,
  organizationName: string.isRequired,
  apiType: instanceOf(APIType).isRequired,
  totalScore: shape({
    points: number.isRequired,
    maxPoints: number.isRequired,
  }).isRequired,
}

export default APISummary
