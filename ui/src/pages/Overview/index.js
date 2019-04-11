import React, { Component } from 'react'
import APIFilter from '../../components/APIFilter'
import APIList from '../../components/APIList'

import './index.css'

class Overview extends Component {
    constructor(props) {
        super(props)

        this.state = {
            apis: [],
            filters: {},
            error: false,
            loaded: false
        }

        this.onFilterChange = this.onFilterChange.bind(this)
    }

    fetchApiList() {
        const urlParams = new URLSearchParams(this.state.filters)
        return fetch(`/api/apis?${urlParams}`)
            .then(response => {
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error(`Er ging iets fout tijdens het ophalen van de API's`)
                }
            })
    }

    componentDidMount() {
        this
            .fetchApiList()
            .then(apis => {
                this.setState({ apis, loaded: true })
            }, error => {
                this.setState({ error: true, loaded: true })
                console.error(error)
            })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.filters !== this.state.filters) {
            this
                .fetchApiList()
                .then(apis => {
                    this.setState({ apis })
                }, error => {
                    this.setState({ error: true })
                    console.log(error)
                })
        }
    }

    onFilterChange(filters) {
        this.setState({ filters })
    }

    render() {
        const { apis, error, loaded } = this.state

        return (
            <div className="Overview">
                <div className="container">
                    <h1>Overzicht van alle beschikbare API's</h1>
                    {
                        !loaded ?
                            null :
                            error ?
                                <p data-test="error-message">Er ging iets fout tijdens het ophalen van de API's.</p> :
                                apis ?
                                    <div className="Overview__sections">
                                        <div className="Overview__sidebar">
                                            <APIFilter apis={apis} onSubmit={this.onFilterChange} />
                                        </div>
                                        <div className="Overview__list">
                                            <APIList apis={apis}/>
                                        </div>
                                    </div>
                        :
                                    <p data-test="no-apis-available-message">Er zijn (nog) geen API's beschikbaar.</p>
                    }
                </div>
            </div>
        );
    }
}

export default Overview;
