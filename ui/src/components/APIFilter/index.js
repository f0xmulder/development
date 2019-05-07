import React from 'react'
import {string, arrayOf, shape, number, bool, func} from 'prop-types'
import CheckboxGroupField from '../CheckboxGroupField'
import Expandable from '../Expandable'
import {StyledAPIFilter} from './index.styles'

const APIFilter = ({ title, name, options, value, onChangeHandler }) => {
  const checkboxGroupField = (
    <CheckboxGroupField
      name={name}
      options={options}
      value={value}
      onChange={onChangeHandler}
    />
  )

  return (
    <StyledAPIFilter>
    <h2>{title}</h2>
    {
      options.length > 3 ?
        <Expandable>{checkboxGroupField}</Expandable> : 
        checkboxGroupField
    }
  </StyledAPIFilter>
  )
}

APIFilter.propTypes = {
  title: string.isRequired,
  name: string.isRequired,
  options: arrayOf(shape({
    value: string.isRequired,
    label: string.isRequired,
    count: number.isRequired,
    disabled: bool.isRequired
  })),
  value: arrayOf(string.isRequired).isRequired,
  onChangeHandler: func
}

APIFilter.defaultProps = {
  onChangeHandler: () => {}
}

export default APIFilter

