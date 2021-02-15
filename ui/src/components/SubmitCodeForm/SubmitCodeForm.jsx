// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import React, { useState, useEffect } from 'react'
import { array, bool, string, oneOf } from 'prop-types'
import Select from 'react-select'
import { Formik } from 'formik'
import { TextInput, Button, ErrorMessage } from '@commonground/design-system'

import CodeRepository from '../../domain/code-repository'
import objectKeysToSnakeCase from '../../utils/objectKeysToSnakeCase'
import { modelFromAPIResponse } from '../../models/api'
import { GITLAB_REPO_URL } from '../../constants'
import {
  StyledFieldset,
  HelperMessage,
  StyledAlert,
  getReactSelectStyle,
  Label,
  Spacing,
} from './SubmitCodeForm.styles'
import validationSchema from './validationSchema'

const initialValues = {
  url: '',
  relatedApis: [],
}

const SubmitCodeForm = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [responseData, setResponseData] = useState(null)
  const [apis, setApis] = useState([])

  async function fetchApiList() {
    const response = await fetch(
      `/api/apis?rowsPerPage=${Number.MAX_SAFE_INTEGER}`,
    )
    if (response.ok) {
      return response.json()
    } else {
      throw new Error(
        `Er ging iets fout tijdens het ophalen van de beschikbare API's`,
      )
    }
  }

  async function loadApis() {
    try {
      const response = await fetchApiList()
      const apis = response.results.map((api) => modelFromAPIResponse(api))
      setApis(apis)
    } catch (e) {
      console.error(e.message)
      setError(e.message)
    }
  }

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(
    () => {
      loadApis()
    },
    [] /* Only load once */,
  )
  /* eslint-enable react-hooks/exhaustive-deps */

  const submitCode = async (code) => {
    setError(false)
    setLoading(true)

    const submitValues = {
      url: code.url,
      relatedApis: code.relatedApis,
    }

    try {
      const responseData = await CodeRepository.create(
        objectKeysToSnakeCase(submitValues),
      )
      setResponseData(responseData)
    } catch (e) {
      if (e.message) {
        setError(e.message)
      } else {
        setError(
          'Er ging iets fout tijdens het toevoegen van de code. Gelieve opnieuw te proberen.',
        )
      }
    }

    setLoading(false)
  }

  if (responseData) {
    return (
      <p data-test="code-submitted-message">
        De code is toegevoegd.{' '}
        <a
          href={responseData.web_url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {responseData.web_url}
        </a>
      </p>
    )
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={submitCode}
      data-test="form"
    >
      {({ errors, touched, handleSubmit, setFieldValue, setFieldTouched }) => (
        <form onSubmit={handleSubmit} data-testid="form">
          <StyledFieldset disabled={loading || !!error}>
            <StyledAlert variant="info">
              Momenteel kunnen alleen projecten toegevoegd worden die een API
              gebruiken uit het API overzicht van Developer Overheid.
              <br />
              <br />
              Ook graag een ander project toevoegen? Laat het ons weten via
              GitLab.
              <br />
              <br />
              <a
                href={`${GITLAB_REPO_URL}/issues`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Melding maken op GitLab
              </a>
            </StyledAlert>

            <TextInput name="url" size="l">
              Project URL
              <HelperMessage>
                We ondersteunen URLs van GitLab repositories/snippets en GitHub
                repositories/gists.
              </HelperMessage>
            </TextInput>

            <Spacing>
              <Label htmlFor="relatedApis">Gebruikte API('s)</Label>
              <Select
                component="select"
                name="relatedApis"
                maxWidth="large"
                isMulti="true"
                placeholder="Selecteer één of meerdere API's"
                onChange={(value) => setFieldValue('relatedApis', value)}
                onBlur={() => setFieldTouched('relatedApis')}
                styles={getReactSelectStyle({
                  hasError: !!errors.relatedApis && !!touched.relatedApis,
                })}
                options={apis.map((api) => ({
                  value: api.id,
                  label: api.organizationName + ' - ' + api.serviceName,
                }))}
              />
            </Spacing>
            {errors.relatedApis && touched.relatedApis && (
              <ErrorMessage data-test="error-message">
                {errors.relatedApis}
              </ErrorMessage>
            )}
            {error && <ErrorMessage>{error}</ErrorMessage>}
          </StyledFieldset>
          <Button type="submit" disabled={loading || !!error}>
            Project toevoegen
          </Button>
        </form>
      )}
    </Formik>
  )
}

// Change children from 'string' to 'array' as we include HelperMessage in TextInput
TextInput.propTypes = {
  showError: bool,
  children: array.isRequired,
  name: string.isRequired,
  size: oneOf(['xs', 's', 'm', 'l', 'xl']),
  disabled: bool,
}

export default SubmitCodeForm
