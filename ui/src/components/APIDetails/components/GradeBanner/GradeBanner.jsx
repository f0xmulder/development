// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import React from 'react'
import { shape, number } from 'prop-types'

import { calculatePercentage } from '../../../Grade/Grade'
import {
  Container,
  PointsText,
  MaxPointsText,
  StyledGrade,
} from './GradeBanner.styles'

const GradeBanner = ({ totalScore }) => {
  const { points, maxPoints } = totalScore
  const percentage = calculatePercentage(points, maxPoints)

  return (
    <Container percentage={percentage}>
      {points === 0 ? null : (
        <StyledGrade
          totalScore={totalScore}
          size={48}
          strokeWidth={8}
          staticBackgroundColor="#FFFFFF"
          withText={false}
        />
      )}

      <PointsText>{points}</PointsText>
      <MaxPointsText>/{maxPoints}</MaxPointsText>
    </Container>
  )
}

GradeBanner.propTypes = {
  totalScore: shape({
    points: number.isRequired,
    maxPoints: number.isRequired,
  }).isRequired,
}

export default GradeBanner
