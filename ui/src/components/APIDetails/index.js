import React, { Fragment } from 'react'
import { string, array, bool, object } from 'prop-types'

import ImplementedByListContainer from '../ImplementedByListContainer'
import LinkToAPIContainer from '../LinkToAPIContainer'
import Grade from '../../components/Grade'

import { RELATION_TYPE_REFERENCE_IMPLEMENTATION } from '../../constants'

import './index.css'
import { PageTitle, SubTitle } from './index.styles'

const getOnlineRedocUrl = (specUrl) =>
  `https://rebilly.github.io/ReDoc/?url=${encodeURIComponent(specUrl)}`

export const referenceImplementationsFromRelations = (relations) =>
  Object.keys(relations || {}).filter((apiId) =>
    relations[apiId].includes(RELATION_TYPE_REFERENCE_IMPLEMENTATION),
  )

const APIDetails = ({
  id,
  serviceName,
  organizationName,
  description,
  apiUrl,
  apiType,
  specificationUrl,
  documentationUrl,
  badges,
  isReferenceImplementation,
  relations,
  termsOfUse,
  scores,
}) => (
  <div className="APIDetails">
    <PageTitle>{serviceName}</PageTitle>
    <SubTitle>{organizationName}</SubTitle>

    <div className="APIDetails__sections">
      <div className="APIDetails__general">
        <p>{description}</p>

        {badges && badges.length ? (
          <Fragment>
            <h2 data-test="badges-title">Badges</h2>
            <ul data-test="badges">
              {badges.map((badge, i) => (
                <li key={i}>{badge}</li>
              ))}
            </ul>
          </Fragment>
        ) : null}
      </div>

      <div className="APIDetails__other">
        <dl>
          <dt>Documentatie</dt>
          <dd data-test="api-documentation-url">
            <a
              href={documentationUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Lees meer
            </a>
          </dd>

          <dt>Basis URL</dt>
          <dd data-test="api-url" className="base-url">
            <a href={apiUrl} target="_blank" rel="noopener noreferrer">
              {apiUrl}
            </a>
          </dd>

          <dt>API Type</dt>
          <dd data-test="api-type">{apiType}</dd>

          <dt>API Specificatie</dt>
          <dd data-test="api-specification">
            <a
              href={getOnlineRedocUrl(specificationUrl)}
              target="_blank"
              rel="noopener noreferrer"
              data-test="api-specification-url"
            >
              Lees meer
            </a>
          </dd>

          <dt>Gebruiksvoorwaarden</dt>
          <dd data-test="api-terms-of-use">
            <ul>
              <li>
                {termsOfUse.government_only ? 'Alleen overheid' : 'Iedereen'}
              </li>
              <li>
                {termsOfUse.pay_per_use
                  ? 'Kosten voor gebruik'
                  : 'Gratis gebruik'}
              </li>
              <li>
                {termsOfUse.uptime_guarantee
                  ? `Uptime garantie is ${termsOfUse.uptime_guarantee}%`
                  : 'Geen uptime garantie'}
              </li>
              <li>
                {termsOfUse.support_response_time
                  ? `Maximale reactietijd bij ondersteuning is ${
                      termsOfUse.support_response_time
                    }`
                  : 'Geen minimale reactietijd ondersteuning'}
              </li>
            </ul>
          </dd>

          <dt>Score</dt>
          <dd data-test="api-scores">
            <ul>
              <li>
                Heeft documentatie: {scores.has_documentation ? 'Ja' : 'Nee'}
              </li>
              <li>
                Heeft een specificatie:{' '}
                {scores.has_specification ? 'Ja' : 'Nee'}
              </li>
              <li>
                Heeft contactgegevens:{' '}
                {scores.has_contact_details ? 'Ja' : 'Nee'}
              </li>
              <li>Heeft een SLA: {scores.provides_sla ? 'Ja' : 'Nee'}</li>
            </ul>
            <b>
              <Grade scores={scores} />
            </b>
          </dd>
        </dl>

        {isReferenceImplementation ? (
          <ImplementedByListContainer id={id} />
        ) : null}

        {!isReferenceImplementation &&
        referenceImplementationsFromRelations(relations).length > 0 ? (
          <Fragment>
            <h3>Referentie implementatie</h3>
            {referenceImplementationsFromRelations(relations).map((apiId) => (
              <LinkToAPIContainer id={apiId} key={apiId} />
            ))}
          </Fragment>
        ) : null}
      </div>
    </div>
  </div>
)

APIDetails.propTypes = {
  serviceName: string.isRequired,
  organizationName: string.isRequired,
  description: string.isRequired,
  apiUrl: string.isRequired,
  apiType: string.isRequired,
  specificationUrl: string.isRequired,
  documentationUrl: string.isRequired,
  isReferenceImplementation: bool,
  badges: array,
  relations: object,
  termsOfUse: object,
}

export default APIDetails
