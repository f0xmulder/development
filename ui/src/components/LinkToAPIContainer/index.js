import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import { string } from 'prop-types'

class LinkToAPIContainer extends Component {
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
                    throw new Error(`Er ging iets fout bij het ophalen voor de API met ID '${id}'`)
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
        const { id } = nextProps
        const { id: prevId } = this.props

        if (prevId === id) {
            return
        }

        this.loadDetailsForApi(id)
    }

    componentDidMount() {
        const { id } = this.props
        this.loadDetailsForApi(id)
    }

    render() {
        const { details, error, loaded } = this.state
        const { id, service_name, organization_name } = details

        return (
            <div className="LinkToAPIContainer">
                {
                    !loaded ?
                        null :
                        error ?
                            <p data-test="error-message">Er ging iets fout tijdens het ophalen van de API.</p> :
                                <Link to={`/detail/${id}`} data-test="link">
                                    {service_name} - {organization_name}
                                </Link>
                }
            </div>
        );
    }
}

LinkToAPIContainer.propTypes = {
    id: string.isRequired
}

export default LinkToAPIContainer
