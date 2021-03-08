// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//

import React from 'react'
import { object } from 'prop-types'
import { Spinner } from '@commonground/design-system'
import { StyledReactSelectAsync } from './SubmitAPIForm.styles'

const mapResult = (data) => {
  return data.map((organisatie) => ({
    label: organisatie.naam,
    value: organisatie.oin,
  }))
}

const loadOptions = async (search, _, { page }) => {
  const result = await fetch(
    `/api/cor/?q=${search}&status=Actief&fields=naam,oin&page=${page}`,
  )
  const data = await result.json()

  const options = mapResult(data.results)

  const hasMore = Math.ceil(data.totalResults / data.rowsPerPage) > data.page

  return {
    options,
    hasMore,
    additional: {
      page: page + 1,
    },
  }
}

const LoadingIndicator = () => {
  return <Spinner />
}

const SelectAsync = ({ field, form: { setFieldValue, ...form }, ...props }) => {
  return (
    <StyledReactSelectAsync
      {...field}
      {...props}
      classNamePrefix="ReactSelect"
      cacheOptions
      loadOptions={loadOptions}
      loadingMessage={() => 'Organisaties aan het ophalen ...'}
      noOptionsMessage={() => 'Niets gevonden!'}
      defaultOptions
      label={field.value && field.value.label}
      value={field.value && field.value.value}
      onChange={(option) => {
        setFieldValue(field.name, option.label)
        setFieldValue('organizationOin', option.value)
      }}
      size="l"
      debounceTimeout={300}
      components={{ LoadingIndicator }}
      additional={{
        page: 1,
      }}
    />
  )
}

SelectAsync.propTypes = {
  field: object,
  form: object,
}

export default SelectAsync
