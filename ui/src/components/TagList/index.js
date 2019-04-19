import React from 'react'
import {arrayOf, string} from 'prop-types'
import {Link} from 'react-router-dom'

const TagList = ({ tags }) =>
    <div className="TagList">
        <ul>
            {
                tags
                    .map((tag, i) =>
                        <li key={i}>
                            <Link to={`/overzicht?tags=${tag}`} data-test="link">{tag}</Link>
                        </li>
                    )
            }
        </ul>
    </div>

TagList.propTypes = {
    tags: arrayOf(string)
}

TagList.defaultProps = {
    tags: []
}

export default TagList
