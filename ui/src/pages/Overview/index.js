import React, { Component } from 'react';
import APIList from "../../components/APIList";

import './index.css'

class Overview extends Component {
    constructor(props) {
        super(props)

        this.state = {
            apis: [],
            error: false,
            loaded: false
        }
    }

    fetchApiList() {
        return fetch('/api/apis')
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

    render() {
        const { apis, error, loaded } = this.state

        return (
            <div className="Overview container">
                <h1>Overzicht van alle beschikbare API's</h1>
                {
                    !loaded ?
                        null :
                        error ?
                            <p data-test="error-message">Er ging iets fout tijdens het ophalen van de API's.</p> :
                            apis && apis.length > 0 ?
                                <APIList apis={apis}/>
                    :
                                <p data-test="no-apis-available-message">Er zijn (nog) geen API's beschikbaar.</p>
                }
            </div>
        );
    }
}

export default Overview;
