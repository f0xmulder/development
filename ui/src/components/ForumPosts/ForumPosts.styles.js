import styled from 'styled-components'

export const PostList = styled.ul`
  padding: 0;
  list-style: none;
`

export const Post = styled.li`
  margin-bottom: 8px;
  &:hover {
    background-color: ${(p) => p.theme.color.tagBackground};
  }
`

export const PostInfo = styled.span`
  font-size: 0.8rem;
  color: ${(p) => p.theme.color.text.light};
`

export const ForumLinkSection = styled.section`
  padding-top: 1rem;
  border-top: 1px solid #ccc;
`
