import React, {Component} from 'react'
import { object } from 'prop-types'
import APIList from '../../components/APIList';
import TagListContainer from "../../components/TagListContainer";

import './index.css'
import Search from "../../components/Icons/Search";

export const mapApisForQueryResponseToApis = response => {
    const hits = response.hits
    return hits.map(hit => hit.fields)
}

class Home extends Component {
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
                    throw new Error(`Er ging iets fout tijdens het ophalen van API's voor de zoekterm '${query}'`)
                }
            }).then(response => mapApisForQueryResponseToApis(response))
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
        const { location: { search: prevHome } } = this.props

        const urlParams = new URLSearchParams(search)
        const prevUrlParams = new URLSearchParams(prevHome)

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
        const { search } = this.props.location
        const urlParams = new URLSearchParams(search)
        const query = urlParams.get('query')

        return (
            <div className="Home container">
                <div className="Home__Search">
                    <h1>Een incompleet overzicht van alle API’s binnen de Nederlandse overheid</h1>

                    <div className="search-box">
                        <label htmlFor="search-query" aria-label="Search query">
                            <input type="text" id="search-query" placeholder="Zoeken naar een API" defaultValue={query} onChange={event => this.onInputChangedHandler(event)}/>
                        </label>
                        <Search/>
                    </div>

                    {
                        !loaded ?
                            null :
                            error ?
                                <p data-test="error-message">Er ging iets fout tijdens het laden van de API's</p> :
                                apis && apis.length > 0 ?
                                    <div>
                                        <APIList apis={apis}/>
                                    </div>
                                    :
                                    <p data-test="no-apis-found-message">Geen API's gevonden.</p>
                    }
                </div>

                <div className="Home__Tags">
                    <p>Categorieën</p>
                    <TagListContainer />
                </div>
            </div>
        );
    }
}

Home.propTypes = {
    location: object
}

Home.defaultProps = {
    location: { search: {} }
}


export default Home
