import React from 'react'
import {arrayOf, shape, string} from 'prop-types'
import LinkToAPI from '../LinkToAPI'

const APIList = ({ apis }) =>
    <div className="APIList">
        <ul>
            {
                apis
                    .map((api, i) =>
                        <li key={i}><LinkToAPI {...api}/></li>
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
