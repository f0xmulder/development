// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import React from 'react'
import PropTypes from 'prop-types'

import ExternalIcon from '../Icons/External'
import ForumPost from './ForumPost'
import { PostList, ForumLinkSection, LinkText } from './ForumPosts.styles'

const ForumPostsList = ({ url, posts }) => (
  <>
    <PostList>
      {posts.map((post) => (
        <ForumPost key={post.id} url={url} {...post} />
      ))}
    </PostList>

    <ForumLinkSection>
      <a href={url} target="_blank" rel="noopener noreferrer">
        <LinkText>Naar het forum</LinkText> <ExternalIcon />
      </a>
    </ForumLinkSection>
  </>
)

ForumPostsList.propTypes = {
  url: PropTypes.string.isRequired,
  posts: PropTypes.array.isRequired,
}

export default ForumPostsList
