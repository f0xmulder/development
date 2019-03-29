import React from 'react'
import {Link} from 'react-router-dom';
import { shape, string, arrayOf } from 'prop-types'

const ImplementedByList = ({ apis }) =>
    <div className="ImplementedByList">
        <h3>Geïmplementeerd door</h3>
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

ImplementedByList.propTypes = {
    apis: arrayOf(shape({
        id: string.isRequired,
        service_name: string.isRequired,
        organization_name: string.isRequired
    }))
}

export default ImplementedByList
