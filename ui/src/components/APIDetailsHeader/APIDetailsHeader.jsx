// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

import { APIType } from '../../models/enums'
import { H1, H2 } from '../Headings/Headings'
import PillBadge from '../PillBadge/PillBadge'
import {
  StyledArrowIcon,
  BackButton,
  BackLink,
} from './APIDetailsHeader.styles'

const APIDetailsHeader = ({
  previousName,
  serviceName,
  organizationName,
  apiType,
  history,
  backLink,
}) => (
  <>
    {backLink ? (
      <BackLink to={backLink}>
        <StyledArrowIcon /> Terug naar {previousName}
      </BackLink>
    ) : (
      <BackButton onClick={() => history.goBack()}>
        <StyledArrowIcon /> Terug naar {previousName}
      </BackButton>
    )}

    <H1>{serviceName}</H1>
    <H2>{organizationName}</H2>
    {apiType && <PillBadge>{apiType.label}</PillBadge>}
  </>
)

APIDetailsHeader.propTypes = {
  previousName: PropTypes.string.isRequired,
  serviceName: PropTypes.string.isRequired,
  organizationName: PropTypes.string.isRequired,
  apiType: PropTypes.instanceOf(APIType),
  history: PropTypes.object,
  backLink: PropTypes.string,
}

export default withRouter(APIDetailsHeader)
