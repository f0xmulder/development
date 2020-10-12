// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import React from 'react'
import PropTypes from 'prop-types'

import ExternalIcon from '../Icons/ExternalOld'
import { formatAsTimeAgo } from '../../utils/timeAgo'
import { Post, PostInfo, StyledPostLink, LinkText } from './ForumPosts.styles'

const showDate = (timestamp) => {
  const date = new Date(timestamp)
  return formatAsTimeAgo(date)
}

const ForumPost = ({ url, title, lastPostedAt, postsCount, slug }) => {
  const baseUrl = url.substring(0, url.indexOf('/c/'))
  return (
    <Post>
      <StyledPostLink
        href={`${baseUrl}/t/${slug}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <LinkText>{title}</LinkText> <ExternalIcon />
      </StyledPostLink>
      <PostInfo>
        {postsCount} {`bericht${postsCount > 1 ? 'en' : ''}`} - laatste bericht:{' '}
        {showDate(lastPostedAt)}
      </PostInfo>
    </Post>
  )
}

ForumPost.propTypes = {
  url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  lastPostedAt: PropTypes.string.isRequired,
  postsCount: PropTypes.number.isRequired,
  slug: PropTypes.string.isRequired,
}

export default ForumPost
