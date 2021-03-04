// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import React, { Component } from 'react'
import { object } from 'prop-types'
import { Button, Spinner, SelectComponent } from '@commonground/design-system'

import CodeList from '../../components/CodeList/CodeList'
import Pagination from '../../components/Pagination/Pagination'
import { modelFromCodeResponse } from '../../models/code'
import { generateQueryParams } from '../../utils/uriHelpers'
import { ResultsHeader } from '../../components/Overview/Overview'
import { DONSmall } from '../../components/CustomDON'
import {
  StyledOverviewPage,
  StyledOverviewHeader,
  StyledOverviewBody,
  StyledResultsContainer,
  StyledSubtitle,
  StyledForm,
  StyledSearch,
  StyledAddLinkDesktop,
  StyledAddIcon,
  SearchDiv,
  StyledSelectComponentContainer,
} from './CodeOverview.styles'

class CodeOverview extends Component {
  state = {
    result: {},
    error: false,
    loaded: false,
  }

  componentDidMount() {
    this.loadCodeList()
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.location &&
      prevProps.location.search !== this.props.location.search
    ) {
      this.loadCodeList()
    }
  }

  async loadCodeList() {
    try {
      const response = await this.fetchCodeList()
      const result = Object.assign({}, response, {
        code: response.results.map((code) => modelFromCodeResponse(code)),
      })
      this.setState({ result, loaded: true })
    } catch (e) {
      this.setState({ error: true, loaded: true })
      console.error(e)
    }
  }

  handleSearchHandler(query) {
    const { history } = this.props

    const urlParams = new URLSearchParams(document.location.search.substring(1))
    urlParams.set('q', query)
    history.push(`/code?${urlParams}`)
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

  selectChangeHandler(optionSelected) {
    const { history } = this.props

    const urlParams = new URLSearchParams(document.location.search.substring(1))
    urlParams.delete('programming_languages')
    if (optionSelected) {
      optionSelected.map((pl) =>
        urlParams.append('programming_languages', pl.value),
      )
    }
    history.push(`/code?${urlParams}`)
  }

  async fetchCodeList() {
    const response = await fetch(
      `/api/code?${generateQueryParams(this.getQueryParams())}`,
    )

    if (response.ok) {
      return response.json()
    } else {
      throw new Error(`Er ging iets fout tijdens het ophalen van de code`)
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
      q: values.get('q') || '',
      programming_languages: values.getAll('programming_languages') || '',
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
            <h1>Code</h1>
            <StyledSubtitle>
              Open source code van projecten die gebruik maken van
              overheids-API’s.
            </StyledSubtitle>
            <StyledForm onSubmit={(event) => this.formSubmitHandler(event)}>
              <SearchDiv onChange={(event) => this.formChangeHandler(event)}>
                <label htmlFor="search-code" aria-label="Zoekterm">
                  <StyledSearch
                    inputProps={{
                      placeholder: 'Zoek project...',
                      name: 'query',
                      id: 'search-code',
                      defaultValue: '',
                    }}
                  />
                </label>
              </SearchDiv>

              {result.programmingLanguages ? (
                <StyledSelectComponentContainer>
                  <label aria-label="Programmeertalen">
                    <SelectComponent
                      className="axe-ignore"
                      name="programmingLanguages"
                      size="m"
                      isMulti="true"
                      placeholder="Programmeertalen"
                      onChange={(event) => this.selectChangeHandler(event)}
                      options={result.programmingLanguages.map((pl) => ({
                        value: pl.id.toString(),
                        label: pl.name,
                      }))}
                    />
                  </label>
                </StyledSelectComponentContainer>
              ) : null}
            </StyledForm>
          </div>
          <Button as={StyledAddLinkDesktop} to="code/add" variant="secondary">
            <StyledAddIcon />
            Project toevoegen
          </Button>
        </StyledOverviewHeader>

        <StyledOverviewBody>
          <StyledResultsContainer>
            <ResultsHeader
              totalResults={totalResults}
              objectName="Project"
              objectNamePlural="Projecten"
              addLinkTarget="code/add"
            />
            {!loaded ? (
              <Spinner data-testid="loading" />
            ) : error ? (
              <DONSmall>
                Er ging iets fout tijdens het ophalen van de code.
              </DONSmall>
            ) : !result || !result.code || result.code.length === 0 ? (
              <DONSmall>Er is (nog) geen code beschikbaar.</DONSmall>
            ) : (
              <>
                <CodeList code={result.code} />
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

CodeOverview.propTypes = {
  history: object,
  location: object,
}

export default CodeOverview
