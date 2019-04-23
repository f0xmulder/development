import React, { Component } from 'react'
import APIFilter from '../../components/APIFilter'
import APIList from '../../components/APIList'
import './index.css'

class Overview extends Component {
    constructor(props) {
        super(props)

        this.state = {
            result: {},
            error: false,
            loaded: false
        }

        this.getQueryParams = this.getQueryParams.bind(this)
        this.onFilterChange = this.onFilterChange.bind(this)
    }

    componentDidMount() {
        this
            .fetchApiList()
            .then(result => {
                this.setState({ result, loaded: true })
            }, error => {
                this.setState({ error: true, loaded: true })
                console.error(error)
            })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.location && (prevProps.location.search !== this.props.location.search)) {
            this.fetchApiList()
                .then(result => {
                    this.setState({ result })
                }, error => {
                    this.setState({ error: true })
                })
        }
    }

    fetchApiList() {
        return fetch(`/api/apis?${this.generateQueryParams(this.getQueryParams())}`)
            .then(response => {
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error(`Er ging iets fout tijdens het ophalen van de API's`)
                }
            })
    }

    onFilterChange(newFilters) {
        const currentFilters = this.getQueryParams()

        if (newFilters.q !== currentFilters.q) {
            newFilters.tags = []
            newFilters.organization_name = []
            newFilters.api_specification_type = []
        }

        const translatedFilters = {
            q: newFilters.q,
            tags: newFilters.tags,
            organisatie: newFilters.organization_name,
            specificatie: newFilters.api_specification_type
        }

        const { history } = this.props
        history.push(`?${this.generateQueryParams(translatedFilters)}`)
    }

    generateQueryParams(filters) {
        const urlParams = new URLSearchParams()

        Object.keys(filters).forEach((key) => {
            if (filters[key].length === 0) {
                return
            }

            if (filters[key] instanceof Array) {
                filters[key].forEach((value) => {
                    urlParams.append(key, value)
                })
            } else {
                urlParams.append(key, filters[key])
            }
        })

        return urlParams
    }

    getQueryParams() {
        const { location } = this.props
        const values = new URLSearchParams(location ? location.search : {})

        return {
            q: values.get('q') || '',
            tags: values.getAll('tags'),
            organization_name: values.getAll('organisatie'),
            api_specification_type: values.getAll('specificatie')
        }
    }

    render() {
        const { result, error, loaded } = this.state

        return (
            <div className="Overview">
                <div className="container">
                    <h1>Overzicht van alle beschikbare API's</h1>
                    {
                        !loaded ?
                            null :
                            error ?
                                <p data-test="error-message">Er ging iets fout tijdens het ophalen van de API's.</p> :
                                <div className="Overview__sections">
                                    <div className="Overview__sidebar">
                                        <APIFilter initialValues={this.getQueryParams()} facets={result.facets} onSubmit={this.onFilterChange} />
                                    </div>
                                    <div className="Overview__list">
                                        {result && result.apis && result.apis.length > 0 ?
                                            <APIList apis={result.apis} />
                                        :
                                            <p data-test="no-apis-available-message">Er zijn (nog) geen API's beschikbaar.</p>
                                        }
                                    </div>
                                </div>
                    }
                </div>
            </div>
        );
    }
}

export default Overview;
