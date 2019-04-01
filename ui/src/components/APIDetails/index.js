import React, { Fragment } from 'react'
import { string, array, bool, object } from 'prop-types'

import ImplementedByListContainer from '../ImplementedByListContainer'

import './index.css'
import LinkToAPIContainer from "../LinkToAPIContainer";

import { RELATION_TYPE_REFERENCE_IMPLEMENTATION } from '../../constants'

const getOnlineRedocUrl = specUrl =>
    `https://rebilly.github.io/ReDoc/?url=${encodeURIComponent(specUrl)}`

export const referenceImplementationsFromRelations = relations =>
    Object
        .keys(relations || {})
        .filter(apiId => relations[apiId].includes(RELATION_TYPE_REFERENCE_IMPLEMENTATION))

const APIDetails = ({ id, service_name, organization_name, description, api_url, api_specification_type, specification_url, documentation_url, badges, is_reference_implementation, relations, terms_of_use }) =>
    <div className="APIDetails">
        <h1 className="title">{ service_name }</h1>
        <h2 className="subtitle">{ organization_name }</h2>

        <div className="APIDetails__sections">
            <div className="APIDetails__general">
                <p>{ description }</p>

                {
                    badges && badges.length ?
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

            <div className="APIDetails__other">
                <dl>
                    <dt>Documentatie</dt>
                    <dd data-test="api-documentation-url">
                        <a href={documentation_url} target="_blank" rel="noopener noreferrer">Lees meer</a>
                    </dd>

                    <dt>Basis URL</dt>
                    <dd data-test="api-url" className="base-url">
                        <a href={api_url} target="_blank" rel="noopener noreferrer">{ api_url }</a>
                    </dd>

                    <dt>API Specificatie</dt>
                    <dd data-test="api-specification-type">
                        <a href={getOnlineRedocUrl(specification_url)} target="_blank" rel="noopener noreferrer" data-test="api-specification-url">{ api_specification_type }</a>
                    </dd>

                    <dt>Gebruiksvoorwaarden</dt>
                    <dd data-test="api-terms-of-use">
                        <ul>
                            <li>{ terms_of_use.government_only ? "Alleen overheid" : "Iedereen" }</li>
                            <li>{ terms_of_use.pay_per_use ? "Kosten voor gebruik" : "Gratis gebruik" }</li>
                            <li>{ terms_of_use.uptime_guarantee ? `Uptime garantie is ${terms_of_use.uptime_guarantee}%` : "Geen uptime garantie" }</li>
                            <li>{ terms_of_use.support_response_time ? `Maximale reactietijd bij ondersteuning is ${terms_of_use.support_response_time}` : "Geen minimale reactietijd ondersteuning" }</li>
                        </ul>
                    </dd>
                </dl>

                {
                    is_reference_implementation ?
                        <ImplementedByListContainer id={id}/> : null
                }

                {
                    !is_reference_implementation && referenceImplementationsFromRelations(relations).length > 0 ?
                        <Fragment>
                            <h3>Referentie implementatie</h3>
                            {
                                referenceImplementationsFromRelations(relations)
                                    .map((apiId) => <LinkToAPIContainer id={apiId} key={apiId} />)
                            }
                        </Fragment>
                        : null
                }
            </div>
        </div>
    </div>

APIDetails.propTypes = {
    service_name: string.isRequired,
    organization_name: string.isRequired,
    description: string.isRequired,
    api_url: string.isRequired,
    api_specification_type: string.isRequired,
    specification_url: string.isRequired,
    documentation_url: string.isRequired,
    is_reference_implementation: bool,
    badges: array,
    relations: object,
    terms_of_use: object
}

export default APIDetails
