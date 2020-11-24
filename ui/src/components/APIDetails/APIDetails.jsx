// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import React from 'react'
import { Route } from 'react-router-dom'
import { useRouteMatch } from 'react-router'
import PropTypes from 'prop-types'

import { RELATION_TYPE_REFERENCE_IMPLEMENTATION } from '../../constants'
import { APIType, APIAuthentication } from '../../models/enums'

import { Container, Row, Col } from '../design-system-candidates/Grid'
import APIDetailsHeader from '../APIDetailsHeader/APIDetailsHeader'
import ImplementedByListContainer from '../ImplementedByListContainer/ImplementedByListContainer'
import LinkToAPIContainer from '../LinkToAPIContainer/LinkToAPIContainer'
import Card from '../Card/Card'
import ForumPosts from '../ForumPosts/ForumPosts'
import { designRuleScores } from '../../models/propTypes'
import APIDesignRulesPane from './components/APIDesignRulesPane/APIDesignRulesPane'
import APIEnvironments from './components/APIEnvironments/APIEnvironments'
import APITerms from './components/APITerms/APITerms'
import GradeBox from './components/GradeBox/GradeBox'
import APIScoresPane from './components/APIScoresPane/APIScoresPane'

import { Description } from './APIDetails.styles'

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
  apiAuthentication,
  environments,
  forum,
  isReferenceImplementation,
  relations,
  termsOfUse,
  scores,
  designRuleScores,
  totalScore,
}) => {
  const match = useRouteMatch('/apis')
  const showDesignRuleScores = !!designRuleScores

  return (
    <Container>
      <APIDetailsHeader
        previousName="API overzicht"
        serviceName={serviceName}
        organizationName={organizationName}
        apiType={apiType}
        backLink={match.url}
      />

      <Row>
        <Col width={[1, 3 / 4]}>
          <Description>{description}</Description>
        </Col>
        <Col width={[1, 1 / 4]}>
          <GradeBox
            apiId={id}
            totalScore={totalScore}
            isDesignRulesScore={showDesignRuleScores}
          />
        </Col>
      </Row>

      <Row>
        <Col width={[1, 3 / 4]}>
          <APITerms
            apiAuthentication={apiAuthentication}
            termsOfUse={termsOfUse}
          />
        </Col>
      </Row>

      {environments && environments.length > 0 ? (
        <Card>
          <Card.Body>
            <APIEnvironments environments={environments} apiId={id} />
          </Card.Body>
        </Card>
      ) : null}

      {forum && forum.url && (
        <Card>
          <Card.Body>
            <ForumPosts forum={forum} />
          </Card.Body>
        </Card>
      )}

      {isReferenceImplementation ? (
        <Card data-test="is-reference">
          <Card.Body>
            <Card.Title>Geïmplementeerd door</Card.Title>
            <ImplementedByListContainer id={id} />
          </Card.Body>
        </Card>
      ) : null}

      {!isReferenceImplementation &&
      referenceImplementationsFromRelations(relations).length > 0 ? (
        <Card data-test="uses-reference">
          <Card.Body>
            <Card.Title>Referentie implementatie</Card.Title>
            {referenceImplementationsFromRelations(relations).map((apiId) => (
              <LinkToAPIContainer id={apiId} key={apiId} />
            ))}
          </Card.Body>
        </Card>
      ) : null}

      <Route
        exact
        path={`${match.url}/:id/score-detail`}
        render={() => {
          return showDesignRuleScores ? (
            <APIDesignRulesPane
              parentUrl={`/apis/${id}`}
              designRuleScores={designRuleScores}
              totalScore={totalScore}
            />
          ) : (
            <APIScoresPane
              parentUrl={`/apis/${id}`}
              scores={scores}
              totalScore={totalScore}
            />
          )
        }}
      />
    </Container>
  )
}

APIDetails.propTypes = {
  id: PropTypes.string.isRequired,
  serviceName: PropTypes.string.isRequired,
  organizationName: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  apiType: PropTypes.instanceOf(APIType).isRequired,
  apiAuthentication: PropTypes.instanceOf(APIAuthentication).isRequired,
  environments: PropTypes.arrayOf(PropTypes.object),
  forum: PropTypes.object,
  isReferenceImplementation: PropTypes.bool,
  relations: PropTypes.object,
  termsOfUse: PropTypes.shape({
    governmentOnly: PropTypes.bool,
    payPerUse: PropTypes.bool,
    uptimeGuarantee: PropTypes.number,
    supportResponseTime: PropTypes.number,
  }),
  scores: PropTypes.shape({
    hasDocumentation: PropTypes.bool,
    hasSpecification: PropTypes.bool,
    hasContactDetails: PropTypes.bool,
    providesSla: PropTypes.bool,
  }),
  designRuleScores: designRuleScores,
  totalScore: PropTypes.shape({
    points: PropTypes.number.isRequired,
    maxPoints: PropTypes.number.isRequired,
  }).isRequired,
}

export default APIDetails
