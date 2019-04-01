import React from 'react'
import {string} from 'prop-types'
import {Link} from 'react-router-dom'

const LinkToAPI = ({ id, service_name, organization_name }) =>
    <Link to={`/detail/${id}`} data-test="link">
        {service_name} - {organization_name}
    </Link>

LinkToAPI.propTypes = {
    id: string.isRequired,
    service_name: string.isRequired,
    organization_name: string.isRequired
}

export default LinkToAPI
