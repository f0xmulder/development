import React, { Component } from 'react'
import { Form, Formik } from 'formik'
import { array, boolean, date, mixed, number, object, string } from './yup-translations'
import * as Yup from 'yup'
import {RELATION_TYPE_REFERENCE_IMPLEMENTATION} from '../../constants';
import {StyledFieldset, StyledLegend, StyledLabel, StyledField, StyledFormGroupColumn, StyledFormGroupColumnContainer, StyledFormGroup, StyledSubmitButton} from './index.styles'

import './index.css'

Yup.setLocale({
    mixed,
    array,
    string,
    object,
    date,
    boolean,
    number
})

const initialValues = {
    description: '',
    organization_name: '',
    service_name: '',
    api_url: '',
    api_type: 'Onbekend',
    specification_url: '',
    documentation_url: '',
    tags: '',
    badges: '',
    contact: {
        email: '',
        phone: '',
        fax: '',
        chat: '',
        url: ''
    },
    terms_of_use: {
        government_only: false,
        pay_per_use: false,
        uptime_guarantee: 99.5,
        support_response_time: ''
    },
    is_reference_implementation: false,
    reference_implementation: ''
}

const validationSchema = Yup.object().shape({
    description: Yup.string().trim().required(),
    organization_name: Yup.string().required(),
    service_name: Yup.string().required(),
    api_url: Yup.string().url().required(),
    api_type: Yup.string().required(),
    specification_url: Yup.string().url(),
    documentation_url: Yup.string().url(),
    tags: Yup.string(),
    badges: Yup.string(),
    contact: Yup.object().shape({
        email: Yup.string().email(),
        phone: Yup.string(),
        fax: Yup.string(),
        chat: Yup.string().url(),
        url: Yup.string().url()
    }),
    terms_of_use: Yup.object().shape({
        government_only: Yup.boolean(),
        pay_per_use: Yup.boolean(),
        uptime_guarantee: Yup.number(),
        support_response_time: Yup.string()
    }),
    is_reference_implementation: Yup.boolean(),
    reference_implementation: Yup.string()
})

const arrayFields = [
    'tags',
    'badges'
]

export const convertLinkToRIToRelation = formData => {
    if (formData['reference_implementation']) {
        formData['relations'] = {
            [formData['reference_implementation']]: [RELATION_TYPE_REFERENCE_IMPLEMENTATION]
        }
    }

    delete formData['reference_implementation']
    
    return formData
}

export const convertRIFormDataToAPIDefinition = formData => {
    formData['reference_implementation'] = !formData['is_reference_implementation'] ?
        formData['reference_implementation'] :
        ''

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
            apisError: false
        }

        this.onSubmit = this.onSubmit.bind(this)
    }

    onSubmit(values = {}, actions = {}) {
        let data = validationSchema.cast(values)

        arrayFields.forEach((fieldName) => {
            data[fieldName] = data[fieldName] ? data[fieldName].split(',').map((v) => v.trim()) : []
        })

        data = convertRIFormDataToAPIDefinition(data)

        return this.submitToApi(data)
            .then((responseData) => {
                actions.setSubmitting(false)
                this.setState({
                    submitted: true,
                    responseData
                })
            })
            .catch((error) => {
                actions.setSubmitting(false)
                actions.setStatus({msg: 'Er ging iets fout tijdens het toevoegen van de API. Gelieve opnieuw te proberen.'})
                console.error(error)
            })
    }

    submitToApi(data) {
        return fetch('/api/submit-api', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error('Er ging iets fout tijdens het toevoegen van de API.')
                }
            })
    }

    fetchApiList() {
        return fetch('/api/apis')
            .then(response => {
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error(`Er ging iets fout tijdens het ophalen van de beschikbare API's`)
                }
            })
    }

    componentDidMount() {
        this
            .fetchApiList()
            .then(result => {
                this.setState({ result, apisLoaded: true })
            }, error => {
                this.setState({ apisError: true, apisLoaded: true })
                console.error(error)
            })
    }

    render() {
        const { result, apisLoaded } = this.state

        return apisLoaded ?
            <div className="SubmitAPIForm">
                {this.state.submitted ? <p data-test="api-submitted-message">
                        De API is toegevoegd. Wij zullen deze zo snel mogelijk nakijken. Blijf op de hoogte door het issue
                        op GitLab in de gaten te houden. <a href={this.state.responseData.web_url} target="_blank"
                                                            rel="noopener noreferrer">{this.state.responseData.web_url}</a>.
                    </p> :
                    <Formik
                        initialValues={initialValues}
                        onSubmit={this.onSubmit}
                        validationSchema={validationSchema}
                        render={({values, errors, status, touched, handleBlur, handleChange, handleSubmit, isSubmitting}) => (
                            <Form onSubmit={handleSubmit} data-test="form">
                              <StyledFieldset>
                                <StyledLegend>Organisatie</StyledLegend> 

                                <StyledFormGroupColumnContainer>
                                  <StyledFormGroupColumn>
                                  <StyledLabel htmlFor="organization_name">Naam*</StyledLabel>
                                  <StyledField component="input" type="text" id="organization_name" name="organization_name" />
                                  {errors.organization_name && touched.organization_name &&
                                      <p className="text-danger">{errors.organization_name}</p>}
                                    </StyledFormGroupColumn>
                                  </StyledFormGroupColumnContainer>
                                </StyledFieldset>

                                <StyledFieldset>
                                  <StyledLegend>API</StyledLegend>

                                  <StyledFormGroupColumnContainer>
                                    <StyledFormGroupColumn>
                                    <div className="form-group">
                                        <StyledLabel htmlFor="service_name">Naam*</StyledLabel>
                                        <StyledField component="input" type="text" id="service_name" name="service_name" />
                                        {errors.service_name && touched.service_name &&
                                        <p className="text-danger">{errors.service_name}</p>}
                                    </div>

                                    <div className="form-group">
                                        <StyledLabel htmlFor="description">Omschrijving*</StyledLabel>
                                        <StyledField style={({ minHeight: '80px' })} component="textarea" id="description" name="description" />
                                        {errors.description && touched.description &&
                                        <p className="text-danger">{errors.description}</p>}
                                    </div>

                                    <div className="form-group">
                                        <StyledLabel htmlFor="tags">Tags</StyledLabel>
                                        <StyledField component="input" type="text" id="tags" name="tags" />
                                        <small className="form-text text-muted">Door komma's gescheiden lijst van tags.
                                        </small>
                                        {errors.tags && touched.tags && <p className="text-danger">{errors.tags}</p>}
                                    </div>

                                    <div className="form-group">
                                      <StyledLabel htmlFor="badges">Badges</StyledLabel>
                                      <StyledField component="input" type="text" id="badges" name="badges" />
                                        <small className="form-text text-muted">Door komma's gescheiden lijst van tags.
                                        </small>
                                        {errors.badges && touched.badges && <p className="text-danger">{errors.badges}</p>}
                                    </div>

                                  </StyledFormGroupColumn>

                                <StyledFormGroupColumn>

                                <div className="form-group">
                                    <StyledLabel htmlFor="api_url">API URL*</StyledLabel>
                                    <StyledField component="input" type="text" id="api_url" name="api_url"
                                           className="form-control"/>
                                    {errors.api_url && touched.api_url &&
                                    <p className="text-danger">{errors.api_url}</p>}
                                </div>

                                <div className="form-group">
                                    <StyledLabel htmlFor="api_type">API type</StyledLabel>
                                    <StyledField component="select" id="api_type" name="api_type">
                                        <option value="Onbekend">Onbekend</option>
                                        <option value="REST/JSON">REST/JSON</option>
                                        <option value="SOAP/XML">SOAP/XML</option>
                                        <option value="gRPC">gRPC</option>
                                        <option value="GraphQL">GraphQL</option>
                                        <option value="SPARQL">SPARQL</option>
                                        <option value="WFS">WFS</option>
                                        <option value="WMS">WMS</option>
                                    </StyledField>
                                    {errors.api_type && touched.api_type &&
                                    <p className="text-danger">{errors.api_type}</p>}
                                </div>

                                <div className="form-group">
                                    <StyledLabel htmlFor="specification_url">Specificatie URL</StyledLabel>
                                    <StyledField component="input" type="text" id="specification_url" name="specification_url" />
                                    {errors.specification_url && touched.specification_url &&
                                    <p className="text-danger">{errors.specification_url}</p>}
                                    <small className="form-text text-muted">Link naar een machine leesbare documentatie.</small>
                                </div>

                                <div className="form-group">
                                    <StyledLabel htmlFor="documentation_url">Documentatie URL</StyledLabel>
                                    <StyledField component="input" type="text" id="documentation_url" name="documentation_url"
                                           className="form-control"/>
                                    {errors.documentation_url && touched.documentation_url &&
                                    <p className="text-danger">{errors.documentation_url}</p>}
                                    <small className="form-text text-muted">Link naar een menselijk leesbare documentatie.
                                    </small>
                                  </div>

                                </StyledFormGroupColumn>
                              </StyledFormGroupColumnContainer>
                              </StyledFieldset>
                              <StyledFieldset>
                                  <StyledLegend>Contact</StyledLegend>

                                  <StyledFormGroupColumnContainer>
                                <StyledFormGroupColumn>
                                <div className="form-group">
                                    <StyledLabel htmlFor="contact.email">E-mailadres</StyledLabel>
                                    <StyledField component="input" type="email" id="contact.email" name="contact.email"
                                           className="form-control"/>
                                    {errors.contact && errors.contact.email && touched.contact && touched.contact.email &&
                                    <p className="text-danger">{errors.contact.email}</p>}
                                </div>

                                <div className="form-group">
                                    <StyledLabel htmlFor="contact.phone">Telefoonnummer</StyledLabel>
                                    <StyledField component="input" type="text" id="contact.phone" name="contact.phone" />
                                    {errors.contact && errors.contact.phone && touched.contact && touched.contact.phone &&
                                    <p className="text-danger">{errors.contact.phone}</p>}
                                </div>

                                <div className="form-group">
                                    <StyledLabel htmlFor="contact.fax">Fax</StyledLabel>
                                    <StyledField component="input" type="text" id="contact.fax" name="contact.fax" />
                                    {errors.contact && errors.contact.fax && touched.contact && touched.contact.fax &&
                                    <p className="text-danger">{errors.contact.fax}</p>}
                                  </div>


                                </StyledFormGroupColumn>
                                <StyledFormGroupColumn>

                                <div className="form-group">
                                    <StyledLabel htmlFor="contact.chat">Chat</StyledLabel>
                                    <StyledField component="input" type="text" id="contact.chat" name="contact.chat"
                                           className="form-control"/>
                                    {errors.contact && errors.contact.chat && touched.contact && touched.contact.chat &&
                                    <p className="text-danger">{errors.contact.chat}</p>}
                                    <small className="form-text text-muted">Link naar een chat-platform.</small>
                                </div>

                                <div className="form-group">
                                    <StyledLabel htmlFor="contact.url">URL</StyledLabel>
                                    <StyledField component="input" type="text" id="contact.url" name="contact.url" />
                                    {errors.contact && errors.contact.url && touched.contact && touched.contact.url &&
                                    <p className="text-danger">{errors.contact.url}</p>}
                                    <small className="form-text text-muted">Link naar een website met contactinformatie.</small>
                                  </div>
                                </StyledFormGroupColumn>
                                  </StyledFormGroupColumnContainer>

                                </StyledFieldset>

                                <StyledFieldset>


                                  <StyledLegend>Referentieimplementatie</StyledLegend>

                                {
                                    !values.reference_implementation || values.reference_implementation === '' ?
                                        <StyledFormGroup>
                                            <StyledLabel htmlFor="is_reference_implementation">Deze API is een referentieimplementatie</StyledLabel>
                                            <StyledField component="input" type="checkbox" id="is_reference_implementation" name="is_reference_implementation"
                                              checked={values.is_reference_implementation === true} />
                                            {errors.is_reference_implementation && touched.is_reference_implementation &&
                                            <p className="text-danger">{errors.is_reference_implementation}</p>}
                                        </StyledFormGroup> : null
                                }
                                {
                                    !values.is_reference_implementation ?
                                        <div className="form-group">
                                            <StyledLabel htmlFor="reference_implementation">Gebaseerd op (referentie implementatie)</StyledLabel>
                                            <StyledField component="select" id="reference_implementation" name="reference_implementation"
                                            >
                                                <option value="">Geen</option>
                                                {
                                                    result.apis
                                                    .filter(api => api.is_reference_implementation)
                                                    .map(api => <option value={api.id} key={api.id}>{api.service_name} {api.organization_name}</option>)
                                                }
                                            </StyledField>
                                            {errors.api_type && touched.api_type &&
                                            <p className="text-danger">{errors.api_type}</p>}
                                        </div> : null
                                }
                              </StyledFieldset>

                              <StyledFieldset>
                                <StyledLegend>Gebruiksvoorwaarden</StyledLegend>

                                <StyledFormGroupColumnContainer>
                                <StyledFormGroupColumn>
                                <StyledFormGroup>
                                    <StyledLabel htmlFor="terms_of_use.government_only">Deze API is alleen beschikbaar voor overheden</StyledLabel>
                                    <StyledField component="input" type="checkbox" id="terms_of_use.government_only" name="terms_of_use.government_only"
                                           className="form-control" checked={values.terms_of_use && (values.terms_of_use.government_only === true)} />
                                    {errors.terms_of_use && errors.terms_of_use.government_only && touched.terms_of_use && touched.terms_of_use.government_only &&
                                    <p className="text-danger">{errors.terms_of_use.government_only}</p>}
                                </StyledFormGroup>

                                <StyledFormGroup>
                                    <StyledLabel htmlFor="terms_of_use.pay_per_use">De kosten voor het gebruik van de API worden verrekend met de gebruiker</StyledLabel>
                                    <StyledField component="input" type="checkbox" id="terms_of_use.pay_per_use" name="terms_of_use.pay_per_use"
                                           className="form-control" checked={values.terms_of_use && (values.terms_of_use.pay_per_use === true)} />
                                    {errors.terms_of_use && errors.terms_of_use.pay_per_use && touched.terms_of_use && touched.terms_of_use.pay_per_use &&
                                    <p className="text-danger">{errors.terms_of_use.pay_per_use}</p>}
                                  </StyledFormGroup>

                                </StyledFormGroupColumn>
                                  <StyledFormGroupColumn>

                                <div className="form-group">
                                    <StyledLabel htmlFor="terms_of_use.uptime_guarantee">Beschikbaarheidsgarantie van de API</StyledLabel>
                                    <StyledField component="input" type="number" max="100" min="0" step="0.01" id="terms_of_use.uptime_guarantee" name="terms_of_use.uptime_guarantee"
                                           className="form-control" />
                                    <small className="form-text text-muted">Opgegeven als een percentage, bijv. 99,5.</small>
                                    {errors.terms_of_use && errors.terms_of_use.pay_per_use && touched.terms_of_use && touched.terms_of_use.pay_per_use &&
                                    <p className="text-danger">{errors.terms_of_use.pay_per_use}</p>}
                                </div>

                                <div className="form-group">
                                    <StyledLabel htmlFor="terms_of_use.support_response_time">Reactietijd van de helpdesk</StyledLabel>
                                    <StyledField component="input" type="text" id="terms_of_use.support_response_time" name="terms_of_use.support_response_time"
                                           className="form-control" />
                                    <small className="form-text text-muted">Bijv. 2 werkdagen</small>
                                    {errors.terms_of_use && errors.terms_of_use.support_response_time && touched.terms_of_use && touched.terms_of_use.support_response_time &&
                                    <p className="text-danger">{errors.terms_of_use.support_response_time}</p>}
                                  </div>
                                </StyledFormGroupColumn>
                                </StyledFormGroupColumnContainer>
                                </StyledFieldset>

                                {status && status.msg && <div data-test="status-message">{status.msg}</div>}

                                <p style={({ textAlign: 'center', margin: 0 })}>
                                <StyledSubmitButton type="submit" disabled={isSubmitting} className="btn btn-primary">Verstuur
                                </StyledSubmitButton>
                              </p>
                            </Form>
                        )}
                    />
                }
            </div>
        : null
    }
}

export default SubmitAPIForm
