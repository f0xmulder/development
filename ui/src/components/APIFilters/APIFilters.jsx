// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import React, { useState } from 'react'
import { Formik } from 'formik'
import PropTypes from 'prop-types'

import { breakpoints } from '../../theme'
import APIFilter from '../APIFilter/APIFilter'

import { ReactComponent as FilterIcon } from '../Icons/filter-icon.svg'
import { StyledFilterButton, StyledAPIFilters } from './APIFilters.styles'

const filters = [
  { key: 'api_type', label: 'API type' },
  { key: 'organization_name', label: 'Organisatie' },
]

export const formatOptions = (terms) =>
  terms.map((term) => ({
    value: term.term,
    label: `${term.term}`,
    count: term.count,
    disabled: term.count === 0,
  }))

export const facetsContainTermsForFilterByKey = (facets, filterKey) =>
  facets[filterKey] &&
  facets[filterKey].terms &&
  facets[filterKey].terms.length > 0

const APIFilters = ({ initialValues, facets, onSubmit, ...props }) => {
  const isMobile = window.innerWidth < breakpoints.md
  const [showFilters, setShowFilters] = useState(!isMobile)

  return (
    <>
      <StyledFilterButton
        onClick={() => setShowFilters(!showFilters)}
        showFilters={showFilters}
      >
        <FilterIcon />
        Filters
      </StyledFilterButton>
      <StyledAPIFilters showFilters={showFilters} {...props}>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          enableReinitialize
        >
          {({ handleSubmit, values }) => (
            <form onSubmit={handleSubmit}>
              {filters && filters.length
                ? filters
                    .filter((filter) =>
                      facetsContainTermsForFilterByKey(facets, filter.key),
                    )
                    .map((filter, i) => (
                      <APIFilter
                        key={i}
                        title={filter.label}
                        name={filter.key}
                        options={formatOptions(facets[filter.key].terms)}
                        value={values[filter.key] || []}
                        onChangeHandler={handleSubmit}
                      />
                    ))
                : null}
            </form>
          )}
        </Formik>
      </StyledAPIFilters>
    </>
  )
}

APIFilters.propTypes = {
  initialValues: PropTypes.object,
  facets: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
}

export default APIFilters
