// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import React from 'react'
import PropTypes from 'prop-types'
import { Button } from '@commonground/design-system'

import ForumPost from './ForumPost'
import {
  PostList,
  ForumLinkSection,
  PostListItem,
  StyledChevronRight,
} from './ForumPosts.styles'

const ForumPostsList = ({ url, posts }) => (
  <>
    <PostList>
      {posts.map((post) => (
        <PostListItem key={post.id}>
          <ForumPost url={url} {...post} />
        </PostListItem>
      ))}
    </PostList>

    <ForumLinkSection>
      <Button
        variant="link"
        as="a"
        href={url}
        target="_blank"
        rel="noopener noreferrer"
      >
        Ga naar volledige forum <StyledChevronRight />
      </Button>
    </ForumLinkSection>
  </>
)

ForumPostsList.propTypes = {
  url: PropTypes.string.isRequired,
  posts: PropTypes.array.isRequired,
}

export default ForumPostsList
