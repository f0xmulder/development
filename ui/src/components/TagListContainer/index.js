import React, { Component } from 'react'
import { object } from 'prop-types'
import TagList from '../TagList';

class TagListContainer extends Component {
    constructor(props) {
        super(props)

        this.state = {
            tags: [],
            error: false,
            loaded: false
        }
    }

    fetchTagList() {
        return fetch('/api/tags')
            .then(response => {
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error('Failed to fetch tag list')
                }
            })
    }

    componentDidMount() {
        this
            .fetchTagList()
            .then(tags => {
                this.setState({ tags, loaded: true })
            }, error => {
                this.setState({ error: true, loaded: true })
                console.error(error)
            })
    }

    render() {
        const { tags, error, loaded } = this.state

        return (
            <div className="TagListContainer">
                {
                    !loaded ?
                        null :
                        error ?
                            <p data-test="error-message">Failed loading the tags</p> :
                            tags && tags.length > 0 ?
                                <TagList tags={tags} />
                    :
                                <p data-test="no-tags-available-message">No tags available (yet)</p>
                }
            </div>
        );
    }
}

export default TagListContainer
