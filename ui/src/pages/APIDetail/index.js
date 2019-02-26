import React, { Component } from 'react'
import { object } from 'prop-types'

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
                <h1>API details</h1>
                {
                    !loaded ?
                        null :
                        error ?
                            <p data-test="error-message">Failed loading the API details</p> :
                            details ?
                                <dl>
                                    <dt>Organization</dt>
                                    <dd data-test="organization-name">{ details.organization_name }</dd>
                                </dl> : null
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
