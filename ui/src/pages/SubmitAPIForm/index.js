import React, { Component } from 'react'
import { Form, Formik } from 'formik'
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
import {
  StyledFieldset,
  StyledLegend,
  StyledLabel,
  StyledField,
  StyledFormGroupColumn,
  StyledFormGroupColumnContainer,
  StyledFormGroup,
  StyledFormSetting,
  StyledSubmitButton,
  HelperMessage,
  ErrorMessage,
} from './index.styles'

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

class SubmitAPIForm extends Component {
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
    const { result, apisLoaded } = this.state

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
            render={({
              values,
              errors,
              status,
              touched,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
            }) => (
              <Form onSubmit={handleSubmit} data-test="form">
                <StyledFieldset>
                  <StyledLegend>Organisatie</StyledLegend>

                  <StyledFormGroupColumnContainer>
                    <StyledFormGroupColumn>
                      <StyledLabel htmlFor="organization_name">
                        Naam*
                      </StyledLabel>
                      <StyledField
                        component="input"
                        type="text"
                        id="organization_name"
                        name="organization_name"
                      />
                      {errors.organization_name &&
                        touched.organization_name && (
                          <ErrorMessage>
                            {errors.organization_name}
                          </ErrorMessage>
                        )}
                    </StyledFormGroupColumn>
                  </StyledFormGroupColumnContainer>
                </StyledFieldset>

                <StyledFieldset>
                  <StyledLegend>API</StyledLegend>

                  <StyledFormGroupColumnContainer>
                    <StyledFormGroupColumn>
                      <StyledFormGroup>
                        <StyledLabel htmlFor="service_name">Naam*</StyledLabel>
                        <StyledField
                          component="input"
                          type="text"
                          id="service_name"
                          name="service_name"
                        />
                        {errors.service_name && touched.service_name && (
                          <ErrorMessage>{errors.service_name}</ErrorMessage>
                        )}
                      </StyledFormGroup>

                      <StyledFormGroup>
                        <StyledLabel htmlFor="description">
                          Omschrijving*
                        </StyledLabel>
                        <StyledField
                          style={{ minHeight: '80px', resize: 'vertical' }}
                          component="textarea"
                          id="description"
                          name="description"
                        />
                        {errors.description && touched.description && (
                          <ErrorMessage>{errors.description}</ErrorMessage>
                        )}
                      </StyledFormGroup>

                      <StyledFormGroup>
                        <StyledLabel htmlFor="tags">Tags</StyledLabel>
                        <StyledField
                          component="input"
                          type="text"
                          id="tags"
                          name="tags"
                        />
                        <HelperMessage>
                          Door komma&#39;s gescheiden lijst van tags.
                        </HelperMessage>
                        {errors.tags && touched.tags && (
                          <ErrorMessage>{errors.tags}</ErrorMessage>
                        )}
                      </StyledFormGroup>

                      <StyledFormGroup>
                        <StyledLabel htmlFor="badges">Badges</StyledLabel>
                        <StyledField
                          component="input"
                          type="text"
                          id="badges"
                          name="badges"
                        />
                        <HelperMessage>
                          Door komma&#39;s gescheiden lijst van tags.
                        </HelperMessage>
                        {errors.badges && touched.badges && (
                          <ErrorMessage>{errors.badges}</ErrorMessage>
                        )}
                      </StyledFormGroup>
                    </StyledFormGroupColumn>

                    <StyledFormGroupColumn>
                      <StyledFormGroup>
                        <StyledLabel htmlFor="api_url">API URL*</StyledLabel>
                        <StyledField
                          component="input"
                          type="text"
                          id="api_url"
                          name="api_url"
                        />
                        {errors.api_url && touched.api_url && (
                          <ErrorMessage>{errors.api_url}</ErrorMessage>
                        )}
                      </StyledFormGroup>

                      <StyledFormGroup>
                        <StyledLabel htmlFor="api_type">API type</StyledLabel>
                        <StyledField
                          component="select"
                          id="api_type"
                          name="api_type"
                        >
                          <option value="Onbekend">Onbekend</option>
                          <option value="REST/JSON">REST/JSON</option>
                          <option value="SOAP/XML">SOAP/XML</option>
                          <option value="gRPC">gRPC</option>
                          <option value="GraphQL">GraphQL</option>
                          <option value="SPARQL">SPARQL</option>
                          <option value="WFS">WFS</option>
                          <option value="WMS">WMS</option>
                        </StyledField>
                        {errors.api_type && touched.api_type && (
                          <ErrorMessage>{errors.api_type}</ErrorMessage>
                        )}
                      </StyledFormGroup>

                      <StyledFormGroup>
                        <StyledLabel htmlFor="specification_url">
                          Specificatie URL
                        </StyledLabel>
                        <StyledField
                          component="input"
                          type="text"
                          id="specification_url"
                          name="specification_url"
                        />
                        {errors.specification_url &&
                          touched.specification_url && (
                            <ErrorMessage>
                              {errors.specification_url}
                            </ErrorMessage>
                          )}
                        <HelperMessage>
                          Link naar een machine leesbare documentatie.
                        </HelperMessage>
                      </StyledFormGroup>

                      <StyledFormGroup>
                        <StyledLabel htmlFor="documentation_url">
                          Documentatie URL
                        </StyledLabel>
                        <StyledField
                          component="input"
                          type="text"
                          id="documentation_url"
                          name="documentation_url"
                        />
                        {errors.documentation_url &&
                          touched.documentation_url && (
                            <ErrorMessage>
                              {errors.documentation_url}
                            </ErrorMessage>
                          )}
                        <HelperMessage>
                          Link naar een menselijk leesbare documentatie.
                        </HelperMessage>
                      </StyledFormGroup>
                    </StyledFormGroupColumn>
                  </StyledFormGroupColumnContainer>
                </StyledFieldset>
                <StyledFieldset>
                  <StyledLegend>Contact</StyledLegend>

                  <StyledFormGroupColumnContainer>
                    <StyledFormGroupColumn>
                      <StyledFormGroup>
                        <StyledLabel htmlFor="contact.email">
                          E-mailadres
                        </StyledLabel>
                        <StyledField
                          component="input"
                          type="email"
                          id="contact.email"
                          name="contact.email"
                        />
                        {errors.contact &&
                          errors.contact.email &&
                          touched.contact &&
                          touched.contact.email && (
                            <ErrorMessage>{errors.contact.email}</ErrorMessage>
                          )}
                      </StyledFormGroup>

                      <StyledFormGroup>
                        <StyledLabel htmlFor="contact.phone">
                          Telefoonnummer
                        </StyledLabel>
                        <StyledField
                          component="input"
                          type="text"
                          id="contact.phone"
                          name="contact.phone"
                        />
                        {errors.contact &&
                          errors.contact.phone &&
                          touched.contact &&
                          touched.contact.phone && (
                            <ErrorMessage>{errors.contact.phone}</ErrorMessage>
                          )}
                      </StyledFormGroup>

                      <StyledFormGroup>
                        <StyledLabel htmlFor="contact.fax">Fax</StyledLabel>
                        <StyledField
                          component="input"
                          type="text"
                          id="contact.fax"
                          name="contact.fax"
                        />
                        {errors.contact &&
                          errors.contact.fax &&
                          touched.contact &&
                          touched.contact.fax && (
                            <ErrorMessage>{errors.contact.fax}</ErrorMessage>
                          )}
                      </StyledFormGroup>
                    </StyledFormGroupColumn>
                    <StyledFormGroupColumn>
                      <StyledFormGroup>
                        <StyledLabel htmlFor="contact.chat">Chat</StyledLabel>
                        <StyledField
                          component="input"
                          type="text"
                          id="contact.chat"
                          name="contact.chat"
                        />
                        {errors.contact &&
                          errors.contact.chat &&
                          touched.contact &&
                          touched.contact.chat && (
                            <ErrorMessage>{errors.contact.chat}</ErrorMessage>
                          )}
                        <HelperMessage>
                          Link naar een chat-platform.
                        </HelperMessage>
                      </StyledFormGroup>

                      <StyledFormGroup>
                        <StyledLabel htmlFor="contact.url">URL</StyledLabel>
                        <StyledField
                          component="input"
                          type="text"
                          id="contact.url"
                          name="contact.url"
                        />
                        {errors.contact &&
                          errors.contact.url &&
                          touched.contact &&
                          touched.contact.url && (
                            <ErrorMessage>{errors.contact.url}</ErrorMessage>
                          )}
                        <HelperMessage>
                          Link naar een website met contactinformatie.
                        </HelperMessage>
                      </StyledFormGroup>
                    </StyledFormGroupColumn>
                  </StyledFormGroupColumnContainer>
                </StyledFieldset>

                <StyledFieldset>
                  <StyledLegend>Referentieimplementatie</StyledLegend>

                  {!values.reference_implementation ||
                  values.reference_implementation === '' ? (
                    <StyledFormGroup>
                      <StyledFormSetting>
                        <StyledLabel htmlFor="is_reference_implementation">
                          Deze API is een referentieimplementatie
                        </StyledLabel>
                        <StyledField
                          component="input"
                          type="checkbox"
                          id="is_reference_implementation"
                          name="is_reference_implementation"
                          checked={values.is_reference_implementation === true}
                        />
                        {errors.is_reference_implementation &&
                          touched.is_reference_implementation && (
                            <ErrorMessage>
                              {errors.is_reference_implementation}
                            </ErrorMessage>
                          )}
                      </StyledFormSetting>
                    </StyledFormGroup>
                  ) : null}
                  {!values.is_reference_implementation ? (
                    <StyledFormGroup>
                      <StyledLabel htmlFor="reference_implementation">
                        Gebaseerd op (referentie implementatie)
                      </StyledLabel>
                      <StyledField
                        component="select"
                        id="reference_implementation"
                        name="reference_implementation"
                      >
                        <option value="">Geen</option>
                        {result.apis
                          .filter((api) => api.is_reference_implementation)
                          .map((api) => (
                            <option value={api.id} key={api.id}>
                              {api.service_name} {api.organization_name}
                            </option>
                          ))}
                      </StyledField>
                      {errors.api_type && touched.api_type && (
                        <ErrorMessage>{errors.api_type}</ErrorMessage>
                      )}
                    </StyledFormGroup>
                  ) : null}
                </StyledFieldset>

                <StyledFieldset>
                  <StyledLegend>Gebruiksvoorwaarden</StyledLegend>

                  <StyledFormGroupColumnContainer>
                    <StyledFormGroupColumn>
                      <StyledFormGroup>
                        <StyledFormSetting>
                          <StyledLabel htmlFor="terms_of_use.government_only">
                            Deze API is alleen beschikbaar voor overheden
                          </StyledLabel>
                          <StyledField
                            component="input"
                            type="checkbox"
                            id="terms_of_use.government_only"
                            name="terms_of_use.government_only"
                            checked={
                              values.terms_of_use &&
                              values.terms_of_use.government_only === true
                            }
                          />
                          {errors.terms_of_use &&
                            errors.terms_of_use.government_only &&
                            touched.terms_of_use &&
                            touched.terms_of_use.government_only && (
                              <ErrorMessage>
                                {errors.terms_of_use.government_only}
                              </ErrorMessage>
                            )}
                        </StyledFormSetting>
                      </StyledFormGroup>

                      <StyledFormGroup>
                        <StyledFormSetting>
                          <StyledLabel htmlFor="terms_of_use.pay_per_use">
                            De kosten voor het gebruik van de API worden
                            verrekend met de gebruiker
                          </StyledLabel>
                          <StyledField
                            component="input"
                            type="checkbox"
                            id="terms_of_use.pay_per_use"
                            name="terms_of_use.pay_per_use"
                            checked={
                              values.terms_of_use &&
                              values.terms_of_use.pay_per_use === true
                            }
                          />
                          {errors.terms_of_use &&
                            errors.terms_of_use.pay_per_use &&
                            touched.terms_of_use &&
                            touched.terms_of_use.pay_per_use && (
                              <ErrorMessage>
                                {errors.terms_of_use.pay_per_use}
                              </ErrorMessage>
                            )}
                        </StyledFormSetting>
                      </StyledFormGroup>
                    </StyledFormGroupColumn>
                    <StyledFormGroupColumn>
                      <StyledFormGroup>
                        <StyledLabel htmlFor="terms_of_use.uptime_guarantee">
                          Beschikbaarheidsgarantie van de API
                        </StyledLabel>
                        <StyledField
                          component="input"
                          type="number"
                          max="100"
                          min="0"
                          step="0.01"
                          id="terms_of_use.uptime_guarantee"
                          name="terms_of_use.uptime_guarantee"
                        />
                        <HelperMessage>
                          Opgegeven als een percentage, bijv. 99,5.
                        </HelperMessage>
                        {errors.terms_of_use &&
                          errors.terms_of_use.pay_per_use &&
                          touched.terms_of_use &&
                          touched.terms_of_use.pay_per_use && (
                            <ErrorMessage>
                              {errors.terms_of_use.pay_per_use}
                            </ErrorMessage>
                          )}
                      </StyledFormGroup>

                      <StyledFormGroup>
                        <StyledLabel htmlFor="terms_of_use.support_response_time">
                          Reactietijd van de helpdesk
                        </StyledLabel>
                        <StyledField
                          component="input"
                          type="text"
                          id="terms_of_use.support_response_time"
                          name="terms_of_use.support_response_time"
                        />
                        <HelperMessage>Bijv. 2 werkdagen</HelperMessage>
                        {errors.terms_of_use &&
                          errors.terms_of_use.support_response_time &&
                          touched.terms_of_use &&
                          touched.terms_of_use.support_response_time && (
                            <ErrorMessage>
                              {errors.terms_of_use.support_response_time}
                            </ErrorMessage>
                          )}
                      </StyledFormGroup>
                    </StyledFormGroupColumn>
                  </StyledFormGroupColumnContainer>
                </StyledFieldset>

                {status && status.msg && (
                  <div data-test="status-message">{status.msg}</div>
                )}

                <p style={{ textAlign: 'center', margin: 0 }}>
                  <StyledSubmitButton
                    type="submit"
                    disabled={isSubmitting}
                    className="btn btn-primary"
                  >
                    Verstuur
                  </StyledSubmitButton>
                </p>
              </Form>
            )}
          />
        )}
      </div>
    ) : null
  }
}

export default SubmitAPIForm
