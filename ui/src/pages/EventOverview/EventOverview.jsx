// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import React, { Component } from 'react'
import { object } from 'prop-types'

import { Button } from '@commonground/design-system'
import Pagination from '../../components/Pagination/Pagination'
import EventList from '../../components/EventList/EventList'
import { modelFromAPIResponse } from '../../models/event'
import { generateQueryParams } from '../../utils/uriHelpers'
import {
  StyledOverviewPage,
  StyledOverviewHeader,
  StyledResultsContainer,
  StyledSubtitle,
  StyledAddLink,
  StyledAddIcon,
} from './EventOverview.styles'

class EventOverview extends Component {
  state = {
    result: {},
    error: false,
    loaded: false,
  }

  componentDidMount() {
    this.loadEventList()
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.location &&
      prevProps.location.search !== this.props.location.search
    ) {
      this.loadEventList()
    }
  }

  loadEventList() {
    return this.fetchEventList()
      .then((response) =>
        Object.assign({}, response, {
          events: response.results.map((event) => modelFromAPIResponse(event)),
        }),
      )
      .then(
        (result) => {
          this.setState({ result, loaded: true })
        },
        (error) => {
          this.setState({ error: true, loaded: true })
          console.error(error)
        },
      )
  }

  fetchEventList() {
    const fetched = fetch(
      `/api/events?${generateQueryParams(this.getQueryParams())}`,
    )

    return fetched.then((response) => {
      if (response.ok) {
        return response.json()
      } else {
        throw new Error(`Er ging iets fout tijdens het ophalen van de events`)
      }
    })
  }

  handlePageChange = (page) => {
    const { history, location } = this.props
    const values = new URLSearchParams(location ? location.search : {})
    values.set('pagina', page.toString())
    history.push(`?${values}`)
  }

  getQueryParams = () => {
    const { location } = this.props
    const values = new URLSearchParams(location ? location.search : {})

    /* eslint-disable camelcase */
    return {
      page: values.get('pagina') || '1',
    }
    /* eslint-enable camelcase */
  }

  render() {
    const { result, error, loaded } = this.state
    const queryParams = this.getQueryParams()
    const { page } = queryParams

    return (
      <StyledOverviewPage>
        <StyledOverviewHeader>
          <div>
            <h1>Aankomende events</h1>
            <StyledSubtitle>
              Overheidsgerelateerde events voor developers.
            </StyledSubtitle>
          </div>
          <Button as={StyledAddLink} to="events/add" variant="secondary">
            <StyledAddIcon />
            Event toevoegen
          </Button>
        </StyledOverviewHeader>

        {!loaded ? null : error ? (
          <p data-test="error-message">
            Er ging iets fout tijdens het ophalen van de events.
          </p>
        ) : (
          <StyledResultsContainer>
            {result && result.events && result.events.length > 0 ? (
              <>
                <EventList total={result.totalResults} events={result.events} />
                <Pagination
                  currentPage={parseInt(page, 10)}
                  totalRows={result.totalResults}
                  rowsPerPage={result.rowsPerPage}
                  onPageChangedHandler={this.handlePageChange}
                />
              </>
            ) : (
              <p data-test="no-events-available-message">
                Er zijn (nog) geen events beschikbaar.
              </p>
            )}
          </StyledResultsContainer>
        )}
      </StyledOverviewPage>
    )
  }
}

EventOverview.propTypes = {
  history: object,
  location: object,
}

export default EventOverview
