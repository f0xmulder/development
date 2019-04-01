import React from 'react'
import { shape, string, arrayOf } from 'prop-types'
import LinkToAPI from '../LinkToAPI'

const ImplementedByList = ({ apis }) =>
    <div className="ImplementedByList">
        <h3>Geïmplementeerd door</h3>
        <ul>
            {
                apis
                    .map((api, i) =>
                        <li key={i}><LinkToAPI {...api}/></li>
                    )
            }
        </ul>
    </div>

ImplementedByList.propTypes = {
    apis: arrayOf(shape({
        id: string.isRequired,
        service_name: string.isRequired,
        organization_name: string.isRequired
    }))
}

export default ImplementedByList
