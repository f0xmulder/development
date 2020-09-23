// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import styled from 'styled-components'

import PostLink from './PostLink'

export const PostList = styled.ul`
  padding: 0;
  list-style: none;
`

export const Post = styled.li`
  padding: ${(p) => p.theme.tokens.spacing06} 0px;
  padding-left: ${(p) => p.theme.tokens.spacing03};
  border-bottom: 1px solid ${(p) => p.theme.tokens.colorPaletteGray300};

  &:hover {
    background-color: ${(p) => p.theme.colorBackgroundTag};
  }
`

export const PostInfo = styled.small``

export const ForumLinkSection = styled.section`
  padding-top: 1rem;

  a {
    text-decoration: none;
  }
`
export const StyledPostLink = styled(PostLink)`
  text-decoration: none;
`

export const LinkText = styled.span`
  text-decoration: underline;
`
