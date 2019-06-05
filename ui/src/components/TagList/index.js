import React from 'react'
import { arrayOf, string } from 'prop-types'
import { Container, StyledLink } from './index.styles.js'

const TagList = ({ tags, ...props }) => (
  <Container {...props}>
    {tags && tags.length > 0 ? (
      <ul>
        {tags.map((tag, i) => (
          <li key={i}>
            <StyledLink to={`/overzicht?tags=${tag}`} data-test="link">
              {tag}
            </StyledLink>
          </li>
        ))}
      </ul>
    ) : null}
  </Container>
)

TagList.propTypes = {
  tags: arrayOf(string),
}

TagList.defaultProps = {
  tags: [],
}

export default TagList
