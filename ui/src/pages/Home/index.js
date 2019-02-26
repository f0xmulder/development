import React, { Component } from 'react';

class Home extends Component {
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
                    throw new Error('Failed to fetch API list')
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
            <div className="Home">
                <h1>API overview</h1>
                {
                    !loaded ?
                        null :
                        error ?
                            <p data-test="error-message">Failed loading the available APIs</p> :
                            apis && apis.length > 0 ?
                                <ul>
                                    { apis.map((api, i) => <li key={i}>{ api['organization_name'] }</li>) }
                                </ul> :
                                <p data-test="no-apis-available-message">No APIs available (yet)</p>
                }
            </div>
        );
    }
}

export default Home;
