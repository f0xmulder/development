// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import React, { Component } from 'react'
import { object, func } from 'prop-types'
import { RedocStandalone } from 'redoc'

import APIDetailsRepository from '../../domain/api-details-repository'
import APIDetailsHeader from '../../components/APIDetailsHeader/APIDetailsHeader'
import { Container } from '../../components/design-system-candidates/Grid'

class APISpecification extends Component {
  state = {
    details: {},
    error: false,
    loaded: false,
  }

  componentDidMount() {
    const { id } = this.props.match.params
    this.loadDetailsForApi(id)
  }

  componentDidUpdate(prevProps) {
    const { id } = this.props.match.params
    const prevId = prevProps.match.params.id

    if (prevId === id) return
    this.loadDetailsForApi(id)
  }

  getSpecificationUrl() {
    const { id, environment } = this.props.match.params
    if (!id || !environment) {
      return undefined
    }
    return `/api/apis/${id}/${environment}/specification`
  }

  getExternalSpecificationUrl() {
    const { environment } = this.props.match.params
    if (!environment) {
      return undefined
    }

    if (!this.state.loaded || this.state.error) {
      return undefined
    }

    const environmentData = this.state.details.environments.find(
      (env) => env.name.value === environment,
    )
    if (!environmentData) {
      return undefined
    }

    return environmentData.specificationUrl
  }

  async loadDetailsForApi(id) {
    try {
      const details = await this.props.getApiDetailsById(id)
      this.setState({ details, loaded: true })
    } catch (error) {
      this.setState({ error: true, loaded: true })
      console.error(error)
    }
  }

  render() {
    const { details, error, loaded } = this.state
    const specificationUrl = this.getSpecificationUrl()
    const externalSpecUrl = this.getExternalSpecificationUrl()

    return (
      <Container>
        {loaded &&
          (error ? (
            <p data-test="error-message">
              Er ging iets fout tijdens het ophalen van de API specificatie.
            </p>
          ) : (
            <>
              <APIDetailsHeader
                previousName="API details"
                serviceName={details.serviceName}
                organizationName={details.organizationName}
                externalSpecificationUrl={externalSpecUrl}
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
  getApiDetailsById: func.isRequired,
}

APISpecification.defaultProps = {
  getApiDetailsById: APIDetailsRepository.getById,
}

export default APISpecification
