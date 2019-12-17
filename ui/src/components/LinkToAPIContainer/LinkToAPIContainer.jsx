import React, { Component } from 'react'
import { string } from 'prop-types'
import LinkToAPI from '../LinkToAPI/LinkToAPI'
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

  fetchAPIDetails(id) {
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
    return this.fetchAPIDetails(id)
      .then((response) => modelFromAPIResponse(response))
      .then(
        (details) => {
          this.setState({ details, loaded: true })
        },
        (error) => {
          this.setState({ error: true, loaded: true })
          console.error(error)
        },
      )
  }

  componentWillUpdate(nextProps) {
    const { id } = nextProps
    const { id: prevId } = this.props

    if (prevId === id && typeof prevId !== 'undefined') {
      return
    }

    this.loadDetailsForApi(id)
  }

  componentDidMount() {
    const { id } = this.props
    this.loadDetailsForApi(id)
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
          <LinkToAPI
            serviceName={details.serviceName}
            organizationName={details.organizationName}
            id={details.id}
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
