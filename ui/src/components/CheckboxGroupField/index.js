import React from 'react'
import { string, arrayOf, shape, func, bool, number } from 'prop-types'
import { FieldArray } from 'formik'
import {StyledCheckboxGroupField,StyledCheckboxField} from './index.styles'
 
const CheckboxGroupField = ({ name, options, value, onChange }) => (
    <FieldArray name={name}>
        {arrayHelpers => (
            <React.Fragment>
                {options.map((option, index) => (
                  <StyledCheckboxGroupField key={index}> 
                        <StyledCheckboxField
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
                        <span className="count">
                          {option.count}
                        </span>
                    </StyledCheckboxGroupField>
                ))}
            </React.Fragment>
        )}
    </FieldArray>
)

CheckboxGroupField.propTypes = {
    name: string.isRequired,
    options: arrayOf(shape({
        value: string.isRequired,
        count: number.isRequired,
        label: string.isRequired,
        disabled: bool
    })),
    onChange: func.isRequired,
    value: arrayOf(string.isRequired).isRequired
}

CheckboxGroupField.defaultProps = {
    onChange: null
}

export default CheckboxGroupField
