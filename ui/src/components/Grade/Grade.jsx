// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import React from 'react'
import { number, string, shape } from 'prop-types'
import {
  StyledBorder,
  StyledCircle,
  StyledScoreSubscript,
} from './Grade.styles'

export const calculateGrade = (points, maxPoints) => {
  const percentage = points / maxPoints
  return Math.round(percentage * 10 * 10) / 10
}

const Grade = ({ totalScore, largeAtMediaQuery, ...props }) => {
  const { points, maxPoints } = totalScore
  const grade = calculateGrade(points, maxPoints)

  return (
    <StyledBorder
      grade={grade}
      largeAtMediaQuery={largeAtMediaQuery}
      {...props}
    >
      <StyledCircle largeAtMediaQuery={largeAtMediaQuery}>
        {points}
        <StyledScoreSubscript largeAtMediaQuery={largeAtMediaQuery}>
          /{maxPoints}
        </StyledScoreSubscript>
      </StyledCircle>
    </StyledBorder>
  )
}

Grade.propTypes = {
  totalScore: shape({
    points: number.isRequired,
    maxPoints: number.isRequired,
  }).isRequired,
  // Use function names from `theme/mediaQueries`
  largeAtMediaQuery: string,
}

Grade.defaultProps = {
  largeAtMediaQuery: null,
}

export default Grade
