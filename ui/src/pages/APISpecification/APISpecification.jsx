import React, { Component } from 'react'
import { object } from 'prop-types'
import { RedocStandalone } from 'redoc'

import { modelFromAPIResponse } from '../../models/api'
import APIDetailsHeader from '../../components/APIDetailsHeader/APIDetailsHeader'
import { Container } from './ApiSpecification.styles'

class APISpecification extends Component {
  state = {
    details: {},
    error: false,
    loaded: false,
  }

  fetchApiDetails(id) {
    return fetch(`/api/apis/${id}`).then((response) => {
      if (response.ok) {
        return response.json()
      } else {
        throw new Error(
          `Er ging iets fout bij het ophalen voor de API met ID '${id}'`,
        )
      }
    })
  }

  loadDetailsForApi(id) {
    return this.fetchApiDetails(id).then(
      (details) => {
        this.setState({ details: modelFromAPIResponse(details), loaded: true })
      },
      (error) => {
        this.setState({ error: true, loaded: true })
        console.error(error)
      },
    )
  }

  getSpecificationUrl() {
    const { details } = this.state
    const environmentName = this.props.match.params.environment
    if (details.environments && details.environments.length > 0) {
      const environment = details.environments.find(
        (env) => environmentName === (env.name && env.name.toLowerCase()),
      )
      return environment ? environment.specificationUrl : undefined
    }
    return undefined
  }

  componentDidUpdate(prevProps) {
    const { id } = this.props.match.params
    const prevId = prevProps.match.params.id

    if (prevId === id) return
    this.loadDetailsForApi(id)
  }

  componentDidMount() {
    const { id } = this.props.match.params
    this.loadDetailsForApi(id)
  }

  render() {
    const { details, error, loaded } = this.state
    const specificationUrl = this.getSpecificationUrl()

    return (
      <Container>
        {loaded &&
          (error ? (
            <p data-test="error-message">
              Er ging iets fout tijdens het ophalen van de API.
            </p>
          ) : (
            <>
              <APIDetailsHeader
                serviceName={details.serviceName}
                organizationName={details.organizationName}
              />
              {specificationUrl && (
                <RedocStandalone specUrl={specificationUrl} />
              )}
            </>
          ))}
      </Container>
    )
  }
}

APISpecification.propTypes = {
  match: object,
}

export default APISpecification
