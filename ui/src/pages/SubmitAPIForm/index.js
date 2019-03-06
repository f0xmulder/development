import React, { Component } from 'react'
import { Formik, Field } from 'formik'
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
    badges: ''
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
    badges: Yup.string()
})

export default class SubmitAPIForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            submitted: false
        }
    }

    onSubmit = (values, actions) => {
        const data = validationSchema.cast(values)

        data['tags'] = data['tags'] ? data['tags'].split(',').map((v) => v.trim()) : []
        data['badges'] = data['badges'] ? data['badges'].split(',').map((v) => v.trim()) : []

        return fetch('/api/submit-api', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                actions.setSubmitting(false)
                this.setState({ submitted: true })
            } else {
                throw new Error('Failed to fetch API list')
            }
        })
        .catch(() => {
            actions.setSubmitting(false)
            actions.setStatus({ msg: 'An error occured while submitting the API, please try again' })
        })
    }

    render() {
        return (
            <div className="SubmitAPI container">
                <h1>Submit your API</h1>
                <p>
                    If you would like to add an API to <a href="https://developer.overheid.nl" target="_blank" rel="noopener noreferrer">developer.overheid.nl</a>,
                    please fill the following form:
                </p>

                { this.state.submitted ? <p>Your API is submitted succesfully. We will review it shortly.</p> :
                    <Formik
                        initialValues={initialValues}
                        onSubmit={this.onSubmit}
                        validationSchema={validationSchema}
                        render={({ values, errors, status, touched, handleBlur, handleChange, handleSubmit, isSubmitting }) => (
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="organization_name">Organization name*</label>
                                    <Field component="input" type="text" id="organization_name" name="organization_name" className="form-control" />
                                    {errors.organization_name && touched.organization_name && <div>{errors.organization_name}</div>}
                                </div>

                                <div className="form-group">
                                    <label htmlFor="service_name">Service name*</label>
                                    <Field component="input" type="text" id="service_name" name="service_name" className="form-control" />
                                    {errors.service_name && touched.service_name && <div>{errors.service_name}</div>}
                                </div>

                                <div className="form-group">
                                    <label htmlFor="description">Description*</label>
                                    <Field component="textarea" id="description" name="description" className="form-control" />
                                    {errors.description && touched.description && <div>{errors.description}</div>}
                                </div>

                                <div className="form-group">
                                    <label htmlFor="api_url">API URL*</label>
                                    <Field component="input" type="text" id="api_url" name="api_url" className="form-control" />
                                    {errors.api_url && touched.api_url && <div>{errors.api_url}</div>}
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
                                    {errors.api_specification_type && touched.api_specification_type && <div>{errors.api_specification_type}</div>}
                                </div>

                                <div className="form-group">
                                    <label htmlFor="specification_url">Specification URL</label>
                                    <Field component="input" type="text" id="specification_url" name="specification_url" className="form-control" />
                                    {errors.specification_url && touched.specification_url && <div>{errors.specification_url}</div>}
                                    <small class="form-text text-muted">The link to the machine-readable documentation.</small>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="documentation_url">Documentation URL</label>
                                    <Field component="input" type="text" id="documentation_url" name="documentation_url" className="form-control" />
                                    {errors.documentation_url && touched.documentation_url && <div>{errors.documentation_url}</div>}
                                    <small class="form-text text-muted">The link to the human-readable documentation.</small>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="tags">Tags</label>
                                    <Field component="input" type="text" id="tags" name="tags" className="form-control" />
                                    <small class="form-text text-muted">A comma-seperated list of tags.</small>
                                    {errors.tags && touched.tags && <div>{errors.tags}</div>}
                                </div>

                                <div className="form-group">
                                    <label htmlFor="badges">Badges</label>
                                    <Field component="input" type="text" id="badges" name="badges" className="form-control" />
                                    <small class="form-text text-muted">A comma-seperated list of badges.</small>
                                    {errors.badges && touched.badges && <div>{errors.badges}</div>}
                                </div>

                                {status && status.msg && <div>{status.msg}</div>}

                                <button type="submit" disabled={isSubmitting} className="btn btn-primary">Submit</button>
                            </form>
                        )}
                    />
                }
            </div>
        )
    }
}