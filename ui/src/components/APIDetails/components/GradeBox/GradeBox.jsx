// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import React from 'react'
import PropTypes, { string, shape, bool } from 'prop-types'

import {
  GradeContainer,
  GradeHeader,
  StyledGrade,
  StyledLink,
  StyledLinkMobile,
} from './GradeBox.styles'

const getDesignRuleScoreText = (designRuleScores) => {
  const successes = designRuleScores.results.reduce(
    (total, current) => (current.success ? total + 1 : total),
    0,
  )
  const total = designRuleScores.results.length

  return `${successes}/${total}`
}

const GradeBox = ({ apiId, scores, designRuleScores }) => {
  // For now, this is how we differentiate between score types
  const isDesignRulesScore = !!designRuleScores
  const scoreDescription = isDesignRulesScore
    ? 'API score'
    : 'Design Rule score'
  // const linkTarget = isDesignRulesScore ? `${apiId}/api-design-rules` : `${apiId}/score-detail`
  const linkTarget = `${apiId}/score-detail`

  return (
    <GradeContainer>
      <GradeHeader>{scoreDescription}</GradeHeader>

      {isDesignRulesScore ? (
        <div>{getDesignRuleScoreText(designRuleScores)}</div>
      ) : (
        <StyledGrade scores={scores} largeAtMediaQuery="smUp" />
      )}

      {
        /* Remove this check to re-enable the normal score drawer */
        isDesignRulesScore && (
          <>
            <StyledLinkMobile to={linkTarget}>
              Toon {scoreDescription} opbouw
            </StyledLinkMobile>
            <StyledLink to={linkTarget}>Toon opbouw</StyledLink>
          </>
        )
      }
    </GradeContainer>
  )
}

GradeBox.propTypes = {
  apiId: string,
  scores: shape({
    hasDocumentation: bool,
    hasSpecification: bool,
    hasContactDetails: bool,
    providesSla: bool,
  }),
  // TODO refine
  designRuleScores: PropTypes.object,
}

export default GradeBox
