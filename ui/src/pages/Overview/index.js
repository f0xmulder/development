import React, { Component } from 'react'
import APIFilter from '../../components/APIFilter'
import APIList from '../../components/APIList'
import './index.css'

class Overview extends Component {
    constructor(props) {
        super(props)

        this.state = {
            list: {},
            error: false,
            loaded: false
        }

        this.getFilterValues = this.getFilterValues.bind(this)
        this.onFilterChange = this.onFilterChange.bind(this)
    }

    componentDidMount() {
        this
            .fetchApiList()
            .then(list => {
                this.setState({ list, loaded: true })
            }, error => {
                this.setState({ error: true, loaded: true })
                console.error(error)
            })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.location && (prevProps.location.search !== this.props.location.search)) {
            this.fetchApiList()
                .then(list => {
                    this.setState({ list })
                }, error => {
                    this.setState({ error: true })
                })
        }
    }

    fetchApiList() {
        return fetch(`/api/apis?${this.generateURL(this.getFilterValues())}`)
            .then(response => {
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error(`Er ging iets fout tijdens het ophalen van de API's`)
                }
            })
    }

    onFilterChange(newFilters) {
        const currentFilters = this.getFilterValues()

        if (newFilters.q !== currentFilters.q) {
            newFilters.tags = []
            newFilters.organization_name = []
            newFilters.api_specification_type = []
        }

        const { history } = this.props
        history.push(`?${this.generateURL(newFilters)}`)
    }

    generateURL(filters) {
        const urlParams = new URLSearchParams()

        if (filters.q) {
            urlParams.append('q', filters.q)
        }

        ['tags', 'organization_name', 'api_specification_type'].forEach((key) => {
            if (filters[key] && filters[key].length > 0) {
                filters[key].forEach((value) => {
                    urlParams.append(key, value)
                })
            }
        })

        return urlParams
    }

    getFilterValues() {
        const { location } = this.props
        const values = new URLSearchParams(location ? location.search : {})

        return {
            q: values.get('q') || '',
            tags: values.getAll('tags'),
            organization_name: values.getAll('organization_name'),
            api_specification_type: values.getAll('api_specification_type')
        }
    }

    render() {
        const { list, error, loaded } = this.state

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
                                        <APIFilter initialValues={this.getFilterValues()} facets={list.facets} onSubmit={this.onFilterChange} />
                                    </div>
                                    <div className="Overview__list">
                                        {list && list.apis && list.apis.length > 0 ?
                                            <APIList apis={list.apis} />
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
