import React from 'react'
import { string, arrayOf, shape, func } from 'prop-types'
import { Field, FieldArray } from 'formik'

const CheckboxField = ({ name, options, value, onChange }) => (
    <FieldArray name={name}>
        {arrayHelpers => (
            <React.Fragment>
                {options.map((option, index) => (
                    <label key={index} htmlFor={`${name}.${index}`}>
                        <Field
                            type='checkbox'
                            id={`${name}.${index}`}
                            name={`${name}.${index}`}
                            value={option.value}
                            checked={value.indexOf(option.value) !== -1}
                            onChange={() => {
                                value.indexOf(option.value) === -1 ? arrayHelpers.insert(index, option.value) : arrayHelpers.remove(value.indexOf(option.value))
                                onChange && setTimeout(() => onChange(), 0)
                            }}
                        />
                        {option.label}
                    </label>
                ))}
            </React.Fragment>
        )}
    </FieldArray>
)

CheckboxField.propTypes = {
    name: string.isRequired,
    options: arrayOf(shape({
        value: string.isRequired,
        label: string.isRequired
    })),
    onChange: func.isRequired
}

CheckboxField.defaultProps = {
    onChange: null
}

export default CheckboxField
