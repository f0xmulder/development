import React, { Component } from 'react'
import { Formik } from 'formik'

import validationSchema from './validationSchema'
import { RELATION_TYPE_REFERENCE_IMPLEMENTATION } from '../../constants'
import SubmitAPIForm from '../../components/SubmitAPIForm/SubmitAPIForm'
import OnFormikValueChange from '../../components/Form/OnFormikValueChange'
import { modelFromAPIResponse } from '../../models/api'

const initialValues = {
  description: '',
  organizationName: '',
  serviceName: '',
  apiURL: '',
  apiType: 'Onbekend',
  specificationURL: '',
  documentationURL: '',
  tags: [],
  badges: '',
  contact: {
    email: '',
    phone: '',
    fax: '',
    chat: '',
    url: '',
  },
  termsOfUse: {
    governmentOnly: false,
    payPerUse: false,
    uptimeGuarantee: 99.5,
    supportResponseTime: '',
  },
  isReferenceImplementation: false,
  referenceImplementation: '',
}

const arrayFields = ['tags', 'badges']

export const convertLinkToRIToRelation = (formData) => {
  if (formData.referenceImplementation) {
    formData.relations = {
      [formData.referenceImplementation]: [
        RELATION_TYPE_REFERENCE_IMPLEMENTATION,
      ],
    }
  }

  delete formData.referenceImplementation

  return formData
}

export const convertRIFormDataToAPIDefinition = (formData) => {
  formData.referenceImplementation = !formData.isReferenceImplementation
    ? formData.referenceImplementation
    : ''

  formData = convertLinkToRIToRelation(formData)
  return formData
}

export const mapFormValuesToAPIRequestBody = (formValues) => {
  /* eslint-disable camelcase */
  const requestBody = {}

  requestBody.description = formValues.description
  requestBody.organization_name = formValues.organizationName
  requestBody.service_name = formValues.organizationName
  requestBody.api_url = formValues.apiURL
  requestBody.api_type = formValues.apiType
  requestBody.specification_url = formValues.specificationURL
  requestBody.documentation_url = formValues.documentationURL
  requestBody.tags = formValues.tags
  requestBody.badges = formValues.badges
  requestBody.is_reference_implementation = formValues.isReferenceImplementation
  requestBody.reference_implementation = formValues.referenceImplementation

  formValues.contact = formValues.contact || {}
  requestBody.contact = {
    email: formValues.contact.email,
    phone: formValues.contact.phone,
    fax: formValues.contact.fax,
    chat: formValues.contact.chat,
    url: formValues.contact.url,
  }

  formValues.termsOfUse = formValues.termsOfUse || {}
  requestBody.terms_of_use = {
    government_only: formValues.termsOfUse.governmentOnly,
    pay_per_use: formValues.termsOfUse.payPerUse,
    uptime_guarantee: formValues.termsOfUse.uptimeGuarantee,
    support_response_time: formValues.termsOfUse.supportResponseTime,
  }

  /* eslint-enable camelcase */

  return requestBody
}

class SubmitAPIFormPage extends Component {
  constructor(props) {
    super(props)

    const sessionFormValues = sessionStorage.getItem('storedFormValues')
    let storedFormValues = null
    try {
      storedFormValues = JSON.parse(sessionFormValues)
    } catch (e) {}

    this.state = {
      submitted: false,
      responseData: {},
      result: {},
      apisLoaded: false,
      apisError: false,
      storedFormValues, // Only use this to save values when unmounting
    }

    this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit(values = {}, actions = {}) {
    let data = validationSchema.cast(values)

    arrayFields.forEach((fieldName) => {
      data[fieldName] = data[fieldName]
        ? data[fieldName].split(',').map((v) => v.trim())
        : []
    })

    data = convertRIFormDataToAPIDefinition(data)
    data = mapFormValuesToAPIRequestBody(data)

    return this.submitToApi(data)
      .then((responseData) => {
        actions.setSubmitting(false)
        this.setState({
          submitted: true,
          responseData,
          storedFormValues: null,
        })
        this.onReset()
      })
      .catch((error) => {
        actions.setSubmitting(false)
        actions.setStatus({
          msg:
            'Er ging iets fout tijdens het toevoegen van de API. Gelieve opnieuw te proberen.',
        })
        console.error(error)
      })
  }

  submitToApi(data) {
    return fetch('/api/submit-api', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((response) => {
      if (response.ok) {
        return response.json()
      } else {
        throw new Error('Er ging iets fout tijdens het toevoegen van de API.')
      }
    })
  }

  formikValueChange = (values) => {
    this.setState({ storedFormValues: values })
  }

  onReset = () => {
    sessionStorage.removeItem('storedFormValues')
    this.setState({ storedFormValues: null })
  }

  fetchApiList() {
    return fetch('/api/apis').then((response) => {
      if (response.ok) {
        return response.json()
      } else {
        throw new Error(
          `Er ging iets fout tijdens het ophalen van de beschikbare API's`,
        )
      }
    })
  }

  componentDidMount() {
    this.fetchApiList()
      .then((response) =>
        Object.assign({}, response, {
          apis: response.apis.map((api) => modelFromAPIResponse(api)),
        }),
      )
      .then(
        (result) => {
          this.setState({ result, apisLoaded: true })
        },
        (error) => {
          this.setState({ apisError: true, apisLoaded: true })
          console.error(error)
        },
      )

    window && window.addEventListener('beforeunload', this.onReset)
  }

  componentWillUnmount() {
    sessionStorage.setItem(
      'storedFormValues',
      JSON.stringify(this.state.storedFormValues),
    )

    window && window.removeEventListener('beforeunload', this.onReset)
  }

  render() {
    const {
      storedFormValues,
      result: { apis },
      apisLoaded,
    } = this.state

    return apisLoaded ? (
      <div>
        {this.state.submitted ? (
          <p data-test="api-submitted-message">
            De API is toegevoegd. Wij zullen deze zo snel mogelijk nakijken.
            Blijf op de hoogte door het issue op GitLab in de gaten te houden.{' '}
            <a
              href={this.state.responseData.web_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {this.state.responseData.web_url}
            </a>
            .
          </p>
        ) : (
          <Formik
            initialValues={storedFormValues || initialValues}
            enableReinitialize={true}
            onSubmit={this.onSubmit}
            onReset={this.onReset}
            validationSchema={validationSchema}
          >
            {(props) => (
              <>
                <OnFormikValueChange handle={this.formikValueChange} />
                <SubmitAPIForm {...props} apis={apis} />
              </>
            )}
          </Formik>
        )}
      </div>
    ) : null
  }
}

export default SubmitAPIFormPage
