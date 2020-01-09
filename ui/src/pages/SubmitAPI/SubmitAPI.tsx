import React from 'react'
import { NavLink, Route, Redirect, RouteComponentProps } from 'react-router-dom'

import SubmitAPIForm from '../SubmitAPIForm/SubmitAPIForm'
import SubmitAPIMergeRequest from '../SubmitAPIMergeRequest/SubmitAPIMergeRequest'
import PageContentCard from '../../components/PageContentCard/PageContentCard'

import {
  StyledSubmitAPI,
  StyledPageTitle,
  StyledTabs,
  StyledDescription,
} from './SubmitAPI.styles'

const SubmitAPI = ({ match: { url } }: RouteComponentProps) => (
  <StyledSubmitAPI>
    <StyledPageTitle>API toevoegen</StyledPageTitle>
    <StyledDescription>
      Voeg je API toe aan developer.overheid.nl door onderstaand formulier in te
      vullen of een Merge Request aan te maken.
    </StyledDescription>

    <StyledTabs>
      <NavLink to={`${url}/formulier`}>Formulier</NavLink>
      <NavLink to={`${url}/merge-request`}>Merge Request</NavLink>
    </StyledTabs>

    <PageContentCard>
      <PageContentCard.Body>
        <Route
          path={url}
          exact
          render={() => <Redirect to={`${url}/formulier`} />}
        />
        <Route path={`${url}/formulier`} component={SubmitAPIForm} />
        <Route
          path={`${url}/merge-request`}
          component={SubmitAPIMergeRequest}
        />
      </PageContentCard.Body>
    </PageContentCard>
  </StyledSubmitAPI>
)

export default SubmitAPI
