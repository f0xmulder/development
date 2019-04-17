import React from 'react'
import { Formik, Field } from 'formik'
import { object, func } from 'prop-types'
import './index.css'
import CheckboxField from '../CheckboxField';

const filters = [
    { key: 'tags', label: 'Tags' },
    { key: 'organization_name', label: 'Organisatie' },
    { key: 'api_specification_type', label: 'API type' },
]

const formatOptions = (terms) => {
    return terms.map((term) => {
        return {
            value: term.term,
            label: `${term.term} (${term.count})`
        }
    })
}

const APIFilter = ({ initialValues, facets, onSubmit }) => (
    <div className="APIFilter">
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
            {({ handleSubmit, values }) => (
                <form onSubmit={handleSubmit}>
                    <label htmlFor="q" name="q" id="q" aria-label="Vul een zoekterm in">
                        <Field type="text" name="q" placeholder="Vul een zoekterm in" />
                    </label>

                    {filters && filters.map((filter, i) => (
                        <React.Fragment key={i}>
                            {facets[filter.key] && facets[filter.key].terms && facets[filter.key].terms.length > 0 && (
                                <React.Fragment>
                                    <h2>{filter.label}</h2>
                                    <CheckboxField
                                        name={filter.key}
                                        options={formatOptions(facets[filter.key].terms)}
                                        value={values[filter.key]}
                                        onChange={handleSubmit}
                                    />
                                </React.Fragment>
                            )}
                        </React.Fragment>
                    ))}
                </form>
            )}
        </Formik>
    </div>
)

APIFilter.propTypes = {
    facets: object.isRequired,
    onSubmit: func.isRequired
}

export default APIFilter
