import React from 'react'
import {shape, bool} from 'prop-types'
import {StyledGrade,StyledLabel,StyledBar} from './index.styles'

export const calculateGrade = (scores) => {
    const values = Object.values(scores)
    const percentage = values.reduce((total, value) => value ? (total+1) : total, 0) / values.length
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
        has_documentation: bool.isRequired,
        has_specification: bool.isRequired,
        has_contact_details: bool.isRequired,
        provides_sla: bool.isRequired
    })
}

export default Grade
