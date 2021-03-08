// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import React, { Component } from 'react'
import { Formik } from 'formik'
import Cookies from 'js-cookie'

import { RELATION_TYPE_REFERENCE_IMPLEMENTATION } from '../../constants'
import SubmitAPIForm from '../../components/SubmitAPIForm/SubmitAPIForm'
import OnFormikValueChange from '../../components/Form/OnFormikValueChange'
import { modelFromAPIResponse } from '../../models/api'
import { EnvironmentType } from '../../models/enums'
import { schema } from './validationSchema'

const initialValues = {
  description: '',
  organizationName: '',
  organizationOin: '',
  serviceName: '',
  apiType: 'unknown',
  apiAuthentication: '',

  productionApiUrl: '',
  productionSpecificationUrl: '',
  productionDocumentationUrl: '',

  hasAcceptanceEnvironment: 'false',
  acceptanceApiUrl: '',
  acceptanceDocumentationUrl: '',
  acceptanceSpecificationUrl: '',

  hasDemoEnvironment: 'false',
  demoApiUrl: '',
  demoDocumentationUrl: '',
  demoSpecificationUrl: '',

  contact: {
    email: '',
    phone: '',
    url: '',
  },
  termsOfUse: {
    governmentOnly: false,
    payPerUse: false,
    uptimeGuarantee: 99.5,
    supportResponseTime: '',
  },
  isBasedOnReferenceImplementation: 'false',
  referenceImplementation: '',
}

export const createRelation = (
  isBasedOnReferenceImplementation,
  referenceImplementation,
) => {
  return isBasedOnReferenceImplementation
    ? {
        [referenceImplementation]: [RELATION_TYPE_REFERENCE_IMPLEMENTATION],
      }
    : undefined
}

export const convertFormDataToRequestBody = (formData) => {
  const requestBody = {}

  /* eslint-disable camelcase */
  requestBody.description = formData.description
  requestBody.organization_name = formData.organizationName
  requestBody.organization_oin = formData.organizationOin
  requestBody.service_name = formData.serviceName
  requestBody.api_type = formData.apiType
  requestBody.api_authentication = formData.apiAuthentication

  requestBody.relations = createRelation(
    formData.isBasedOnReferenceImplementation,
    formData.referenceImplementation,
  )

  requestBody.environments = [
    {
      name: EnvironmentType.PRODUCTION.value,
      api_url: formData.productionApiUrl,
      specification_url: formData.productionSpecificationUrl,
      documentation_url: formData.productionDocumentationUrl,
    },
  ]

  if (formData.hasAcceptanceEnvironment) {
    requestBody.environments.push({
      name: EnvironmentType.ACCEPTANCE.value,
      api_url: formData.acceptanceApiUrl,
      specification_url: formData.acceptanceSpecificationUrl,
      documentation_url: formData.acceptanceDocumentationUrl,
    })
  }

  if (formData.hasDemoEnvironment) {
    requestBody.environments.push({
      name: EnvironmentType.DEMO.value,
      api_url: formData.demoApiUrl,
      specification_url: formData.demoSpecificationUrl,
      documentation_url: formData.demoDocumentationUrl,
    })
  }

  formData.contact = formData.contact || {}
  requestBody.contact = {
    email: formData.contact.email,
    phone: formData.contact.phone,
    url: formData.contact.url,
  }

  formData.termsOfUse = formData.termsOfUse || {}
  requestBody.terms_of_use = {
    government_only: formData.termsOfUse.governmentOnly,
    pay_per_use: formData.termsOfUse.payPerUse,
    uptime_guarantee: formData.termsOfUse.uptimeGuarantee,
    support_response_time: formData.termsOfUse.supportResponseTime,
  }
  /* eslint-enable camelcase */

  return requestBody
}

class SubmitAPIFormPage extends Component {
  constructor(props) {
    super(props)

    let storedFormValues = null
    try {
      storedFormValues = JSON.parse(sessionStorage.getItem('storedFormValues'))
    } catch (e) {}

    this.state = {
      submitted: false,
      responseData: {},
      result: {
        apis: [],
      },
      apisLoaded: false,
      apisError: false,
      storedFormValues, // Only use this to save values when unmounting
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.submitToApi = this.submitToApi.bind(this)
  }

  async componentDidMount() {
    window && window.addEventListener('beforeunload', this.handleReset)
  }

  componentWillUnmount() {
    sessionStorage.setItem(
      'storedFormValues',
      JSON.stringify(this.state.storedFormValues),
    )

    window && window.removeEventListener('beforeunload', this.handleReset)
  }

  async handleSubmit(values, actions) {
    // The form has already passed validation,
    // this call serves only to apply Yup type coercion and transforms.
    const parsedFormData = schema.validateSync(values)
    const submitData = convertFormDataToRequestBody(parsedFormData)

    try {
      const responseData = await this.submitToApi(submitData)
      actions.setSubmitting(false)
      this.setState({
        submitted: true,
        responseData,
        storedFormValues: null,
      })
      this.handleReset()
    } catch (error) {
      actions.setSubmitting(false)
      actions.setStatus({
        msg:
          'Er ging iets fout tijdens het toevoegen van de API. Gelieve opnieuw te proberen.',
      })
      console.error(error)
    }
  }

  async submitToApi(data) {
    const response = await fetch('/api/submit-api', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': Cookies.get('csrftoken'),
      },
    })
    if (response.ok) {
      return response.json()
    } else {
      throw new Error('Er ging iets fout tijdens het toevoegen van de API.')
    }
  }

  formikValueChange = (values) => {
    const { isBasedOnReferenceImplementation } = values

    if (isBasedOnReferenceImplementation === 'true') {
      this.callAPIAndModelResponse()
    }

    this.setState({ storedFormValues: values })
  }

  handleReset = () => {
    sessionStorage.removeItem('storedFormValues')
    this.setState({ storedFormValues: null })
  }

  async fetchApiList() {
    const response = await fetch(
      `/api/apis?rowsPerPage=${Number.MAX_SAFE_INTEGER}&isReferenceImplementation=true`,
    )
    if (response.ok) {
      return response.json()
    } else {
      throw new Error(
        `Er ging iets fout tijdens het ophalen van de beschikbare API's`,
      )
    }
  }

  async callAPIAndModelResponse() {
    try {
      const response = await this.fetchApiList()
      const result = {
        apis: response.results.map((api) => modelFromAPIResponse(api)),
      }
      this.setState({ result, apisLoaded: true })
    } catch (error) {
      this.setState({ apisError: true, apisLoaded: true })
      console.error(error)
    }
  }

  render() {
    const {
      storedFormValues,
      result: { apis },
      apisLoaded,
      apisError,
    } = this.state

    return (
      <div>
        {this.state.submitted ? (
          <p data-test="api-submitted-message">
            De API is toegevoegd. Wij zullen deze zo snel mogelijk nakijken.
          </p>
        ) : (
          <Formik
            initialValues={storedFormValues || initialValues}
            onSubmit={this.handleSubmit}
            onReset={this.handleReset}
            validationSchema={schema}
          >
            {(props) => (
              <>
                <OnFormikValueChange handle={this.formikValueChange} />
                <SubmitAPIForm
                  {...props}
                  apis={{ data: apis, loaded: apisLoaded, error: apisError }}
                />
              </>
            )}
          </Formik>
        )}
      </div>
    )
  }
}

export default SubmitAPIFormPage
