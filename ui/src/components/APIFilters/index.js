import React from 'react'
import { Formik } from 'formik'
import { object, func } from 'prop-types'
import {StyledAPIFilters} from './index.styles'
import APIFilter from '../APIFilter'

const filters = [
    { key: 'tags', label: 'Tags' },
    { key: 'organization_name', label: 'Organisatie' },
    { key: 'api_type', label: 'API type' },
]

export const formatOptions = (terms) =>
  terms
    .map((term) => ({ 
      value: term.term,
      label: `${term.term}`,
      count: term.count,
      disabled: (term.count === 0)
    }))

export const facetsContainTermsForFilterByKey = (facets, filterKey) =>
  facets[filterKey] && facets[filterKey].terms && facets[filterKey].terms.length > 0

const APIFilters = ({ initialValues, facets, onSubmit, ...props }) =>
  <StyledAPIFilters {...props}>
      <Formik initialValues={initialValues} onSubmit={onSubmit} enableReinitialize={true}>
          {({ handleSubmit, values }) => (
            <form onSubmit={handleSubmit}>
                  {filters && filters.length ? 
                      filters
                      .filter(filter => facetsContainTermsForFilterByKey(facets, filter.key))
                      .map((filter, i) => (
                        <APIFilter key={i}
                          title={filter.label}
                          name={filter.key} 
                          options={formatOptions(facets[filter.key].terms)}
                          value={values[filter.key]}
                          onChangeHandler={handleSubmit}
                        />
                      )) : null}
              </form>
          )}
      </Formik>
  </StyledAPIFilters>

APIFilters.propTypes = {
    facets: object,
    onSubmit: func.isRequired
}

export default APIFilters
