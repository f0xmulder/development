// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import React, { useEffect, useState } from 'react'
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

function useDebounce(value, delay) {
  // State and setters for debounced value
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(
    () => {
      // Update debounced value after delay
      const handler = setTimeout(() => {
        setDebouncedValue(value)
      }, delay)

      // Cancel the timeout if value changes (also on delay change or unmount)
      // This is how we prevent debounced value from updating if value is changed ...
      // .. within the delay period. Timeout gets cleared and restarted.
      return () => {
        clearTimeout(handler)
      }
    },
    [value, delay], // Only re-call effect if value or delay changes
  )

  return debouncedValue
}

const APIOverview = (props) => {
  const { history, location } = props

  const [result, setResult] = useState({})
  const [error, setError] = useState(false)
  const [loaded, setLoaded] = useState(false)

  const controller = new AbortController()
  const signal = controller.signal

  const debounced = useDebounce(props.location?.search, 300)
  const isFacet =
    props.location?.search.includes('type') ||
    props.location?.search.includes('organisatie')

  const isSeaching = debounced !== props.location?.search

  useEffect(() => {
    loadAPIList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFacet])

  useEffect(() => {
    if (
      debounced &&
      !debounced.includes('type') &&
      !debounced.includes('organisatie')
    ) {
      loadAPIList()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounced])

  const fetchApiList = async () => {
    const response = await fetch(
      `/api/apis?${generateQueryParams(getQueryParams())}`,
      { signal },
    )
    if (response.ok) {
      return response.json()
    } else {
      throw new Error(`Er ging iets fout tijdens het ophalen van de API's`)
    }
  }

  const loadAPIList = async () => {
    try {
      const response = await APIRepository.getAll(
        generateQueryParams(this.getQueryParams()),
      )
      const result = Object.assign({}, response, {
        apis: response.results.map((api) => modelFromAPIResponse(api)),
      })
      setResult(result)
      setLoaded(true)
    } catch (error) {
      setError(true)
      setLoaded(true)
      console.error(error)
    }
  }

  const handleSearchHandler = (query) => {
    const urlParams = new URLSearchParams()
    urlParams.set('q', query)
    history.push(`/apis?${urlParams}`)
  }

  const formSubmitHandler = (event) => {
    event.preventDefault()

    const input = event.target.query
    handleSearchHandler(input.value)
  }

  const formChangeHandler = (event) => {
    event.preventDefault()

    const input = event.target.value
    handleSearchHandler(input)
  }

  const handleFilterChange = (newFilters) => {
    const currentFilters = getQueryParams()

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

    history.push(`?${generateQueryParams(translatedFilters)}`)
  }

  const handlePageChange = (page) => {
    const values = new URLSearchParams(location ? location.search : {})
    values.set('pagina', page.toString())
    history.push(`?${values}`)
  }

  const handleResultsPerPageChange = (resultsPerPage) => {
    const values = new URLSearchParams(location ? location.search : {})
    values.set('aantalPerPagina', resultsPerPage.toString())
    values.set('pagina', '1')
    history.push(`?${values}`)
  }

  const getQueryParams = () => {
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

  const queryParams = getQueryParams()
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
            onSubmit={(event) => formSubmitHandler(event)}
            onChange={(event) => formChangeHandler(event)}
          >
            <label htmlFor="search-api" aria-label="Zoekterm">
              <StyledSearch
                inputProps={{
                  placeholder: 'Zoek API',
                  name: 'query',
                  id: 'search-api',
                  value: queryParams.q,
                }}
                searching={isSeaching}
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
            onSubmit={handleFilterChange}
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
                onPageChangedHandler={handlePageChange}
                onResultsPerPageChange={handleResultsPerPageChange}
              />
            </>
          )}
        </StyledResultsContainer>
      </StyledOverviewBody>
    </StyledOverviewPage>
  )
}

APIOverview.propTypes = {
  history: object,
  location: object,
}

export default APIOverview
