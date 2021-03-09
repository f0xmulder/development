// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import React, { useState } from 'react'
import { object } from 'prop-types'
import { Spinner, ErrorMessage } from '@commonground/design-system'
import CorRepository from '../../domain/cor-repository'
import {
  StyledLink,
  StyledMessage,
  StyledReactSelectAsync,
  StyledResultContainer,
  StyledField,
} from './SelectAsync.styles'

const SelectAsync = ({ field, form: { setFieldValue }, ...props }) => {
  const [hasError, setError] = useState(false)

  const mapResult = (data) => {
    return data.map((organisatie) => ({
      label: (
        <StyledResultContainer>
          {organisatie.naam}
          {organisatie.hoofdOIN?.naam && (
            <small>({organisatie.hoofdOIN?.naam})</small>
          )}
        </StyledResultContainer>
      ),
      value: organisatie.oin,
    }))
  }

  const loadOptions = async (search, _, { page }) => {
    setError(false)
    try {
      const data = await CorRepository.search(search, page)
      const hasMore =
        Math.ceil(data.totalResults / data.rowsPerPage) > data.page

      const options = mapResult(data.results)

      return {
        options,
        hasMore,
        additional: {
          page: page + 1,
        },
      }
    } catch (err) {
      console.error('error', err)
      setError(true)
      return {
        options: [],
        hasMore: false,
      }
    }
  }

  const LoadingIndicator = () => {
    return <Spinner />
  }

  if (hasError) {
    return (
      <StyledField
        type="text"
        size="l"
        value={field.value}
        onChange={(event) => {
          setFieldValue(field.name, event.target.value)
        }}
      />
    )
  }

  return (
    <>
      <StyledReactSelectAsync
        {...field}
        {...props}
        classNamePrefix="ReactSelect"
        cacheOptions
        loadOptions={loadOptions}
        loadingMessage={() => (
          <StyledMessage>Organisaties aan het ophalen ...</StyledMessage>
        )}
        noOptionsMessage={() => (
          <StyledMessage>
            {hasError ? 'Kan organisaties niet ophalen.' : 'Niets gevonden!'}
          </StyledMessage>
        )}
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
      {hasError && (
        <ErrorMessage>
          Kan organisaties niet ophalen. <br />
          Probeer het later nog eens of voeg de API{' '}
          <StyledLink to="/apis/add/merge-request">via een MR toe</StyledLink>.
        </ErrorMessage>
      )}
    </>
  )
}

SelectAsync.propTypes = {
  field: object,
  form: object,
}

export default SelectAsync
