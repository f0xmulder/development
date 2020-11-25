// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import React, { Component } from 'react'
import { object } from 'prop-types'
import Select from 'react-select'

import { Button } from '@commonground/design-system'
import CodeList from '../../components/CodeList/CodeList'
import Pagination from '../../components/Pagination/Pagination'
import { modelFromCodeResponse } from '../../models/code'
import { generateQueryParams } from '../../utils/uriHelpers'
import { ResultsHeader } from '../../components/Overview/Overview'
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
  StyledErrorMessage,
  SearchDiv,
  ReactSelect,
  ReactSelectStyle,
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

  getQueryParams = () => {
    const { location } = this.props
    const values = new URLSearchParams(location ? location.search : {})

    /* eslint-disable camelcase */
    return {
      q: values.get('q') || '',
      programming_languages: values.getAll('programming_languages') || '',
      page: values.get('pagina') || '1',
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
              overheids-API's.
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
                <ReactSelect>
                  <Select
                    component="select"
                    name="programmingLanguages"
                    maxWidth="large"
                    isMulti="true"
                    placeholder="Programmeertalen"
                    onChange={(event) => this.selectChangeHandler(event)}
                    styles={ReactSelectStyle}
                    optionClassName="needsclick"
                    options={result.programmingLanguages.map((pl) => ({
                      value: pl.id,
                      label: pl.name,
                    }))}
                  />
                </ReactSelect>
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
            {!loaded ? null : error ? (
              <StyledErrorMessage>
                Er ging iets fout tijdens het ophalen van de code.
              </StyledErrorMessage>
            ) : !result || !result.code || result.code.length === 0 ? (
              <StyledErrorMessage>
                Er is (nog) geen code beschikbaar.
              </StyledErrorMessage>
            ) : (
              <>
                <CodeList code={result.code} />
                <Pagination
                  currentPage={parseInt(page, 10)}
                  totalRows={result.totalResults}
                  rowsPerPage={result.rowsPerPage}
                  onPageChangedHandler={this.handlePageChange}
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