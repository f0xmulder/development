import React, { Fragment } from 'react'
import { shape, string, array } from 'prop-types'

const APIDetails = ({ details: { service_name, organization_name, description, api_url, api_specification_type, specification_url, documentation_url, badges } }) =>
        <div className="APIDetails">
        <h1>{ service_name } - { organization_name }</h1>
        <p>{ description }</p>
        <dl>
            <dt>API URL</dt>
            <dd data-test="api-url">{ api_url }</dd>

            <dt>API Specification Type</dt>
            <dd data-test="api-specification-type">{ api_specification_type }</dd>

            <dt>API Specification URL</dt>
            <dd data-test="api-specification-url">{ specification_url }</dd>

            <dt>API Documentation URL</dt>
            <dd data-test="api-documentation-url">{ documentation_url }</dd>
        </dl>

        {
            badges ?
                <Fragment>
                    <h2 data-test="badges-title">Badges</h2>
                    <ul data-test="badges">
                        {
                            badges.map((badge, i) =>
                                <li key={i}>{badge}</li>
                            )
                        }
                    </ul>
                </Fragment>
                : null
        }
    </div>

APIDetails.propTypes = {
    details: shape({
        service_name: string.isRequired,
        organization_name: string.isRequired,
        description: string.isRequired,
        api_url: string.isRequired,
        api_specification_type: string.isRequired,
        specification_url: string.isRequired,
        documentation_url: string.isRequired,
        badges: array,
    }).isRequired
}

export default APIDetails
