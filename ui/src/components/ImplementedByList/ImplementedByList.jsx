import React from 'react'
import { shape, string, arrayOf } from 'prop-types'
import LinkToAPI from '../LinkToAPI/LinkToAPI'

const ImplementedByList = ({ apis }) => (
  <div className="ImplementedByList">
    <ul>
      {apis.map((api, i) => (
        <li key={i}>
          <LinkToAPI
            serviceName={api.serviceName}
            organizationName={api.organizationName}
            id={api.id}
          />
        </li>
      ))}
    </ul>
  </div>
)

ImplementedByList.propTypes = {
  apis: arrayOf(
    shape({
      id: string.isRequired,
      serviceName: string.isRequired,
      organizationName: string.isRequired,
    }),
  ),
}

export default ImplementedByList
