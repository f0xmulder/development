import React, { Component } from 'react'
import { object } from 'prop-types'
import APIList from '../../components/APIList'

class Tag extends Component {
    constructor(props) {
        super(props)

        this.state = {
            apis: [],
            error: false,
            loaded: false
        }
    }

    fetchApiList(tag) {
        return fetch(`/api/apis?tags=${tag}`)
            .then(response => {
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error(`Failed to fetch API list filtered by tag ${tag}`)
                }
            })
    }

    loadAPIsForTag(tag) {
        return this
            .fetchApiList(tag)
            .then(apis => {
                this.setState({ apis, loaded: true })
            }, error => {
                this.setState({ error: true, loaded: true })
                console.error(error)
            })
    }

    componentWillUpdate(nextProps) {
        const { match: { params: { tag }} } = nextProps
        const { match: { params: { tag: prevTag }} } = this.props

        if (prevTag === tag) {
            return
        }

        this.loadAPIsForTag(tag)
    }

    componentDidMount(previousProps, previousState) {
        const { match: { params: { tag }} } = this.props
        this.loadAPIsForTag(tag)
    }

    render() {
        const { apis, error, loaded } = this.state
        const { match: { params: { tag } } } = this.props

        return (
            <div className="Tag container">
                <h1>APIs for tag '{ tag }'</h1>
                {
                    !loaded ?
                        null :
                        error ?
                            <p data-test="error-message">Failed loading the APIs for tag '{ tag }'</p> :
                            apis && apis.length > 0 ?
                                <APIList apis={apis} />
                    :
                                <p data-test="no-apis-found-message">No APIs found for tag '{ tag }'</p>
                }
            </div>
        );
    }
}


Tag.propTypes = {
    match: object
}

Tag.defaultProps = {
    match: { params: {} }
}

export default Tag
