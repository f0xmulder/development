import React from 'react'
import { shape, string } from 'prop-types'
import { NavLink, Route, Redirect } from 'react-router-dom'
import SubmitAPIForm from '../SubmitAPIForm/SubmitAPIForm'
import SubmitAPIMergeRequest from '../SubmitAPIMergeRequest/SubmitAPIMergeRequest'
import {
  StyledSubmitAPI,
  StyledPageTitle,
  StyledTabs,
  StyledDescription,
} from './SubmitAPI.styles'
import PageContentCard from '../../components/PageContentCard/PageContentCard'

const SubmitAPI = ({ match: { url } }) => (
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

SubmitAPI.propTypes = {
  match: shape({
    url: string,
  }),
}

SubmitAPI.defaultProps = {
  match: {
    url: 'api-toevoegen',
  },
}

export default SubmitAPI
