import React, { Component } from 'react'
import HomePage from '../../components/HomePage/HomePage'

type Props = {}

type State = {
  amountOfAPIs: number
}

class Home extends Component<Props, State> {
  state = {
    amountOfAPIs: 0,
  }

  fetchAPIs() {
    return fetch(`/api/apis`).then((response) => {
      if (response.ok) {
        return response.json()
      } else {
        throw new Error(
          `Er ging iets fout bij het ophalen van de lijst met API's`,
        )
      }
    })
  }

  loadAmountOfAPIs() {
    this.fetchAPIs().then((response) => {
      this.setState({
        amountOfAPIs: response.total,
      })
    })
  }

  componentDidMount() {
    this.loadAmountOfAPIs()
  }

  render() {
    const { amountOfAPIs } = this.state
    return amountOfAPIs ? <HomePage amountOfAPIs={amountOfAPIs} /> : null
  }
}

export default Home
