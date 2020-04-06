// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import React from 'react'
import { number, func } from 'prop-types'
import {
  StyledPagination,
  StyledPageButton,
  StyledArrowButton,
  StyledDottedButton,
  StyledPageCount,
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
}) => {
  const totalPageCount = Math.ceil(totalRows / rowsPerPage)
  const pages = calculatePages(currentPage, totalPageCount)

  return totalPageCount > 1 ? (
    <StyledPagination>
      <StyledArrowButton
        disabled={currentPage === 1}
        onClick={() =>
          onPreviousPageButtonClickedHandler(
            currentPage,
            onPageChangedHandler,
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
            onClick={() => onPageChangedHandler(page)}
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
            onPageChangedHandler,
            /* eslint-disable-next-line */
          )}
        aria-label="Volgende pagina"
      >
        »
      </StyledArrowButton>
      <StyledPageCount>
        Pagina {currentPage} van {totalPageCount}
      </StyledPageCount>
    </StyledPagination>
  ) : null
}

Pagination.propTypes = {
  currentPage: number.isRequired,
  totalRows: number.isRequired,
  rowsPerPage: number.isRequired,
  onPageChangedHandler: func.isRequired,
}

export default Pagination
