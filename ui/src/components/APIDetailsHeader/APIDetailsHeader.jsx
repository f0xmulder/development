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
  StyledExternalIcon,
  BackButton,
  SpecLink,
  HeaderContainer,
} from './APIDetailsHeader.styles'

export const getExternalSpecificationDescription = (url) => {
  const text = 'Originele specificatie'

  if (url.substring(url.length - 5).toLowerCase() === '.json') {
    return text + ' (JSON)'
  } else if (
    url.substring(url.length - 4).toLowerCase() === '.yml' ||
    url.substring(url.length - 5).toLowerCase() === '.yaml'
  ) {
    return text + ' (YAML)'
  }

  return text
}

export const APIDetailsHeader = ({
  previousName,
  serviceName,
  organizationName,
  apiType,
  history,
  externalSpecificationUrl,
}) => (
  <>
    <BackButton onClick={() => history.goBack()}>
      <StyledArrowIcon /> Terug naar {previousName}
    </BackButton>

    {externalSpecificationUrl ? (
      <HeaderContainer>
        <H1>{serviceName}</H1>
        <SpecLink href={externalSpecificationUrl}>
          <span>
            {getExternalSpecificationDescription(externalSpecificationUrl)}
          </span>
          <StyledExternalIcon />
        </SpecLink>
      </HeaderContainer>
    ) : (
      <H1>{serviceName}</H1>
    )}
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
  externalSpecificationUrl: PropTypes.string,
}

export default withRouter(APIDetailsHeader)
