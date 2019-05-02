import React from 'react'
import { Formik, Field } from 'formik'
import { object, func } from 'prop-types'
import {StyledAPIFilters} from './index.styles'
import './index.css'
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

const APIFilters = ({ initialValues, facets, onSubmit }) =>
  <StyledAPIFilters>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
          {({ handleSubmit, values }) => (
              <form onSubmit={handleSubmit}>
                  <label htmlFor="q" name="q" id="q" aria-label="Vul een zoekterm in">
                      <Field type="text" name="q" placeholder="Vul een zoekterm in" />
                  </label>

                  {filters ? filters.map((filter, i) => (
                    <React.Fragment key={i}>
                      {facets[filter.key] && facets[filter.key].terms && facets[filter.key].terms.length > 0 && (
                        <APIFilter title={filter.label}
                                   name={filter.key} 
                                   options={formatOptions(facets[filter.key].terms)}
                                   value={values[filter.key]}
                                   onChangeHandler={handleSubmit}
                        />
                      )}
                    </React.Fragment>
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
