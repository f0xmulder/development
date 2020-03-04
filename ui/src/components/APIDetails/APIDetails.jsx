import React from 'react'
import { Link, Route } from 'react-router-dom'
import { useRouteMatch } from 'react-router'
import PropTypes from 'prop-types'

import { RELATION_TYPE_REFERENCE_IMPLEMENTATION } from '../../constants'

import { Container, Row, Col } from '../design-system-candidates/Grid'
import APIDetailsHeader from '../APIDetailsHeader/APIDetailsHeader'
import ImplementedByListContainer from '../ImplementedByListContainer/ImplementedByListContainer'
import LinkToAPIContainer from '../LinkToAPIContainer/LinkToAPIContainer'
import Card from '../Card/Card'
import ForumPosts from '../ForumPosts/ForumPosts'
import APIDesignRulesPane from '../APIDesignRulesPane/APIDesignRulesPane'
import APIEnvironments from './components/APIEnvironments/APIEnvironments'
import APITerms from './components/APITerms/APITerms'
import GradeBox from './components/GradeBox/GradeBox'
import APIScoresPane from './components/APIScoresPane/APIScoresPane'

import {
  Description,
  StyledScoresUl,
  StyledScoresLi,
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
  apiAuthentication,
  environments,
  forum,
  isReferenceImplementation,
  relations,
  termsOfUse,
  scores,
  apiDesignRules,
}) => {
  const match = useRouteMatch('/apis')
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
          <GradeBox scores={scores} apiId={id} />
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

      {/* 
      2020-02-27 See mock data: 
      https://gitlab.com/commonground/developer.overheid.nl/-/merge_requests/1204/diffs#diff-content-879c24a0e37eb0a4feb366194c3b5c91d45512d5
      */}
      {apiDesignRules && apiDesignRules.length && (
        <Card data-test="api-design-rules">
          <Card.Body>
            <Card.Title>API Design Rules</Card.Title>
            <StyledScoresUl data-test="api-design-rules-list">
              {apiDesignRules.map((rule) => (
                <StyledScoresLi
                  title={rule.title}
                  available={rule.compliant}
                  key={rule.title}
                >
                  {rule.id}
                </StyledScoresLi>
              ))}
            </StyledScoresUl>
            <Link to={`${id}/api-design-rules`}>Meer informatie</Link>
          </Card.Body>
        </Card>
      )}

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
        render={() => (
          <APIScoresPane parentUrl={`/apis/${id}`} scores={scores} />
        )}
      />

      {/* Below might not be required after redesign. May be better to merge design rules and score in same pane. */}
      <Route
        exact
        path="/apis/:id/api-design-rules"
        render={() => <APIDesignRulesPane parentUrl={`/apis/${id}`} />}
      />
    </Container>
  )
}

APIDetails.propTypes = {
  id: PropTypes.string.isRequired,
  serviceName: PropTypes.string.isRequired,
  organizationName: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  apiType: PropTypes.string.isRequired,
  apiAuthentication: PropTypes.string.isRequired,
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
  apiDesignRules: PropTypes.array,
}

export default APIDetails
