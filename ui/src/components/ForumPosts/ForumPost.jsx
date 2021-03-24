// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import React from 'react'
import PropTypes from 'prop-types'

import { formatAsTimeAgo } from '../../utils/timeAgo'
import {
  Post,
  PostInfo,
  StyledExternalIcon,
  PostTitle,
  PostBody,
  StyledMessageIcon,
  PostsCount,
  LatestMessage,
  PostImage,
} from './ForumPosts.styles'

const showDate = (timestamp) => {
  const date = new Date(timestamp)
  return formatAsTimeAgo(date)
}

const ForumPost = ({
  url,
  title,
  lastPostedAt,
  postsCount,
  slug,
  lastPosterUsername,
}) => {
  const baseUrl = url.substring(0, url.indexOf('/c/'))
  return (
    <Post
      href={`${baseUrl}/t/${slug}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      <PostImage title={lastPosterUsername}>
        {lastPosterUsername?.substring(0, 1).toUpperCase()}
      </PostImage>

      <PostBody>
        <PostTitle>{title}</PostTitle>
        <PostInfo>
          <StyledMessageIcon />
          <PostsCount>{postsCount}</PostsCount>
          <LatestMessage>
            Laatste bericht: {showDate(lastPostedAt)}
          </LatestMessage>
        </PostInfo>
      </PostBody>
      <StyledExternalIcon />
    </Post>
  )
}

ForumPost.propTypes = {
  url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  lastPosterUsername: PropTypes.string.isRequired,
  lastPostedAt: PropTypes.string.isRequired,
  postsCount: PropTypes.number.isRequired,
  slug: PropTypes.string.isRequired,
}

export default ForumPost
