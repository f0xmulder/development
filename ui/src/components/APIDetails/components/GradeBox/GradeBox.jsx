// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import React from 'react'
import { string, shape, bool } from 'prop-types'

import {
  GradeContainer,
  GradeHeader,
  StyledGrade,
  StyledLink,
  StyledLinkMobile,
} from './GradeBox.styles'

const GradeBox = ({ scores, apiId }) => (
  <GradeContainer>
    <GradeHeader>API score</GradeHeader>
    <StyledGrade scores={scores} largeAtMediaQuery="smUp" />
    <StyledLinkMobile to={`${apiId}/score-detail`}>
      Toon API score opbouw
    </StyledLinkMobile>
    <StyledLink to={`${apiId}/score-detail`}>Toon opbouw</StyledLink>
  </GradeContainer>
)

GradeBox.propTypes = {
  scores: shape({
    hasDocumentation: bool,
    hasSpecification: bool,
    hasContactDetails: bool,
    providesSla: bool,
  }),
  apiId: string,
}

export default GradeBox
