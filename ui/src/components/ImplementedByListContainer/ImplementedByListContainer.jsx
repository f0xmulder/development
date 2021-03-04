// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import React, { Component } from 'react'
import { string } from 'prop-types'
import ImplementedByList from '../ImplementedByList/ImplementedByList'
import { modelFromAPIResponse } from '../../models/api'

class ImplementedByListContainer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      apis: [],
      error: false,
      loaded: false,
    }
  }

  componentDidMount() {
    const { id } = this.props
    this.loadDetailsForAPI(id)
  }

  componentWillUpdate(nextProps) {
    const { id } = nextProps
    const { id: prevId } = this.props.id

    if (prevId === id || typeof prevId === 'undefined') {
      return
    }

    this.loadDetailsForAPI(id)
  }

  async fetchImplementedByInfo(id) {
    const response = await fetch(`/api/apis/${id}/implemented-by`)
    if (response.ok) {
      return response.json()
    } else {
      throw new Error(
        `Er ging iets fout bij het ophalen van de referentie implementaties voor API met ID '${id}'`,
      )
    }
  }

  async loadDetailsForAPI(id) {
    try {
      const response = await this.fetchImplementedByInfo(id)
      const apis = response.map((api) => modelFromAPIResponse(api))
      this.setState({ apis: apis, loaded: true })
    } catch (error) {
      this.setState({ error: true, loaded: true })
      console.error(error)
    }
  }

  render() {
    const { apis, error, loaded } = this.state

    return (
      <div className="ImplementedByListContainer">
        {!loaded ? null : error ? (
          <p data-test="error-message">
            Er ging iets fout tijdens het ophalen van de gerelateerde API&#39;s.
          </p>
        ) : apis && apis.length ? (
          <ImplementedByList apis={apis} />
        ) : (
          <p data-test="no-consumers-message">
            Er zijn momenteel geen API’s die verwijzen naar deze
            referentieimplementatie.
          </p>
        )}
      </div>
    )
  }
}

ImplementedByListContainer.propTypes = {
  id: string.isRequired,
}

export default ImplementedByListContainer
