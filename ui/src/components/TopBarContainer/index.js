import React, { Component } from 'react'
import { shape, string, func } from 'prop-types'
import { withRouter } from 'react-router'
import TopBar from '../TopBar'

export const isURLHomePage = (url) => url === '/'

export class TopBarContainer extends Component {
  constructor(props) {
    super(props)

    this.onSearchSubmitHandler = this.onSearchSubmitHandler.bind(this)
  }

  onSearchSubmitHandler(query) {
    const { history } = this.props

    const urlParams = new URLSearchParams()
    urlParams.set('q', query)
    history.push(`/overzicht?${urlParams}`)
  }

  render() {
    const { location } = this.props
    const urlSearchParams = new URLSearchParams(location.search)
    const query = urlSearchParams.get('q') || ''

    return (
      <TopBar
        query={query}
        showSearch={!isURLHomePage(location.pathname)}
        onSearchSubmitHandler={this.onSearchSubmitHandler}
      />
    )
  }
}

TopBarContainer.propTypes = {
  location: shape({
    pathname: string.isRequired,
  }).isRequired,
  history: shape({
    push: func.isRequired,
  }).isRequired,
}

export default withRouter(TopBarContainer)
