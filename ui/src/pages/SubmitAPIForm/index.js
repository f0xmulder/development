import React, { Component } from 'react'
import { Formik } from 'formik'
import {
  array,
  boolean,
  date,
  mixed,
  number,
  object,
  string,
} from './yup-translations'
import * as Yup from 'yup'
import { RELATION_TYPE_REFERENCE_IMPLEMENTATION } from '../../constants'
import SubmitAPIForm from '../../components/SubmitAPIForm'

Yup.setLocale({
  mixed,
  array,
  string,
  object,
  date,
  boolean,
  number,
})

const initialValues = {}
initialValues['description'] = ''
initialValues['organization_name'] = ''
initialValues['service_name'] = ''
initialValues['api_url'] = ''
initialValues['api_type'] = 'Onbekend'
initialValues['specification_url'] = ''
initialValues['documentation_url'] = ''
initialValues['tags'] = []
initialValues['badges'] = ''
initialValues['contact'] = {
  email: '',
  phone: '',
  fax: '',
  chat: '',
  url: '',
}
const termsOfUse = {}
termsOfUse['government_only'] = false
termsOfUse['pay_per_use'] = false
termsOfUse['uptime_guarantee'] = 99.5
termsOfUse['support_response_time'] = ''

initialValues['terms_of_use'] = termsOfUse
initialValues['is_reference_implementation'] = false
initialValues['reference_implementation'] = ''

const validationSchemaConfiguration = {}
validationSchemaConfiguration['description'] = Yup.string()
  .trim()
  .required()
validationSchemaConfiguration['organization_name'] = Yup.string().required()
validationSchemaConfiguration['service_name'] = Yup.string().required()
validationSchemaConfiguration['api_url'] = Yup.string()
  .url()
  .required()
validationSchemaConfiguration['api_type'] = Yup.string().required()
validationSchemaConfiguration['specification_url'] = Yup.string().url()
validationSchemaConfiguration['documentation_url'] = Yup.string().url()
validationSchemaConfiguration['tags'] = Yup.string()
validationSchemaConfiguration['badges'] = Yup.string()
validationSchemaConfiguration['contact'] = Yup.object().shape({
  email: Yup.string().email(),
  phone: Yup.string(),
  fax: Yup.string(),
  chat: Yup.string().url(),
  url: Yup.string().url(),
})
validationSchemaConfiguration['contact'] = Yup.object().shape()

const termsOfUseSchemaConfiguration = {}
termsOfUseSchemaConfiguration['government_only'] = Yup.boolean()
termsOfUseSchemaConfiguration['pay_per_use'] = Yup.boolean()
termsOfUseSchemaConfiguration['uptime_guarantee'] = Yup.number()
termsOfUseSchemaConfiguration['support_response_time'] = Yup.string()
validationSchemaConfiguration['terms_of_use'] = Yup.object().shape(
  termsOfUseSchemaConfiguration,
)
validationSchemaConfiguration['is_reference_implementation'] = Yup.boolean()
validationSchemaConfiguration['reference_implementation'] = Yup.string()

const validationSchema = Yup.object().shape(validationSchemaConfiguration)

const arrayFields = ['tags', 'badges']

export const convertLinkToRIToRelation = (formData) => {
  if (formData['reference_implementation']) {
    formData['relations'] = {
      [formData['reference_implementation']]: [
        RELATION_TYPE_REFERENCE_IMPLEMENTATION,
      ],
    }
  }

  delete formData['reference_implementation']

  return formData
}

export const convertRIFormDataToAPIDefinition = (formData) => {
  formData['reference_implementation'] = !formData[
    'is_reference_implementation'
  ]
    ? formData['reference_implementation']
    : ''

  formData = convertLinkToRIToRelation(formData)
  return formData
}

class SubmitAPIFormPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      submitted: false,
      responseData: {},
      result: {},
      apisLoaded: false,
      apisError: false,
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

    return this.submitToApi(data)
      .then((responseData) => {
        actions.setSubmitting(false)
        this.setState({
          submitted: true,
          responseData,
        })
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
    this.fetchApiList().then(
      (result) => {
        this.setState({ result, apisLoaded: true })
      },
      (error) => {
        this.setState({ apisError: true, apisLoaded: true })
        console.error(error)
      },
    )
  }

  render() {
    const {
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
            initialValues={initialValues}
            onSubmit={this.onSubmit}
            validationSchema={validationSchema}
            render={(props) => <SubmitAPIForm {...props} apis={apis} />}
          />
        )}
      </div>
    ) : null
  }
}

export default SubmitAPIFormPage
