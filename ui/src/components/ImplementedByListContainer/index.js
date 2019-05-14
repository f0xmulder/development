import React, { Component } from 'react'
import { string } from 'prop-types'
import ImplementedByList from '../ImplementedByList'
import {modelFromAPIResponse} from '../../models/api'

class ImplementedByListContainer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      apis: [],
      error: false,
      loaded: false,
    }
  }

  fetchImplementedByInfo(id) {
    return fetch(`/api/apis/${id}/implemented-by`).then((response) => {
      if (response.ok) {
        return response.json()
      } else {
        throw new Error(
          `Er ging iets fout bij het ophalen van de referentie implementaties voor API met ID '${id}'`,
        )
      }
    })
  }

  loadDetailsForAPI(id) {
    return this.fetchImplementedByInfo(id)
    .then(response => response.map(api => modelFromAPIResponse(api)))
      .then(
      (apis) => {
        this.setState({ apis: apis, loaded: true })
      },
      (error) => {
        this.setState({ error: true, loaded: true })
        console.error(error)
      },
    )
  }

  componentWillUpdate(nextProps) {
    const { id } = nextProps
    const { id: prevId } = this.props.id

    if (prevId === id || typeof prevId === 'undefined') {
      return
    }

    this.loadDetailsForAPI(id)
  }

  componentDidMount() {
    const { id } = this.props
    this.loadDetailsForAPI(id)
  }

  render() {
    const { apis, error, loaded } = this.state

    return (
      <div className="ImplementedByListContainer">
        {!loaded ? null : error ? (
          <p data-test="error-message">
            Er ging iets fout tijdens het ophalen van de gerelateerde API's.
          </p>
        ) : apis && apis.length ? (
          <ImplementedByList apis={apis} />
        ) : null}
      </div>
    )
  }
}

ImplementedByListContainer.propTypes = {
  id: string.isRequired,
}

export default ImplementedByListContainer
