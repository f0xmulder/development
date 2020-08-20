// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import React, { Component } from 'react'
import { object } from 'prop-types'

import { Button } from '@commonground/design-system'
import APIList from '../../components/APIList/APIList'
import Pagination from '../../components/Pagination/Pagination'
import { modelFromAPIResponse } from '../../models/api'

import { generateQueryParams } from '../../utils/uriHelpers'
import {
  StyledOverviewPage,
  StyledOverviewHeader,
  StyledAPIListContainer,
  StyledAPIFilters,
  StyledResultsContainer,
  StyledSubtitle,
  StyledSearch,
  StyledAddLink,
  StyledAddIcon,
} from './APIOverview.styles'

class APIOverview extends Component {
  state = {
    result: {},
    error: false,
    loaded: false,
  }

  componentDidMount() {
    this.loadAPIList()
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.location &&
      prevProps.location.search !== this.props.location.search
    ) {
      this.loadAPIList()
    }
  }

  loadAPIList() {
    return this.fetchApiList()
      .then((response) =>
        Object.assign({}, response, {
          apis: response.results.map((api) => modelFromAPIResponse(api)),
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

  handleSearchHandler(query) {
    const { history } = this.props

    const urlParams = new URLSearchParams()
    urlParams.set('q', query)
    history.push(`/apis?${urlParams}`)
  }

  formSubmitHandler(event) {
    event.preventDefault()

    const input = event.target.query
    this.handleSearchHandler(input.value)
  }

  formChangeHandler(event) {
    event.preventDefault()

    const input = event.target.value
    this.handleSearchHandler(input)
  }

  fetchApiList() {
    const fetched = fetch(
      `/api/apis?${generateQueryParams(this.getQueryParams())}`,
    )

    return fetched.then((response) => {
      if (response.ok) {
        return response.json()
      } else {
        throw new Error(`Er ging iets fout tijdens het ophalen van de API's`)
      }
    })
  }

  handleFilterChange = (newFilters) => {
    const currentFilters = this.getQueryParams()

    // Reset facets when starting a new text search
    if (newFilters.q !== currentFilters.q) {
      /* eslint-disable camelcase */
      newFilters.organization_name = []
      newFilters.api_type = []
      /* eslint-enable camelcase */
    }

    const translatedFilters = {
      /* eslint-disable camelcase */
      q: newFilters.q,
      organisatie: newFilters.organization_name || [],
      type: newFilters.api_type || [],
      /* eslint-enable camelcase */
    }

    const { history } = this.props
    history.push(`?${generateQueryParams(translatedFilters)}`)
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
      q: values.get('q') || '',
      organization_name: values.getAll('organisatie'),
      api_type: values.getAll('type'),
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
            <h1>API&#39;s binnen de Nederlandse overheid</h1>
            <StyledSubtitle>
              Een wegwijzer naar de API’s die (semi-)overheidsorganisaties in
              Nederland aanbieden.
            </StyledSubtitle>
            <form
              onSubmit={(event) => this.formSubmitHandler(event)}
              onChange={(event) => this.formChangeHandler(event)}
            >
              <label htmlFor="search-api" aria-label="Zoekterm">
                <StyledSearch
                  inputProps={{
                    placeholder: 'Zoek API',
                    name: 'query',
                    id: 'search-api',
                    defaultValue: '',
                  }}
                />
              </label>
            </form>
          </div>
          <Button as={StyledAddLink} to="apis/add" variant="secondary">
            <StyledAddIcon />
            API toevoegen
          </Button>
        </StyledOverviewHeader>

        {!loaded ? null : error ? (
          <p data-test="error-message">
            Er ging iets fout tijdens het ophalen van de API&#39;s.
          </p>
        ) : (
          <StyledAPIListContainer>
            <StyledAPIFilters
              initialValues={queryParams}
              facets={result.facets}
              onSubmit={this.handleFilterChange}
            />
            <StyledResultsContainer>
              {result && result.apis && result.apis.length > 0 ? (
                <>
                  <APIList total={result.totalResults} apis={result.apis} />
                  <Pagination
                    currentPage={parseInt(page, 10)}
                    totalRows={result.totalResults}
                    rowsPerPage={result.rowsPerPage}
                    onPageChangedHandler={this.handlePageChange}
                  />
                </>
              ) : (
                <p data-test="no-apis-available-message">
                  Er zijn (nog) geen API&#39;s beschikbaar.
                </p>
              )}
            </StyledResultsContainer>
          </StyledAPIListContainer>
        )}
      </StyledOverviewPage>
    )
  }
}

APIOverview.propTypes = {
  history: object,
  location: object,
}

export default APIOverview
