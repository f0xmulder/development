import React from 'react'
import PropTypes from 'prop-types'

const PostLink = (props) => (
  <div>
    <a {...props}>{props.children}</a>
  </div>
)

PostLink.propTypes = {
  children: PropTypes.node,
}

export default PostLink
