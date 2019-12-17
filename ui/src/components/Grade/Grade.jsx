import React from 'react'
import { shape, bool } from 'prop-types'
import { StyledGrade, StyledLabel, StyledBar } from './Grade.styles'

export const calculateGrade = (scores) => {
  const values = Object.values(scores)
  const percentage =
    values.reduce((total, value) => (value ? total + 1 : total), 0) /
    values.length
  return Math.round(percentage * 10 * 10) / 10
}

const Grade = ({ scores }) => {
  const grade = calculateGrade(scores)

  return (
    <StyledGrade>
      <StyledLabel>{grade}</StyledLabel>
      <StyledBar grade={grade} />
    </StyledGrade>
  )
}

Grade.propTypes = {
  scores: shape({
    hasDocumentation: bool.isRequired,
    hasSpecification: bool.isRequired,
    hasContactDetails: bool.isRequired,
    providesSla: bool.isRequired,
  }),
}

export default Grade
