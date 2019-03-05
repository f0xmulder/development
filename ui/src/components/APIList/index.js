import React from 'react'
import {arrayOf, shape, string} from 'prop-types'
import {Link} from 'react-router-dom'

const APIList = ({ apis }) =>
    <div className="APIList">
        <ul>
            {
                apis
                    .map((api, i) =>
                        <li key={i}>
                            <Link to={`/detail/${api['id']}`} data-test="link">
                                {api['service_name']} - {api['organization_name']}
                            </Link>
                        </li>
                    )
            }
        </ul>
    </div>

APIList.propTypes = {
    apis: arrayOf(shape({
        id: string.isRequired,
        service_name: string.isRequired,
        organization_name: string.isRequired
    }))
}

export default APIList
