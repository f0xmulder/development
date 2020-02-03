import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

import {
  StyledAPIDetailsHeader,
  StyledArrowIcon,
  BackButton,
  PageTitle,
  SubTitle,
} from './APIDetailsHeader.styles'

const APIDetailsHeader = ({ serviceName, organizationName, history }) => (
  <StyledAPIDetailsHeader>
    <BackButton onClick={() => history.goBack()}>
      <StyledArrowIcon /> Vorige
    </BackButton>
    <div>
      <PageTitle>{serviceName}</PageTitle>
      <SubTitle>{organizationName}</SubTitle>
    </div>
  </StyledAPIDetailsHeader>
)

APIDetailsHeader.propTypes = {
  serviceName: PropTypes.string.isRequired,
  organizationName: PropTypes.string.isRequired,
  history: PropTypes.object,
}

export default withRouter(APIDetailsHeader)
