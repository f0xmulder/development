import React, { Component } from 'react'
import { object } from 'prop-types'

import APIDetails from './APIDetails'

import './index.css'

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
                    throw new Error(`Er ging iets fout bij het ophalen voor de API met ID  '${id}'`)
                }
            })
    }

    loadDetailsForApi(id) {
        return this
            .fetchApiDetails(id)
            .then(details => {
                this.setState({ details, loaded: true })
            }, error => {
                this.setState({ error: true, loaded: true })
                console.error(error)
            })
    }

    componentWillUpdate(nextProps) {
        const { match: { params: { id }} } = nextProps
        const { match: { params: { id: prevId }} } = this.props

        if (prevId === id) {
            return
        }

        this.loadDetailsForApi(id)
    }

    componentDidMount() {
        const { match: { params: { id } } } = this.props
        this.loadDetailsForApi(id)
    }

    render() {
        const { details, error, loaded } = this.state

        return (
            <div className="APIDetail">
                {
                    !loaded ?
                        null :
                        error ?
                            <p data-test="error-message">Er ging iets fout tijdens het ophalen van de API.</p> :
                            details ?
                                <div className="container">
                                    <APIDetails {...details} />
                                </div> : null
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
