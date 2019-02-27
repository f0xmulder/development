import React, { Component, Fragment } from 'react'
import { object } from 'prop-types'
import { RedocStandalone } from 'redoc';

class APIDetail extends Component {
    constructor(props) {
        super(props)

        this.state = {
            details: {},
            error: false,
            loaded: false
        }
    }

    fetchApiDetails(id) {
        return fetch(`/api/apis/${id}`)
            .then(response => {
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error(`Failed to fetch API details for API with ID '${id}'`)
                }
            })
    }

    componentDidMount() {
        const { match } = this.props

        this
            .fetchApiDetails(match.params.id)
            .then(details => {
                this.setState({ details, loaded: true })
            }, error => {
                this.setState({ error: true, loaded: true })
                console.error(error)
            })
    }

    render() {
        const { details, error, loaded } = this.state

        return (
            <div className="APIDetail">
                {
                    !loaded ?
                        null :
                        error ?
                            <p data-test="error-message">Failed loading the API details</p> :
                            details ?
                                <Fragment>
                                    <div class="container">
                                        <h1>{ details.service_name } - { details.organization_name }</h1>
                                        <p>{ details.description }</p>
                                        <dl>
                                            <dt>API URL</dt>
                                            <dd data-test="api-url">{ details.api_url }</dd>

                                            <dt>API Specification Type</dt>
                                            <dd data-test="api-specification-type">{ details.api_specification_type }</dd>

                                            <dt>API Specification URL</dt>
                                            <dd data-test="api-specification-url">{ details.specification_url }</dd>

                                            <dt>API Documentation URL</dt>
                                            <dd data-test="api-documentation-url">{ details.documentation_url }</dd>
                                        </dl>
                                    </div>
                                    { details.specification_url ?
                                        <RedocStandalone specUrl={details.specification_url} />
                                    : null }
                                </Fragment> : null
                }
            </div>
        );
    }
}

APIDetail.propTypes = {
    match: object
}

APIDetail.defaultProps = {
    match: { params: {} }
}

export default APIDetail;
