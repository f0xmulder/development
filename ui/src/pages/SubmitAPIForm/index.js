import React, { Component } from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'

const initialValues = {
    description: '',
    organization_name: '',
    service_name: '',
    api_url: '',
    api_specification_type: '',
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
    tags: Yup.array().ensure(),
    badges: Yup.array().ensure()
})

export default class SubmitAPIForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            submitted: false
        }
    }

    onSubmit = (values, actions) => {
        return fetch('/api/submit-api', {
            method: 'POST',
            body: JSON.stringify(validationSchema.cast(values)),
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
                    please submit a <a href="https://gitlab.com/commonground/developer.overheid.nl/merge_requests" target="_blank" rel="noopener noreferrer">Merge Request</a> to
                    the <a href="https://gitlab.com/commonground/developer.overheid.nl" target="_blank" rel="noopener noreferrer">Git repository</a>  with a new JSON file defining your API.
                </p>

                { this.state.submitted ? <p>Your API is submitted succesfully. We will review it shortly.</p> :
                    <Formik
                        initialValues={initialValues}
                        onSubmit={this.onSubmit}
                        validationSchema={validationSchema}
                        render={({ values, errors, status, touched, handleBlur, handleChange, handleSubmit, isSubmitting }) => (
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="organization_name">Organisatienaam</label>
                                    <input type="text" id="organization_name" name="organization_name" onChange={handleChange} onBlur={handleBlur} value={values.organization_name} className="form-control" />
                                    {errors.organization_name && touched.organization_name && <div>{errors.organization_name}</div>}
                                </div>

                                <div className="form-group">
                                    <label htmlFor="service_name">Servicenaam</label>
                                    <input type="text" id="service_name" name="service_name" onChange={handleChange} onBlur={handleBlur} value={values.service_name} className="form-control" />
                                    {errors.service_name && touched.service_name && <div>{errors.service_name}</div>}
                                </div>

                                <div className="form-group">
                                    <label htmlFor="description">Omschrijving</label>
                                    <input type="text" id="description" name="description" onChange={handleChange} onBlur={handleBlur} value={values.description} className="form-control" />
                                    {errors.description && touched.description && <div>{errors.description}</div>}
                                </div>

                                <div className="form-group">
                                    <label htmlFor="api_url">API URL</label>
                                    <input type="text" id="api_url" name="api_url" onChange={handleChange} onBlur={handleBlur} value={values.api_url} className="form-control" />
                                    {errors.api_url && touched.api_url && <div>{errors.api_url}</div>}
                                </div>

                                <div className="form-group">
                                    <label htmlFor="api_specification_type">Specificatietype</label>
                                    <input type="text" id="api_specification_type" name="api_specification_type" onChange={handleChange} onBlur={handleBlur} value={values.api_specification_type} className="form-control" />
                                    {errors.api_specification_type && touched.api_specification_type && <div>{errors.api_specification_type}</div>}
                                </div>

                                <div className="form-group">
                                    <label htmlFor="specification_url">Specificatie URL</label>
                                    <input type="text" id="specification_url" name="specification_url" onChange={handleChange} onBlur={handleBlur} value={values.specification_url} className="form-control" />
                                    {errors.specification_url && touched.specification_url && <div>{errors.specification_url}</div>}
                                </div>

                                <div className="form-group">
                                    <label htmlFor="documentation_url">Documentatie URL</label>
                                    <input type="text" id="documentation_url" name="documentation_url" onChange={handleChange} onBlur={handleBlur} value={values.documentation_url} className="form-control" />
                                    {errors.documentation_url && touched.documentation_url && <div>{errors.documentation_url}</div>}
                                </div>

                                <div className="form-group">
                                    <label htmlFor="tags">Tags</label>
                                    <input type="text" id="tags" name="tags" onChange={handleChange} onBlur={handleBlur} value={values.tags} className="form-control" />
                                    {errors.tags && touched.tags && <div>{errors.tags}</div>}
                                </div>

                                <div className="form-group">
                                    <label htmlFor="badges">Badges</label>
                                    <input type="text" id="badges" name="badges" onChange={handleChange} onBlur={handleBlur} value={values.badges} className="form-control" />
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