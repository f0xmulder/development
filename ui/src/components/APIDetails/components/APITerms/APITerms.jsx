// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import React from 'react'
import PropTypes from 'prop-types'

import { APIAuthentication } from '../../../../models/enums'
import { Wrapper, Term, Key, Value } from './APITerms.styles'

const supportResponseTimeString = (supportResponseTime) => {
  if (supportResponseTime === null) {
    return 'Geen'
  }
  if (supportResponseTime <= 1) {
    return `${supportResponseTime} werkdag`
  }
  return `${supportResponseTime} werkdagen`
}

const APITerms = ({ apiAuthentication, termsOfUse }) => (
  <Wrapper>
    <Term>
      <Key>API Authenticatie</Key>
      <Value data-test="api-authentication">{apiAuthentication.label}</Value>
    </Term>

    <Term>
      <Key>Gebruik</Key>
      <Value>
        {termsOfUse.governmentOnly ? 'Alleen overheid' : 'Iedereen'}
      </Value>
    </Term>

    <Term>
      <Key>Kosten</Key>
      <Value>{termsOfUse.payPerUse ? 'Kosten voor gebruik' : 'Gratis'}</Value>
    </Term>

    <Term>
      <Key>Uptime garantie</Key>
      <Value>
        {termsOfUse.uptimeGuarantee ? `${termsOfUse.uptimeGuarantee}%` : 'Geen'}
      </Value>
    </Term>

    <Term>
      <Key>Helpdesk response</Key>
      <Value>{supportResponseTimeString(termsOfUse.supportResponseTime)}</Value>
    </Term>
  </Wrapper>
)

APITerms.propTypes = {
  apiAuthentication: PropTypes.instanceOf(APIAuthentication).isRequired,
  termsOfUse: PropTypes.shape({
    governmentOnly: PropTypes.bool,
    payPerUse: PropTypes.bool,
    uptimeGuarantee: PropTypes.number,
    supportResponseTime: PropTypes.number,
  }),
}

APITerms.defaultProps = {}

export default APITerms
