import React, { Component } from 'react'
import { object, func } from 'prop-types'

import APIDetailsRepository from '../../domain/api-details-repository'
import APIDetails from '../../components/APIDetails/APIDetails'

class APIDetail extends Component {
  static defaultProps = {
    match: { params: {} },
  }

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

  loadDetailsForApi(id) {
    return this.props.getApiDetailsById(id).then(
      (details) => {
        this.setState({ details, loaded: true })
      },
      (error) => {
        this.setState({ error: true, loaded: true })
        console.error(error)
      },
    )
  }

  render() {
    const { details, error, loaded } = this.state

    return (
      <div className="APIDetail">
        {!loaded ? null : error ? (
          <p data-test="error-message">
            Er ging iets fout tijdens het ophalen van de API.
          </p>
        ) : details ? (
          <APIDetails {...details} />
        ) : null}
      </div>
    )
  }
}

APIDetail.propTypes = {
  match: object,
  getApiDetailsById: func.isRequired,
}

APIDetail.defaultProps = {
  match: { params: {} },
  getApiDetailsById: APIDetailsRepository.getById,
}

export default APIDetail
