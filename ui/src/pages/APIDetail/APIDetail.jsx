import React, { Component } from 'react'
import { object } from 'prop-types'

import APIDetails from '../../components/APIDetails/APIDetails'
import { modelFromAPIResponse } from '../../models/api'
import { Container } from './APIDetail.styles'

class APIDetail extends Component {
  static defaultProps = {
    match: { params: {} },
  }

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
    return (
      <div className="APIDetail">
        {!loaded ? null : error ? (
          <p data-test="error-message">
            Er ging iets fout tijdens het ophalen van de API.
          </p>
        ) : details ? (
          <Container>
            <APIDetails {...details} />
          </Container>
        ) : null}
      </div>
    )
  }
}

APIDetail.propTypes = {
  match: object,
}

APIDetail.defaultProps = {
  match: { params: {} },
}

export default APIDetail
