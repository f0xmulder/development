// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import React, { Component } from 'react'
import { string } from 'prop-types'
import APISummary from '../APISummary/APISummary'
import APIRepository from '../../domain/api-repository'
import { modelFromAPIResponse } from '../../models/api'

class LinkToAPIContainer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      details: {},
      error: false,
      loaded: false,
    }
  }

  componentDidMount() {
    const { id } = this.props
    this.loadDetailsForApi(id)
  }

  componentWillUpdate(nextProps) {
    const { id } = nextProps
    const { id: prevId } = this.props

    if (prevId === id && typeof prevId !== 'undefined') {
      return
    }

    this.loadDetailsForApi(id)
  }

  async fetchAPIDetails(id) {
    return APIRepository.getById(id)
  }

  async loadDetailsForApi(id) {
    try {
      const response = await this.fetchAPIDetails(id)
      const details = modelFromAPIResponse(response)
      this.setState({ details, loaded: true })
    } catch (error) {
      this.setState({ error: true, loaded: true })
      console.error(error)
    }
  }

  render() {
    const { details, error, loaded } = this.state

    return (
      <div className="LinkToAPIContainer">
        {!loaded ? null : error ? (
          <p data-test="error-message">
            Er ging iets fout tijdens het ophalen van de API.
          </p>
        ) : (
          <APISummary
            serviceName={details.serviceName}
            organizationName={details.organizationName}
            id={details.id}
            totalScore={details.totalScore}
            apiType={details.apiType}
          />
        )}
      </div>
    )
  }
}

LinkToAPIContainer.propTypes = {
  id: string.isRequired,
}

export default LinkToAPIContainer
