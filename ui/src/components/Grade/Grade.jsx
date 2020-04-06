// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import React from 'react'
import { shape, bool, string } from 'prop-types'
import {
  StyledBorder,
  StyledCircle,
  StyledScoreSubscript,
} from './Grade.styles'

export const calculateGrade = (scores) => {
  const values = Object.values(scores)
  const percentage =
    values.reduce((total, value) => (value ? total + 1 : total), 0) /
    values.length
  return Math.round(percentage * 10 * 10) / 10
}

const Grade = ({ scores, largeAtMediaQuery, ...props }) => {
  const grade = calculateGrade(scores)

  return (
    <StyledBorder
      grade={grade}
      largeAtMediaQuery={largeAtMediaQuery}
      {...props}
    >
      <StyledCircle largeAtMediaQuery={largeAtMediaQuery}>
        {grade}
        <StyledScoreSubscript largeAtMediaQuery={largeAtMediaQuery}>
          /10
        </StyledScoreSubscript>
      </StyledCircle>
    </StyledBorder>
  )
}

Grade.propTypes = {
  scores: shape({
    hasDocumentation: bool,
    hasSpecification: bool,
    hasContactDetails: bool,
    providesSla: bool,
  }),
  // Use function names from `theme/mediaQueries`
  largeAtMediaQuery: string,
}

Grade.defaultProps = {
  largeAtMediaQuery: null,
}

export default Grade
