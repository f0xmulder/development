import React from 'react'
import { string, arrayOf, shape, func, bool } from 'prop-types'
import { Field, FieldArray } from 'formik'
import './index.css'

const CheckboxField = ({ name, options, value, onChange }) => (
    <FieldArray name={name}>
        {arrayHelpers => (
            <React.Fragment>
                {options.map((option, index) => (
                    <div key={index} className="CheckboxField">
                        <Field
                            type="checkbox"
                            id={`${name}.${index}`}
                            name={`${name}.${index}`}
                            value={option.value}
                            checked={value.indexOf(option.value) !== -1}
                            disabled={option.disabled}

                            onChange={() => {
                                value.indexOf(option.value) === -1 ? arrayHelpers.insert(index, option.value) : arrayHelpers.remove(value.indexOf(option.value))
                                onChange && setTimeout(() => onChange(), 0)
                            }}
                        />
                        <label key={index} htmlFor={`${name}.${index}`}>{option.label}</label>
                    </div>
                ))}
            </React.Fragment>
        )}
    </FieldArray>
)

CheckboxField.propTypes = {
    name: string.isRequired,
    options: arrayOf(shape({
        value: string.isRequired,
        label: string.isRequired,
        disabled: bool
    })),
    onChange: func.isRequired,
    value: arrayOf(string.isRequired).isRequired
}

CheckboxField.defaultProps = {
    onChange: null
}

export default CheckboxField
