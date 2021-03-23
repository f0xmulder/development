// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import styled from 'styled-components'

import { ReactComponent as ChevronRight } from '../Icons/chevron-right.svg'
import { ReactComponent as MessageIcon } from '../Icons/message-icon.svg'
import ExternalIcon from '../Icons/External'

export const ForumPostsContainer = styled.div``

export const PostList = styled.ul`
  padding: 0;
  list-style: none;
`

export const PostListItem = styled.li`
  border-bottom: 1px solid ${(p) => p.theme.tokens.colorPaletteGray300};
`

export const Post = styled.a`
  display: flex;
  align-items: center;
  padding: ${(p) => p.theme.tokens.spacing06} ${(p) => p.theme.tokens.spacing03};
  text-decoration: none;
  color: ${(p) => p.theme.colorText};

  &:hover {
    background-color: ${(p) => p.theme.tokens.colorPaletteGray100};
  }

  &:hover,
  &:active {
    color: ${(p) => p.theme.colorText};
  }
`

export const PostBody = styled.div`
  flex-grow: 1;
  /* Trick to allow "text-overflow: ellipsis" in its children,
  see: https://css-tricks.com/flexbox-truncated-text */
  min-width: 0;
`

export const PostTitle = styled.div`
  color: ${(p) => p.theme.colorTextLink};
  font-weight: 600;
`

export const PostInfo = styled.small`
  display: flex;
  align-items: center;
`

export const PostImage = styled.div`
  align-items: center;
  background: #e0e0e0;
  border-radius: 50%;
  color: #616161;
  display: flex;
  min-height: ${(p) => p.theme.tokens.spacing07};
  justify-content: center;
  margin-right: ${(p) => p.theme.tokens.spacing05};
  text-align: center;
  min-width: ${(p) => p.theme.tokens.spacing07};
`

export const StyledMessageIcon = styled(MessageIcon)`
  flex-shrink: 0;
  width: ${(p) => p.theme.tokens.spacing05};
  height: ${(p) => p.theme.tokens.spacing05};
  margin-right: ${(p) => p.theme.tokens.spacing03};
  fill: ${(p) => p.theme.tokens.colorPaletteGray600};
`

export const PostsCount = styled.small`
  flex-shrink: 0;
  margin-right: ${(p) => p.theme.tokens.spacing05};
`

export const LatestMessage = styled.small`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

export const StyledExternalIcon = styled(ExternalIcon)`
  flex-shrink: 0;
  margin-left: ${(p) => p.theme.tokens.spacing05};
`

export const ForumLinkSection = styled.section`
  display: flex;
  justify-content: flex-end;
`

export const StyledChevronRight = styled(ChevronRight)`
  fill: ${(p) => p.theme.colorTextLink};
  margin-left: ${(p) => p.theme.tokens.spacing01};
`
