// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import React from 'react'
import { number, object, func } from 'prop-types'
import { useHistory, useLocation } from 'react-router-dom'
import {
  StyledPagination,
  StyledPageButton,
  StyledArrowButton,
  StyledDottedButton,
  StyledPageCount,
  SelectField,
  SelectFieldContainer,
} from './Pagination.styles'

const ELLIPSIS = '...'

export const calculatePages = (currentPage, totalPageCount) => {
  const allPages = [...Array(totalPageCount).keys()].map((i) => i + 1)
  const pages = []
  allPages.forEach((page) => {
    if (
      page === 1 ||
      page === totalPageCount ||
      Math.abs(page - currentPage) <= 1
    ) {
      pages.push(page)
    } else {
      pages.push(ELLIPSIS)
    }
  })
  return pages.filter(
    (page, index) => !(page === ELLIPSIS && pages[index + 1] === ELLIPSIS),
  )
}

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth',
  })
}

const onPreviousPageButtonClickedHandler = (
  currentPage,
  onPageChangedHandler,
) => onPageChangedHandler(currentPage - 1)

const onNextPageButtonClickedHandler = (currentPage, onPageChangedHandler) =>
  onPageChangedHandler(currentPage + 1)

const Pagination = ({
  currentPage,
  totalRows,
  rowsPerPage,
  onPageChangedHandler,
  onResultsPerPageChange,
}) => {
  const totalPageCount = Math.ceil(totalRows / rowsPerPage)
  const pages = calculatePages(currentPage, totalPageCount)

  const handlePageChangedHandler = (args) => {
    onPageChangedHandler(args)
    scrollToTop()
  }

  return totalPageCount > 0 ? (
    <StyledPagination>
      <StyledArrowButton
        disabled={currentPage === 1}
        onClick={() =>
          onPreviousPageButtonClickedHandler(
            currentPage,
            handlePageChangedHandler,
            /* eslint-disable-next-line */
          )}
        aria-label="Vorige pagina"
      >
        «
      </StyledArrowButton>
      {pages.map((page, index) =>
        page === ELLIPSIS ? (
          <StyledDottedButton key={index}>{ELLIPSIS}</StyledDottedButton>
        ) : (
          <StyledPageButton
            onClick={() => handlePageChangedHandler(page)}
            current={page === currentPage}
            disabled={page === currentPage}
            key={index}
            aria-label={`Pagina ${page}`}
          >
            {page}
          </StyledPageButton>
        ),
      )}
      <StyledArrowButton
        disabled={currentPage === totalPageCount}
        onClick={() =>
          onNextPageButtonClickedHandler(
            currentPage,
            handlePageChangedHandler,
            /* eslint-disable-next-line */
          )}
        aria-label="Volgende pagina"
      >
        »
      </StyledArrowButton>
      <StyledPageCount>
        Pagina {currentPage} van {totalPageCount}
      </StyledPageCount>
      <Pagination.ResultsPerPage
        onResultsPerPageChange={onResultsPerPageChange}
        totalRows={totalRows}
        rowsPerPage={rowsPerPage}
      />
    </StyledPagination>
  ) : null
}

Pagination.ResultsPerPage = (props) => {
  const { totalRows, rowsPerPage, onResultsPerPageChange } = props

  const PAGINATION_OPTIONS = [10, 25, 50, 100, 250, 500]

  const Options = () => {
    const options = PAGINATION_OPTIONS.map((option) => {
      if (totalRows % option === totalRows) return null

      return (
        <option key={option} value={option}>
          {option}
        </option>
      )
    }).filter((o) => o)

    if (!options.length) {
      const option = PAGINATION_OPTIONS[0]
      return <option value={option}>{option}</option>
    }

    return options
  }

  return (
    <SelectFieldContainer>
      <label htmlFor="resultsPerPage">Aantal resultaten per pagina</label>
      <SelectField
        id="resultsPerPage"
        onChange={(e) => onResultsPerPageChange(e.currentTarget.value)}
        value={rowsPerPage}
        className="axe-ignore" // Element's background color could not be determined due to a background image
      >
        <Options />
      </SelectField>
    </SelectFieldContainer>
  )
}

Pagination.propTypes = {
  currentPage: number.isRequired,
  totalRows: number.isRequired,
  rowsPerPage: number.isRequired,
  onPageChangedHandler: func.isRequired,
  onResultsPerPageChange: func.isRequired,
}

Pagination.ResultsPerPage.propTypes = {
  onResultsPerPageChange: func.isRequired,
  totalRows: number.isRequired,
  rowsPerPage: number.isRequired,
}

export default Pagination
