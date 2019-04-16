import React from 'react'
import { withRouter } from 'react-router-dom'
import {Formik, Field, FieldArray} from 'formik'
import {object, func} from 'prop-types'
import './index.css'

const filters = [
    { key: 'tags', label: 'Tags' },
    { key: 'organization_name', label: 'Organisatie' },
    { key: 'api_specification_type', label: 'API type' },
]

const APIFilter = ({ initialValues, facets, onSubmit }) => {
    return (
    <div className="APIFilter">
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
            {({ handleSubmit, values }) => (
                <form onSubmit={handleSubmit}>
                    <label htmlFor="q" name="q" id="q" aria-label="Vul een zoekterm in">
                        <Field type="text" name="q" placeholder="Vul een zoekterm in" />
                    </label>

                    {filters && filters.map((filter, i) => (
                        <React.Fragment key={i}>
                            <h2>{filter.label}</h2>
                            <FieldArray name={filter.key}>
                                {arrayHelpers => (
                                    <React.Fragment>
                                        {facets[filter.key] && facets[filter.key].terms && facets[filter.key].terms.map((facet, index) => (
                                            <label key={index} htmlFor={`${filter.key}.${index}`}>
                                                <Field
                                                    type="checkbox"
                                                    name={`${filter.key}[]`}
                                                    id={`${filter.key}.${index}`}
                                                    value={facet.term}
                                                    checked={values[filter.key].indexOf(facet.term) !== -1}
                                                    onChange={() => {
                                                        values[filter.key].indexOf(facet.term) === -1 ? arrayHelpers.insert(index, facet.term) : arrayHelpers.remove(values[filter.key].indexOf(facet.term))
                                                        setTimeout(() => handleSubmit(), 0)
                                                    }}
                                                />
                                                {facet.term} ({facet.count})
                                            </label>
                                        ))}
                                    </React.Fragment>
                                )}
                            </FieldArray>
                        </React.Fragment>
                    ))}
                </form>
            )}
        </Formik>
    </div>
    )
}
APIFilter.propTypes = {
    facets: object.isRequired,
    onSubmit: func.isRequired
}

export default withRouter(APIFilter)
