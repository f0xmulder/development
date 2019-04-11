import React from 'react'
import {Formik, Field, FieldArray} from 'formik'
import {arrayOf, shape, string, func} from 'prop-types'

const APIFilter = ({ apis, onSubmit }) =>
    <div className="APIFilter">
        <Formik
            initialValues={{ tags: [], organization_name: [], api_specification_type: [] }}
            onSubmit={onSubmit}
        >
            {({ handleSubmit, values }) => (
                <form onSubmit={handleSubmit}>
                    <h4>Tags</h4>
                    <FieldArray name="tags">
                        {arrayHelpers => (
                                <React.Fragment>
                                    {['zgw', 'amsterdam'].map((value, index) => (
                                        <label key={index} htmlFor={`tags.${index}`}>
                                            <Field
                                                type="checkbox"
                                                name={`tags.${index}`}
                                                id={`tags.${index}`}
                                                value={value}
                                                onChange={() => {
                                                    values.tags.indexOf(value) === -1 ? arrayHelpers.insert(index, value) : arrayHelpers.remove(values.tags.indexOf(value))
                                                    setTimeout(() => handleSubmit(), 0)
                                                }}
                                            />
                                            {value}
                                        </label>
                                    ))}
                                </React.Fragment>
                        )}
                    </FieldArray>

                    <h4>Organisatie</h4>
                    <FieldArray name="organization_name">
                        {arrayHelpers => (
                                <React.Fragment>
                                    {['VNG', 'DB1'].map((value, index) => (
                                        <label key={index} htmlFor={`organization_name.${index}`}>
                                            <Field
                                                type="checkbox"
                                                name={`organization_name.${index}`}
                                                id={`organization_name.${index}`}
                                                value={value}
                                                onChange={() => {
                                                    values.organization_name.indexOf(value) === -1 ? arrayHelpers.insert(index, value) : arrayHelpers.remove(values.organization_name.indexOf(value))
                                                    setTimeout(() => handleSubmit(), 0)
                                                }}
                                            />
                                            {value}
                                        </label>
                                    ))}
                                </React.Fragment>
                        )}
                    </FieldArray>


                    <h4>API type</h4>
                    <FieldArray name="api_specification_type">
                        {arrayHelpers => (
                                <React.Fragment>
                                    {['OAS2', 'OAS3', 'gRPC'].map((value, index) => (
                                        <label key={index} htmlFor={`api_specification_type.${index}`}>
                                            <Field
                                                type="checkbox"
                                                name={`api_specification_type.${index}`}
                                                id={`api_specification_type.${index}`}
                                                value={value}
                                                onChange={() => {
                                                    values.api_specification_type.indexOf(value) === -1 ? arrayHelpers.insert(index, value) : arrayHelpers.remove(values.api_specification_type.indexOf(value))
                                                    setTimeout(() => handleSubmit(), 0)
                                                }}
                                            />
                                            {value}
                                        </label>
                                    ))}
                                </React.Fragment>
                        )}
                    </FieldArray>
                </form>
            )}
        </Formik>
    </div>

APIFilter.propTypes = {
    apis: arrayOf(shape({
        id: string.isRequired,
        service_name: string.isRequired,
        organization_name: string.isRequired
    })),
    onSubmit: func.isRequired
}

export default APIFilter
