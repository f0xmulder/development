// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import React, { Component } from 'react'
import { object } from 'prop-types'

import { Button } from '@commonground/design-system'
import Spinner from '@commonground/design-system/dist/components/Spinner'
import APIList from '../../components/APIList/APIList'
import Pagination from '../../components/Pagination/Pagination'
import { modelFromAPIResponse } from '../../models/api'
import { generateQueryParams } from '../../utils/uriHelpers'
import { ResultsHeader } from '../../components/Overview/Overview'
import { DONSmall } from '../../components/CustomDON'
import APIRepository from '../../domain/api-repository'
import {
  StyledOverviewPage,
  StyledOverviewHeader,
  StyledOverviewBody,
  StyledAPIFilters,
  StyledResultsContainer,
  StyledSubtitle,
  StyledSearch,
  StyledAddLinkDesktop,
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

  async loadAPIList() {
    try {
      const response = await APIRepository.getAll(
        generateQueryParams(this.getQueryParams()),
      )
      const result = Object.assign({}, response, {
        apis: response.results.map((api) => modelFromAPIResponse(api)),
      })
      this.setState({ result, loaded: true })
    } catch (error) {
      this.setState({ error: true, loaded: true })
      console.error(error)
    }
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

  handleFilterChange = (newFilters) => {
    const currentFilters = this.getQueryParams()

    // Reset facets when starting a new text search
    if (newFilters.q !== currentFilters.q) {
      /* eslint-disable camelcase */
      newFilters.organization_oin = []
      newFilters.api_type = []
      /* eslint-enable camelcase */
    }

    const translatedFilters = {
      /* eslint-disable camelcase */
      q: newFilters.q,
      organisatie: newFilters.organization_oin || [],
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
      q: values.get('q') || '',
      organization_oin: values.getAll('organisatie'),
      api_type: values.getAll('type'),
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
          <Button as={StyledAddLinkDesktop} to="apis/add" variant="secondary">
            <StyledAddIcon />
            API toevoegen
          </Button>
        </StyledOverviewHeader>

        <StyledOverviewBody>
          {!loaded || error ? null : (
            <StyledAPIFilters
              initialValues={queryParams}
              facets={result.facets}
              onSubmit={this.handleFilterChange}
            />
          )}
          <StyledResultsContainer>
            <ResultsHeader
              totalResults={totalResults}
              objectName="API"
              objectNamePlural="API&#39;s"
              addLinkTarget="apis/add"
            />
            {!loaded ? (
              <Spinner data-testid="loading" />
            ) : error ? (
              <DONSmall>
                Er ging iets fout tijdens het ophalen van de API&#39;s.
              </DONSmall>
            ) : !result || !result.apis || result.apis.length === 0 ? (
              <DONSmall>Er zijn (nog) geen API&#39;s beschikbaar.</DONSmall>
            ) : (
              <>
                <APIList apis={result.apis} />
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
        </StyledOverviewBody>
      </StyledOverviewPage>
    )
  }
}

APIOverview.propTypes = {
  history: object,
  location: object,
}

export default APIOverview
