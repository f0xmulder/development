import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      apis: []
    }
  }

  fetchApiList() {
    return fetch('/api/list')
      .then(response => response.json())
  }

  componentWillMount() {
    this
      .fetchApiList()
      .then(apis => {
        this.setState({ apis })
      })
  }

  render() {
    const { apis } = this.state

    return (
      <div className="App">
        <h1>API overview</h1>
        {
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

export default App;
