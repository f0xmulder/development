import React from 'react'
import { string, array, bool, object } from 'prop-types'
import { Formik, Form } from 'formik'

import ImplementedByListContainer from '../ImplementedByListContainer'
import LinkToAPIContainer from '../LinkToAPIContainer'
import Grade from '../Grade'
import External from '../Icons/External'
import Card from '../Card'
import PageContentCard from '../PageContentCard'

import { RELATION_TYPE_REFERENCE_IMPLEMENTATION } from '../../constants'

import {
  PageTitle,
  SubTitle,
  DocumentationContainer,
  DocumentationButton,
  StyledTagList,
  CardsContainer,
  StyledField,
  StyledDl,
  StyledScoresUl,
  StyledScoresLi,
  StyledAPIDetails,
} from './index.styles'

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
  tags,
  isReferenceImplementation,
  relations,
  termsOfUse,
  scores,
}) => (
  <StyledAPIDetails>
    <PageTitle>{serviceName}</PageTitle>
    <SubTitle>{organizationName}</SubTitle>

    <DocumentationContainer>
      <DocumentationButton
        href={documentationUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        Documentatie <External width="12px" height="12px" />
      </DocumentationButton>
    </DocumentationContainer>

    <CardsContainer>
      <CardsContainer.Main>
        <PageContentCard>
          <PageContentCard.Body>
            <p>{description}</p>
            <StyledTagList tags={tags} />
          </PageContentCard.Body>
          <PageContentCard.Footer>
            <Formik>
              <Form>
                <StyledField type="text" value={apiUrl} name="documentation-url" readOnly />
              </Form>
            </Formik>
          </PageContentCard.Footer>
        </PageContentCard>
      </CardsContainer.Main>

      <CardsContainer.SideBar>
        <Card>
          <Card.Body>
            <StyledDl>
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

              <dt>Gebruik</dt>
              <dd>
                {termsOfUse.government_only ? 'Alleen overheid' : 'Iedereen'}
              </dd>

              <dt>Kosten</dt>
              <dd>
                {termsOfUse.pay_per_use ? 'Kosten voor gebruik' : 'Gratis'}
              </dd>

              <dt>Uptime garantie</dt>
              <dd>
                {termsOfUse.uptime_guarantee
                  ? `${termsOfUse.uptime_guarantee}%`
                  : 'Geen'}
              </dd>

              <dt>Helpdesk response</dt>
              <dd>
                {termsOfUse.support_response_time
                  ? `${termsOfUse.support_response_time}`
                  : 'Geen'}
              </dd>
            </StyledDl>
          </Card.Body>
        </Card>

        <Card>
          <Card.Body>
            <Grade scores={scores} />

            <StyledScoresUl>
              <StyledScoresLi available={scores.hasDocumentation}>
                Documentatie
              </StyledScoresLi>
              <StyledScoresLi available={scores.hasSpecification}>
                Specificatie
              </StyledScoresLi>
              <StyledScoresLi available={scores.hasContactDetails}>
                Contactgegevens
              </StyledScoresLi>
              <StyledScoresLi available={scores.providesSla}>
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
          <Card>
            <Card.Body>
              <Card.Title>Badges</Card.Title>
              <ul data-test="badges">
                {badges.map((badge, i) => (
                  <li key={i}>{badge}</li>
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
  serviceName: string.isRequired,
  organizationName: string.isRequired,
  description: string.isRequired,
  apiUrl: string.isRequired,
  apiType: string.isRequired,
  specificationUrl: string.isRequired,
  documentationUrl: string.isRequired,
  isReferenceImplementation: bool,
  tags: array,
  badges: array,
  relations: object,
  termsOfUse: object,
}

export default APIDetails
