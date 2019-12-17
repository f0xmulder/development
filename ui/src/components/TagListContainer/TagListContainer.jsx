import React, { Component } from 'react'
import TagList from '../TagList/TagList'

class TagListContainer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      tags: [],
      error: false,
      loaded: false,
    }
  }

  fetchTagList() {
    return fetch('/api/tags').then((response) => {
      if (response.ok) {
        return response.json()
      } else {
        throw new Error('Er ging iets fout tijdens het ophalen van de tags')
      }
    })
  }

  componentDidMount() {
    this.fetchTagList().then(
      (tags) => {
        this.setState({ tags, loaded: true })
      },
      (error) => {
        this.setState({ error: true, loaded: true })
        console.error(error)
      },
    )
  }

  render() {
    const { tags, error, loaded } = this.state
    const props = this.props

    return !loaded ? null : error ? (
      <p data-test="error-message">
        Er ging iets fout tijdens het ophalen van de tags.
      </p>
    ) : tags && tags.length > 0 ? (
      <TagList tags={tags} {...props} />
    ) : (
      <p data-test="no-tags-available-message">
        Er zijn (nog) geen tags beschikbaar.
      </p>
    )
  }
}

export default TagListContainer
