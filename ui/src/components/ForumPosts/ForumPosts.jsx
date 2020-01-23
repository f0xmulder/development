import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import ErrorMessage from '../ErrorMessage/ErrorMessage'
import fetchForumPosts from './forumFunctions/fetchForumPosts'
import ForumPostsView from './ForumPostsView'

const ForumPosts = ({ forum }) => {
  const { vendor, url } = forum
  const [error, setError] = useState(null)
  const [posts, setPosts] = useState([])

  useEffect(() => {
    ;(async () => {
      const result = await fetchForumPosts(vendor, url)
      if (result) {
        if (!result.error) {
          setError(null)
          setPosts(result.json)
        } else {
          setError(result.error)
        }
      }
    })()
  }, [vendor, url])

  return (
    <>
      <h3>Laatste forum onderwerpen</h3>
      {error && (
        <ErrorMessage level="notify">
          Fout bij het ophalen van forumcontent
        </ErrorMessage>
      )}
      {!error && posts && posts.length && (
        <ForumPostsView url={url} posts={posts} />
      )}
    </>
  )
}

ForumPosts.propTypes = {
  forum: PropTypes.shape({
    vendor: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }),
}

export default ForumPosts
