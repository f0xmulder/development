import React, { Component } from 'react'
import { Formik } from 'formik'

import { schema } from './validationSchema'
import { RELATION_TYPE_REFERENCE_IMPLEMENTATION } from '../../constants'
import SubmitAPIForm from '../../components/SubmitAPIForm/SubmitAPIForm'
import OnFormikValueChange from '../../components/Form/OnFormikValueChange'
import { modelFromAPIResponse } from '../../models/api'

const initialValues = {
  description: '',
  organizationName: '',
  serviceName: '',
  apiType: 'Onbekend',
  tags: '',

  productionApiUrl: '',
  productionSpecificationUrl: '',
  productionDocumentationUrl: '',

  hasAcceptanceEnvironment: false,
  acceptanceApiUrl: '',
  acceptanceDocumentationUrl: '',
  acceptanceSpecificationUrl: '',

  hasDemoEnvironment: false,
  demoApiUrl: '',
  demoDocumentationUrl: '',
  demoSpecificationUrl: '',

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

export const createRelation = (
  isReferenceImplementation,
  referenceImplementation,
) => {
  return !isReferenceImplementation
    ? {
        [referenceImplementation]: [RELATION_TYPE_REFERENCE_IMPLEMENTATION],
      }
    : undefined
}

export const convertFormDataToRequestBody = (formData) => {
  const toArray = (value) =>
    value
      .split(',')
      .map((v) => v.trim())
      .filter((v) => !!v)

  const requestBody = {}

  /* eslint-disable camelcase */
  requestBody.description = formData.description
  requestBody.organization_name = formData.organizationName
  requestBody.service_name = formData.serviceName
  requestBody.api_type = formData.apiType
  requestBody.tags = toArray(formData.tags)

  requestBody.is_reference_implementation = formData.isReferenceImplementation
  requestBody.relations = createRelation(
    formData.isReferenceImplementation,
    formData.referenceImplementation,
  )

  requestBody.environments = [
    {
      name: 'Productie',
      api_url: formData.productionApiUrl,
      specification_url: formData.productionSpecificationUrl,
      documentation_url: formData.productionDocumentationUrl,
    },
  ]

  if (formData.hasAcceptanceEnvironment) {
    requestBody.environments.push({
      name: 'Acceptance',
      api_url: formData.acceptanceApiUrl,
      specification_url: formData.acceptanceSpecificationUrl,
      documentation_url: formData.acceptanceDocumentationUrl,
    })
  }

  if (formData.hasDemoEnvironment) {
    requestBody.environments.push({
      name: 'Demo',
      api_url: formData.demoApiUrl,
      specification_url: formData.demoSpecificationUrl,
      documentation_url: formData.demoDocumentationUrl,
    })
  }

  formData.contact = formData.contact || {}
  requestBody.contact = {
    email: formData.contact.email,
    phone: formData.contact.phone,
    fax: formData.contact.fax,
    chat: formData.contact.chat,
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
      result: {},
      apisLoaded: false,
      apisError: false,
      storedFormValues, // Only use this to save values when unmounting
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.submitToApi = this.submitToApi.bind(this)
  }

  handleSubmit(values, actions) {
    const formData = schema.cast(values)
    const submitData = convertFormDataToRequestBody(formData)

    return this.submitToApi(submitData)
      .then((responseData) => {
        actions.setSubmitting(false)
        this.setState({
          submitted: true,
          responseData,
          storedFormValues: null,
        })
        this.handleReset()
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

  handleReset = () => {
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

    window && window.addEventListener('beforeunload', this.handleReset)
  }

  componentWillUnmount() {
    sessionStorage.setItem(
      'storedFormValues',
      JSON.stringify(this.state.storedFormValues),
    )

    window && window.removeEventListener('beforeunload', this.handleReset)
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
            enableReinitialize
            onSubmit={this.handleSubmit}
            onReset={this.handleReset}
            validationSchema={schema}
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
