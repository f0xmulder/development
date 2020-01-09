import React, { Component } from 'react'
import { RouteComponentProps } from 'react-router-dom'

import { Api } from '../../models/apiTypes'
import APIDetails from '../../components/APIDetails/APIDetails'
import { modelFromAPIResponse } from '../../models/api'
import { Container } from './APIDetail.styles'

type MatchParams = {
  id: string
}

type Props = RouteComponentProps<MatchParams>

type State = {
  details: Api
  loaded: boolean
  error: boolean
}

class APIDetail extends Component<Props, State> {
  static defaultProps = {
    match: { params: {} },
  }

  state = {
    details: {} as Api,
    error: false,
    loaded: false,
  }

  fetchApiDetails(id: string) {
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

  loadDetailsForApi(id: string) {
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

  componentDidUpdate(prevProps: Props) {
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

export default APIDetail
