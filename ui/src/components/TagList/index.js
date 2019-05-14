import React from 'react'
import {arrayOf, string} from 'prop-types'
import {Container, StyledLink} from './index.styles.js'

const TagList = ({ tags }) =>
    <Container>
        <ul>
            {
                tags
                    .map((tag, i) =>
                        <li key={i}>
                            <StyledLink to={`/overzicht?tags=${tag}`} data-test="link">{tag}</StyledLink>
                        </li>
                    )
            }
        </ul>
    </Container>

TagList.propTypes = {
  tags: arrayOf(string),
}

TagList.defaultProps = {
  tags: [],
}

export default TagList
