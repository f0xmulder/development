import React from 'react'
import { string } from 'prop-types'
import { Link } from 'react-router-dom'

const LinkToAPI = ({ id, serviceName, organizationName, ...props }) => (
  <Link to={`/detail/${id}`} data-test="link" {...props}>
    {serviceName} - {organizationName}
  </Link>
)

LinkToAPI.propTypes = {
  id: string.isRequired,
  serviceName: string.isRequired,
  organizationName: string.isRequired,
}

export default LinkToAPI
