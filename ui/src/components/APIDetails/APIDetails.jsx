import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import { Table } from '@commonground/design-system'
import { RELATION_TYPE_REFERENCE_IMPLEMENTATION } from '../../constants'

import APIDetailsHeader from '../APIDetailsHeader/APIDetailsHeader'
import ImplementedByListContainer from '../ImplementedByListContainer/ImplementedByListContainer'
import LinkToAPIContainer from '../LinkToAPIContainer/LinkToAPIContainer'
import Grade from '../Grade/Grade'
import External from '../Icons/External'
import Card from '../Card/Card'
import PageContentCard from '../PageContentCard/PageContentCard'
import ForumPosts from '../ForumPosts/ForumPosts'

import {
  StyledTagList,
  CardsContainer,
  ApiLink,
  StyledTable,
  StyledDl,
  StyledScoresUl,
  StyledScoresLi,
  StyledAPIDetails,
} from './APIDetails.styles'

export const referenceImplementationsFromRelations = (relations = {}) =>
  Object.keys(relations).filter((apiId) =>
    relations[apiId].includes(RELATION_TYPE_REFERENCE_IMPLEMENTATION),
  )

const APIDetails = ({
  id,
  serviceName,
  organizationName,
  description,
  apiType,
  badges,
  tags,
  environments,
  forum,
  isReferenceImplementation,
  relations,
  termsOfUse,
  scores,
}) => (
  <StyledAPIDetails>
    <APIDetailsHeader
      serviceName={serviceName}
      organizationName={organizationName}
    />

    <CardsContainer>
      <CardsContainer.Main>
        <PageContentCard>
          <PageContentCard.Body>
            <p>{description}</p>
            <StyledTagList tags={tags} />
          </PageContentCard.Body>
          <PageContentCard.Footer>
            {environments && environments.length > 0 && (
              <StyledTable>
                <Table.Head>
                  <Table.Row>
                    <Table.HeadCell>Omgeving</Table.HeadCell>
                    <Table.HeadCell>URL</Table.HeadCell>
                    <Table.HeadCell>API Specificatie</Table.HeadCell>
                    <Table.HeadCell>API Documentatie</Table.HeadCell>
                  </Table.Row>
                </Table.Head>
                <Table.Body data-test="environments-table-body">
                  {environments.map((env, i) => (
                    <Table.Row key={i}>
                      <Table.BodyCell>{env.name}</Table.BodyCell>
                      <Table.BodyCell>
                        <ApiLink
                          href={env.apiUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          data-test="api-url"
                        >
                          {env.apiUrl} <External />
                        </ApiLink>
                      </Table.BodyCell>
                      <Table.BodyCell>
                        {env.specificationUrl && env.name ? (
                          <Link
                            to={`/detail/${id}/${env.name.toLowerCase()}/specificatie`}
                            data-test="api-specification-url"
                          >
                            Specificatie
                          </Link>
                        ) : (
                          '—'
                        )}
                      </Table.BodyCell>
                      <Table.BodyCell>
                        {env.documentationUrl ? (
                          <ApiLink
                            href={env.documentationUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            data-test="api-documentation-url"
                          >
                            Documentatie <External />
                          </ApiLink>
                        ) : (
                          '—'
                        )}
                      </Table.BodyCell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </StyledTable>
            )}
          </PageContentCard.Footer>
        </PageContentCard>

        {forum && forum.url && (
          <PageContentCard>
            <PageContentCard.Body>
              <ForumPosts forum={forum} />
            </PageContentCard.Body>
          </PageContentCard>
        )}
      </CardsContainer.Main>

      <CardsContainer.SideBar>
        <Card data-test="api-terms-of-use">
          <Card.Body>
            <StyledDl>
              <dt>API Type</dt>
              <dd data-test="api-type">{apiType}</dd>
              <dt>Gebruik</dt>
              <dd>
                {termsOfUse.governmentOnly ? 'Alleen overheid' : 'Iedereen'}
              </dd>

              <dt>Kosten</dt>
              <dd>{termsOfUse.payPerUse ? 'Kosten voor gebruik' : 'Gratis'}</dd>

              <dt>Uptime garantie</dt>
              <dd>
                {termsOfUse.uptimeGuarantee
                  ? `${termsOfUse.uptimeGuarantee}%`
                  : 'Geen'}
              </dd>

              <dt>Helpdesk response</dt>
              <dd>
                {termsOfUse.supportResponseTime
                  ? `${termsOfUse.supportResponseTime}`
                  : 'Geen'}
              </dd>
            </StyledDl>
          </Card.Body>
        </Card>

        <Card data-test="api-scores">
          <Card.Body>
            <Grade scores={scores} />

            <StyledScoresUl>
              <StyledScoresLi available={!!scores.hasDocumentation}>
                Documentatie
              </StyledScoresLi>
              <StyledScoresLi available={!!scores.hasSpecification}>
                Specificatie
              </StyledScoresLi>
              <StyledScoresLi available={!!scores.hasContactDetails}>
                Contactgegevens
              </StyledScoresLi>
              <StyledScoresLi available={!!scores.providesSla}>
                SLA
              </StyledScoresLi>
            </StyledScoresUl>
          </Card.Body>
        </Card>

        {isReferenceImplementation ? (
          <Card>
            <Card.Body>
              <Card.Title>Geïmplementeerd door</Card.Title>
              <ImplementedByListContainer id={id} />
            </Card.Body>
          </Card>
        ) : null}

        {!isReferenceImplementation &&
        referenceImplementationsFromRelations(relations).length > 0 ? (
          <Card>
            <Card.Body>
              <Card.Title>Referentie implementatie</Card.Title>
              {referenceImplementationsFromRelations(relations).map((apiId) => (
                <LinkToAPIContainer id={apiId} key={apiId} />
              ))}
            </Card.Body>
          </Card>
        ) : null}

        {badges && badges.length ? (
          <Card data-test="api-badges">
            <Card.Body>
              <Card.Title>Badges</Card.Title>
              <ul data-test="api-badges-list">
                {badges.map((badge, i) => (
                  <li key={`${i}-${badge}`}>{badge}</li>
                ))}
              </ul>
            </Card.Body>
          </Card>
        ) : null}
      </CardsContainer.SideBar>
    </CardsContainer>
  </StyledAPIDetails>
)

APIDetails.propTypes = {
  id: PropTypes.string.isRequired,
  serviceName: PropTypes.string.isRequired,
  organizationName: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  apiType: PropTypes.string.isRequired,
  badges: PropTypes.arrayOf(PropTypes.string),
  tags: PropTypes.arrayOf(PropTypes.string),
  environments: PropTypes.arrayOf(PropTypes.object),
  forum: PropTypes.object,
  isReferenceImplementation: PropTypes.bool,
  relations: PropTypes.object,
  termsOfUse: PropTypes.shape({
    governmentOnly: PropTypes.bool,
    payPerUse: PropTypes.bool,
    uptimeGuarantee: PropTypes.number,
    supportResponseTime: PropTypes.string,
  }),
  scores: PropTypes.shape({
    hasDocumentation: PropTypes.bool,
    hasSpecification: PropTypes.bool,
    hasContactDetails: PropTypes.bool,
    providesSla: PropTypes.bool,
  }),
}

export default APIDetails
