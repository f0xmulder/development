import React from 'react'
import {string, arrayOf, shape, number, bool, func} from 'prop-types'
import CheckboxGroupField from '../CheckboxGroupField'
import {StyledAPIFilter} from './index.styles'

const APIFilter = ({ title, name, options, value, onChangeHandler }) =>
  <StyledAPIFilter>
    <h2>{title}</h2>
    <CheckboxGroupField
      name={name}
      options={options}
      value={value}
      onChange={onChangeHandler}
    />
  </StyledAPIFilter>

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

