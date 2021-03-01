// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import React, { Component } from 'react'
import { object } from 'prop-types'

import { Button } from '@commonground/design-system'
import Spinner from '@commonground/design-system/dist/components/Spinner'
import Pagination from '../../components/Pagination/Pagination'
import EventList from '../../components/EventList/EventList'
import { modelFromAPIResponse } from '../../models/event'
import { generateQueryParams } from '../../utils/uriHelpers'
import { ResultsHeader } from '../../components/Overview/Overview'
import { DONSmall } from '../../components/CustomDON'
import {
  StyledOverviewPage,
  StyledOverviewHeader,
  StyledResultsContainer,
  StyledSubtitle,
  StyledAddLinkDesktop,
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

  async loadEventList() {
    try {
      const response = await this.fetchEventList()
      const result = Object.assign({}, response, {
        events: response.results.map((event) => modelFromAPIResponse(event)),
      })
      this.setState({ result, loaded: true })
    } catch (error) {
      this.setState({ error: true, loaded: true })
      console.error(error)
    }
  }

  async fetchEventList() {
    const response = await fetch(
      `/api/events?${generateQueryParams(this.getQueryParams())}`,
    )
    if (response.ok) {
      return response.json()
    } else {
      throw new Error(`Er ging iets fout tijdens het ophalen van de events`)
    }
  }

  handlePageChange = (page) => {
    const { history, location } = this.props
    const values = new URLSearchParams(location ? location.search : {})
    values.set('pagina', page.toString())
    history.push(`?${values}`)
  }

  handleResultsPerPageChange = (resultsPerPage) => {
    const { history, location } = this.props

    const values = new URLSearchParams(location ? location.search : {})
    values.set('aantalPerPagina', resultsPerPage.toString())
    values.set('pagina', '1')
    history.push(`?${values}`)
  }

  getQueryParams = () => {
    const { location } = this.props
    const values = new URLSearchParams(location ? location.search : {})

    /* eslint-disable camelcase */
    return {
      page: values.get('pagina') || '1',
      rowsPerPage: values.get('aantalPerPagina') || '10',
    }
    /* eslint-enable camelcase */
  }

  render() {
    const { result, error, loaded } = this.state
    const queryParams = this.getQueryParams()
    const { page } = queryParams

    const totalResults = loaded && !error && result ? result.totalResults : null

    return (
      <StyledOverviewPage>
        <StyledOverviewHeader>
          <div>
            <h1>Aankomende events</h1>
            <StyledSubtitle>
              Overheidsgerelateerde events voor developers.
            </StyledSubtitle>
          </div>
          <Button as={StyledAddLinkDesktop} to="events/add" variant="secondary">
            <StyledAddIcon />
            Event toevoegen
          </Button>
        </StyledOverviewHeader>

        <StyledResultsContainer>
          <ResultsHeader
            totalResults={totalResults}
            objectName="Event"
            objectNamePlural="Events"
            addLinkTarget="events/add"
          />
          {!loaded ? (
            <Spinner data-testid="loading" />
          ) : error ? (
            <DONSmall>
              Er ging iets fout tijdens het ophalen van de events.
            </DONSmall>
          ) : !result || !result.events || result.events.length === 0 ? (
            <DONSmall>Er zijn (nog) geen events beschikbaar.</DONSmall>
          ) : (
            <>
              <EventList events={result.events} />
              <Pagination
                currentPage={parseInt(page, 10)}
                totalRows={result.totalResults}
                rowsPerPage={result.rowsPerPage}
                onPageChangedHandler={this.handlePageChange}
                onResultsPerPageChange={this.handleResultsPerPageChange}
              />
            </>
          )}
        </StyledResultsContainer>
      </StyledOverviewPage>
    )
  }
}

EventOverview.propTypes = {
  history: object,
  location: object,
}

export default EventOverview
