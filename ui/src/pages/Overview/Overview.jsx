import React, { Component } from 'react'
import { object } from 'prop-types'

import APIList from '../../components/APIList/APIList'
import { modelFromAPIResponse } from '../../models/api'

import { generateQueryParams } from './uriHelpers'
import {
  StyledOverviewPage,
  StyledAPIFilters,
  StyledResultsContainer,
  StyledH1,
  StyledPagination,
} from './Overview.styles'

class Overview extends Component {
  state = {
    result: {},
    error: false,
    loaded: false,
  }

  loadAPIList() {
    return this.fetchApiList()
      .then((response) =>
        Object.assign({}, response, {
          apis: response.apis.map((api) => modelFromAPIResponse(api)),
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
      newFilters.tags = []
      newFilters.organization_name = []
      newFilters.api_type = []
      /* eslint-enable camelcase */
    }

    const translatedFilters = {
      /* eslint-disable camelcase */
      q: newFilters.q,
      tags: newFilters.tags || [],
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
      tags: values.getAll('tags'),
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
        <StyledH1>Overzicht van API&#39;s</StyledH1>
        {!loaded ? null : error ? (
          <p data-test="error-message">
            Er ging iets fout tijdens het ophalen van de API&#39;s.
          </p>
        ) : (
          <>
            <StyledAPIFilters
              initialValues={queryParams}
              facets={result.facets}
              onSubmit={this.handleFilterChange}
            />
            <StyledResultsContainer>
              {result && result.apis && result.apis.length > 0 ? (
                <>
                  <APIList total={result.total} apis={result.apis} />
                  <StyledPagination
                    currentPage={parseInt(page, 10)}
                    totalRows={result.total}
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
          </>
        )}
      </StyledOverviewPage>
    )
  }
}

Overview.propTypes = {
  history: object,
  location: object,
}

export default Overview
