// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import React from 'react'
import { string, shape, bool, number } from 'prop-types'

import {
  GradeContainer,
  GradeHeader,
  StyledGrade,
  StyledLink,
  StyledLinkMobile,
} from './GradeBox.styles'

const GradeBox = ({ apiId, totalScore, isDesignRulesScore }) => {
  const scoreDescription = isDesignRulesScore
    ? 'Design Rule score'
    : 'API score'
  const linkProps = {
    to: `${apiId}/score-detail`,
    'data-testid': 'score-detail-link',
  }

  return (
    <GradeContainer>
      <GradeHeader>{scoreDescription}</GradeHeader>
      <StyledGrade totalScore={totalScore} largeAtMediaQuery="smUp" />
      <StyledLinkMobile {...linkProps}>
        Toon {scoreDescription} opbouw
      </StyledLinkMobile>
      <StyledLink {...linkProps}>Toon opbouw</StyledLink>
    </GradeContainer>
  )
}

GradeBox.propTypes = {
  apiId: string,
  totalScore: shape({
    points: number.isRequired,
    maxPoints: number.isRequired,
  }).isRequired,
  isDesignRulesScore: bool,
}

export default GradeBox
