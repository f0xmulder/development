import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'

const initialValues = {
    description: '',
    organization_name: '',
    service_name: '',
    api_url: '',
    api_specification_type: 'REST/JSON',
    specification_url: '',
    documentation_url: '',
    tags: '',
    badges: '',
    contact: {
        email: '',
        phone: '',
        fax: '',
        chat: ''
    }
}

const validationSchema = Yup.object().shape({
    description: Yup.string().trim().required(),
    organization_name: Yup.string().required(),
    service_name: Yup.string().required(),
    api_url: Yup.string().url().required(),
    api_specification_type: Yup.string().required(),
    specification_url: Yup.string().url(),
    documentation_url: Yup.string().url(),
    tags: Yup.string(),
    badges: Yup.string(),
    contact: Yup.object().shape({
        email: Yup.string().email(),
        phone: Yup.string(),
        fax: Yup.string(),
        chat: Yup.string().url()
    })
})

const arrayFields = [
    'tags',
    'badges'
]

export default class SubmitAPIForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            submitted: false,
            responseData: {}
        }

        this.onSubmit = this.onSubmit.bind(this)
    }

    onSubmit(values = {}, actions = {}) {
        const data = validationSchema.cast(values)

        arrayFields.forEach((fieldName) => {
            data[fieldName] = data[fieldName] ? data[fieldName].split(',').map((v) => v.trim()) : []
        })

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
                actions.setStatus({ msg: 'An error occured while submitting the API, please try again' })
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
                throw new Error('Failed to submit API')
            }
        })
    }

    render() {
        return (
            <div className="SubmitAPI container">
                <h1>Submit your API</h1>
                <p>
                    If you would like to add an API to <a href="https://developer.overheid.nl" target="_blank" rel="noopener noreferrer">developer.overheid.nl</a>,
                    please fill the following form or <Link to="/submit-api">create a merge request</Link>.
                </p>

                { this.state.submitted ? <p data-test="api-submitted-message">
                    Your API is submitted succesfully. We will review it shortly. You can view the progress of the review on <a href={this.state.responseData.web_url} target="_blank" rel="noopener noreferrer">{this.state.responseData.web_url}</a>.
                </p> :
                    <Formik
                        initialValues={initialValues}
                        onSubmit={this.onSubmit}
                        validationSchema={validationSchema}
                        render={({ values, errors, status, touched, handleBlur, handleChange, handleSubmit, isSubmitting }) => (
                            <Form onSubmit={handleSubmit} data-test="form">
                                <div className="form-group">
                                    <label htmlFor="organization_name">Organization name*</label>
                                    <Field component="input" type="text" id="organization_name" name="organization_name" className="form-control" />
                                    {errors.organization_name && touched.organization_name && <p className="text-danger">{errors.organization_name}</p>}
                                </div>

                                <div className="form-group">
                                    <label htmlFor="service_name">Service name*</label>
                                    <Field component="input" type="text" id="service_name" name="service_name" className="form-control" />
                                    {errors.service_name && touched.service_name && <p className="text-danger">{errors.service_name}</p>}
                                </div>

                                <div className="form-group">
                                    <label htmlFor="description">Description*</label>
                                    <Field component="textarea" id="description" name="description" className="form-control" />
                                    {errors.description && touched.description && <p className="text-danger">{errors.description}</p>}
                                </div>

                                <div className="form-group">
                                    <label htmlFor="api_url">API URL*</label>
                                    <Field component="input" type="text" id="api_url" name="api_url" className="form-control" />
                                    {errors.api_url && touched.api_url && <p className="text-danger">{errors.api_url}</p>}
                                </div>

                                <div className="form-group">
                                    <label htmlFor="api_specification_type">Specification type</label>
                                    <Field component="select" id="api_specification_type" name="api_specification_type" className="form-control">
                                        <option value="REST/JSON">REST/JSON</option>
                                        <option value="SOAP/XML">SOAP/XML</option>
                                        <option value="gRPC">gRPC</option>
                                        <option value="GraphQL">GraphQL</option>
                                        <option value="WSDL">WSDL</option>
                                    </Field>
                                    {errors.api_specification_type && touched.api_specification_type && <p className="text-danger">{errors.api_specification_type}</p>}
                                </div>

                                <div className="form-group">
                                    <label htmlFor="specification_url">Specification URL</label>
                                    <Field component="input" type="text" id="specification_url" name="specification_url" className="form-control" />
                                    {errors.specification_url && touched.specification_url && <p className="text-danger">{errors.specification_url}</p>}
                                    <small className="form-text text-muted">The link to the machine-readable documentation.</small>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="documentation_url">Documentation URL</label>
                                    <Field component="input" type="text" id="documentation_url" name="documentation_url" className="form-control" />
                                    {errors.documentation_url && touched.documentation_url && <p className="text-danger">{errors.documentation_url}</p>}
                                    <small className="form-text text-muted">The link to the human-readable documentation.</small>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="tags">Tags</label>
                                    <Field component="input" type="text" id="tags" name="tags" className="form-control" />
                                    <small className="form-text text-muted">A comma-seperated list of tags.</small>
                                    {errors.tags && touched.tags && <p className="text-danger">{errors.tags}</p>}
                                </div>

                                <div className="form-group">
                                    <label htmlFor="badges">Badges</label>
                                    <Field component="input" type="text" id="badges" name="badges" className="form-control" />
                                    <small className="form-text text-muted">A comma-seperated list of badges.</small>
                                    {errors.badges && touched.badges && <p className="text-danger">{errors.badges}</p>}
                                </div>

                                <h3>Contact</h3>

                                <div className="form-group">
                                    <label htmlFor="contact.email">E-mail</label>
                                    <Field component="input" type="email" id="contact.email" name="contact.email" className="form-control" />
                                    {errors.contact && errors.contact.email && touched.contact && touched.contact.email && <p className="text-danger">{errors.contact.email}</p>}
                                </div>

                                <div className="form-group">
                                    <label htmlFor="contact.phone">Phone</label>
                                    <Field component="input" type="text" id="contact.phone" name="contact.phone" className="form-control" />
                                    {errors.contact && errors.contact.phone && touched.contact && touched.contact.phone && <p className="text-danger">{errors.contact.phone}</p>}
                                </div>

                                <div className="form-group">
                                    <label htmlFor="contact.fax">Fax</label>
                                    <Field component="input" type="text" id="contact.fax" name="contact.fax" className="form-control" />
                                    {errors.contact && errors.contact.fax && touched.contact && touched.contact.fax && <p className="text-danger">{errors.contact.fax}</p>}
                                </div>

                                <div className="form-group">
                                    <label htmlFor="contact.chat">Chat</label>
                                    <Field component="input" type="text" id="contact.chat" name="contact.chat" className="form-control" />
                                    {errors.contact && errors.contact.chat && touched.contact && touched.contact.chat && <p className="text-danger">{errors.contact.chat}</p>}
                                    <small className="form-text text-muted">This can be a link to a chat platform.</small>
                                </div>

                                {status && status.msg && <div data-test="status-message">{status.msg}</div>}

                                <button type="submit" disabled={isSubmitting} className="btn btn-primary">Submit</button>
                            </Form>
                        )}
                    />
                }
            </div>
        )
    }
}