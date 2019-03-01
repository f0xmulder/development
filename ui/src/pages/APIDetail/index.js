import React, { Component, Fragment } from 'react'
import { object } from 'prop-types'
import { RedocStandalone } from 'redoc'

import APIDetails from './APIDetails'

class APIDetail extends Component {
    constructor(props) {
        super(props)

        this.state = {
            details: {},
            error: false,
            loaded: false,
            errorLoadingSpecification: false
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

    onErrorLoadingSpecification() {
        this.setState({ errorLoadingSpecification: true })
    }

    render() {
        const { details, error, loaded, errorLoadingSpecification } = this.state

        return (
            <div className="APIDetail">
                {
                    !loaded ?
                        null :
                        error ?
                            <p data-test="error-message">Failed loading the API details</p> :
                            details ?
                                <Fragment>
                                    <div className="container">
                                        <APIDetails details={details} />

                                        {
                                            errorLoadingSpecification ?
                                                <p data-test="error-message-loading-specification">Failed loading the API specification.</p> :
                                                null
                                        }
                                    </div>
                                    {
                                        !errorLoadingSpecification ?
                                            <RedocStandalone specUrl={details.specification_url}
                                                             onLoaded={error => error ? this.onErrorLoadingSpecification(error) : null } />
                                            : null
                                    }
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
