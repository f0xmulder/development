import React, { Component } from 'react'
import {shape,bool} from 'prop-types'

class Grade extends Component {
    calculateGrade() {
        const values = Object.values(this.props.scores)
        const percentage = values.reduce((total, value) => value ? (total+1) : total, 0) / values.length
        return Math.round(percentage * 10 * 10) / 10
    }

    render() {
        return (
            <React.Fragment>
                {this.calculateGrade()}
            </React.Fragment>
        )
    }
}

Grade.propTypes = {
    scores: shape({
        has_documentation: bool.isRequired,
        has_specification: bool.isRequired,
        has_contact_details: bool.isRequired,
        provides_sla: bool.isRequired,
        is_online: bool.isRequired
    })
}

export default Grade
