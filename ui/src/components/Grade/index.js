import React, { Component } from 'react'
import {shape,bool} from 'prop-types'

export const calculateGrade = (scores) => {
    const values = Object.values(scores)
    const percentage = values.reduce((total, value) => value ? (total+1) : total, 0) / values.length
    return Math.round(percentage * 10 * 10) / 10
}

class Grade extends Component {
    render() {
      const { scores } = this.props

      return (
          <React.Fragment>
              {calculateGrade(scores)}
          </React.Fragment>
      )
    }
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
