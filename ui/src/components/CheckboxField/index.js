import React from 'react'
import { Field, FieldArray } from 'formik'

const CheckboxField = ({ facets, filter, values, handleSubmit }) => (
    <FieldArray name={filter.key}>
        {arrayHelpers => (
            <React.Fragment>
                {facets[filter.key] && facets[filter.key].terms && facets[filter.key].terms.map((facet, index) => (
                    <label key={index} htmlFor={`${filter.key}.${index}`}>
                        <Field
                            type="checkbox"
                            name={`${filter.key}.${index}`}
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
)

export default CheckboxField