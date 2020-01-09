import React, { Component } from 'react'
import { Formik, FormikHelpers } from 'formik'

import { GoApi, Api } from '../../models/apiTypes'
import { RELATION_TYPE_REFERENCE_IMPLEMENTATION } from '../../constants'
import SubmitAPIForm from '../../components/SubmitAPIForm/SubmitAPIForm'
import OnFormikValueChange from '../../components/Form/OnFormikValueChange'
import { modelFromAPIResponse } from '../../models/api'

import { schema, SchemaType } from './validationSchema'

const initialValues: SchemaType = {
  description: '',
  organizationName: '',
  serviceName: '',
  apiUrl: '',
  apiType: 'Onbekend',
  specificationUrl: '',
  documentationUrl: '',
  tags: '',
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

export const createRelation = (
  isReferenceImplementation: SchemaType['isReferenceImplementation'],
  referenceImplementation: SchemaType['referenceImplementation'] = '',
): Api['relations'] => {
  return !isReferenceImplementation
    ? {
        [referenceImplementation]: [RELATION_TYPE_REFERENCE_IMPLEMENTATION],
      }
    : undefined
}

export const convertFormDataToRequestBody = (formData: SchemaType): GoApi => {
  const toArray = (value: string): string[] =>
    value
      .split(',')
      .map((v: string) => v.trim())
      .filter((v) => !!v)

  const requestBody = {} as GoApi

  /* eslint-disable @typescript-eslint/camelcase */
  requestBody.description = formData.description
  requestBody.organization_name = formData.organizationName
  requestBody.service_name = formData.serviceName
  requestBody.api_url = formData.apiUrl
  requestBody.api_type = formData.apiType
  requestBody.specification_url = formData.specificationUrl
  requestBody.documentation_url = formData.documentationUrl
  requestBody.tags = toArray(formData.tags)
  requestBody.badges = toArray(formData.badges)

  requestBody.is_reference_implementation = formData.isReferenceImplementation
  requestBody.relations = createRelation(
    formData.isReferenceImplementation,
    formData.referenceImplementation,
  )

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
  /* eslint-enable @typescript-eslint/camelcase */

  return requestBody
}

type Props = {}

type State = {
  submitted: boolean
  responseData: {
    web_url: string
  }
  result: {
    apis: Api[]
  }
  apisLoaded: boolean
  apisError: boolean
  storedFormValues: SchemaType | null
}

class SubmitAPIFormPage extends Component<Props, State> {
  constructor(props: Props) {
    super(props)

    let storedFormValues = null
    try {
      storedFormValues = JSON.parse(sessionStorage.getItem(
        'storedFormValues',
      ) as string)
    } catch (e) {}

    this.state = {
      submitted: false,
      responseData: {} as State['responseData'],
      result: {} as State['result'],
      apisLoaded: false,
      apisError: false,
      storedFormValues, // Only use this to save values when unmounting
    }

    this.handleSubmit.bind(this)
  }

  handleSubmit(values: SchemaType, actions: FormikHelpers<SchemaType>) {
    const formData: SchemaType = schema.cast(values)
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

  submitToApi(data: GoApi) {
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

  formikValueChange = (values: SchemaType) => {
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
          apis: response.apis.map((api: GoApi) => modelFromAPIResponse(api)),
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
            {/* Seems not to be inferred correctly. But type: `FormikProps<SchemaType>` gives same problem */}
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
