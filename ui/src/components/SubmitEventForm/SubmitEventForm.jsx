// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import React, { useState } from 'react'
import { Formik } from 'formik'
import { TextInput, Button } from '@commonground/design-system'

import EventRepository from '../../domain/event-repository'
import objectKeysToSnakeCase from '../../utils/objectKeysToSnakeCase'
import { StyledFieldset } from './SubmitEventForm.styles'
import validationSchema from './validationSchema'

const initialValues = {
  title: '',
  startDate: '',
  startTime: '',
  location: '',
  registrationUrl: '',
}

const SubmitEventForm = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [responseData, setResponseData] = useState(null)

  const submitEvent = async (event) => {
    setError(false)
    setLoading(true)

    const submitValues = {
      title: event.title,
      startDate: `${event.startDate}T${event.startTime}`,
      location: event.location,
      registrationUrl: event.registrationUrl,
    }

    try {
      const responseData = await EventRepository.create(
        objectKeysToSnakeCase(submitValues),
      )
      setResponseData(responseData)
    } catch (e) {
      setError(
        'Er ging iets fout tijdens het toevoegen van het event. Gelieve opnieuw te proberen.',
      )
    }

    setLoading(false)
  }

  if (responseData) {
    return (
      <p data-test="event-submitted-message">
        Het event is toegevoegd. Wij zullen deze zo snel mogelijk nakijken.
        Blijf op de hoogte door het issue op GitLab in de gaten te houden.{' '}
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
      onSubmit={submitEvent}
      data-test="form"
    >
      {({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <StyledFieldset>
            <TextInput name="title" size="l">
              Titel
            </TextInput>

            <TextInput type="date" name="startDate" size="l">
              Startdatum
            </TextInput>

            <TextInput type="time" name="startTime" size="l">
              Starttijd
            </TextInput>

            <TextInput name="location" size="l">
              Locatie
            </TextInput>

            <TextInput name="registrationUrl" size="l">
              URL naar event pagina
            </TextInput>
          </StyledFieldset>

          {error && <div data-test="error-message">{error}</div>}

          <Button type="submit" disabled={loading}>
            Event toevoegen
          </Button>
        </form>
      )}
    </Formik>
  )
}

export default SubmitEventForm
