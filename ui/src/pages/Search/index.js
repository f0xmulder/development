import React, {Component} from 'react'
import { object } from 'prop-types'
import {Link} from 'react-router-dom'

import './index.css'

class Search extends Component {
    constructor(props) {
        super(props)

        this.state = {
            apis: [],
            error: false,
            loaded: false
        }

        this.onInputChangedHandler = this.onInputChangedHandler.bind(this)
    }

    fetchApisForQuery(query) {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query: {match: query},
                fields: ['id', 'service_name', 'organization_name']
            })
        }

        return fetch('/api/apis/search', requestOptions)
            .then(response => {
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error(`Failed to fetch APIs for query '${query}'`)
                }
            })
            .then(response => response.hits)
            .then(hits => hits.map(hit => hit.fields))
    }

    loadApisForQuery(query) {
        return this
            .fetchApisForQuery(query)
            .then(apis => {
                this.setState({ apis, loaded: true })
            }, error => {
                this.setState({ error: true, loaded: true })
                console.error(error)
            })
    }

    componentWillUpdate(nextProps) {
        const { location: { search } } = nextProps
        const { location: { search: prevSearch } } = this.props

        const urlParams = new URLSearchParams(search)
        const prevUrlParams = new URLSearchParams(prevSearch)

        if (prevUrlParams.get('query') === urlParams.get('query')) {
            return
        }

        this.loadApisForQuery(urlParams.get('query'))
    }

    onInputChangedHandler(event) {
        const query = event.currentTarget.value
        const search = this.props.location.search
        const urlParams = new URLSearchParams(search)
        urlParams.set('query', query)
        this.props.history.push(`?${urlParams.toString()}`);
    }

    componentDidMount() {
        const { location: { search } } = this.props
        const urlParams = new URLSearchParams(search)
        const query = urlParams.get('query')

        if (!query) {
            return
        }

        this.loadApisForQuery(query)
    }

    render() {
        const { apis, error, loaded } = this.state
        const search = this.props.location.search
        const urlParams = new URLSearchParams(search)
        const query = urlParams.get('query')

        return (
            <div className="Search container">
                <h1>Search API</h1>
                <input type="text" placeholder="Type to search..." defaultValue={query} onChange={event => this.onInputChangedHandler(event)}/>
                {
                    !loaded ?
                        null :
                        error ?
                            <p data-test="error-message">Failed loading APIs</p> :
                            apis && apis.length > 0 ?
                                <div>
                                    <ul>
                                        {
                                        apis
                                            .map((api, i) =>
                                                <li key={i}>
                                                    <Link to={`/detail/${api['id']}`} data-test="link">
                                                        { api['service_name'] } - { api['organization_name'] }
                                                    </Link>
                                                </li>
                                            )
                                    }
                                    </ul>
                                </div>
                    :
                                <p data-test="no-apis-available-message">No APIs found</p>
                }
            </div>
        );
    }
}


Search.propTypes = {
    location: object
}

Search.defaultProps = {
    location: { search: {} }
}


export default Search
