import React from 'react'
import PropTypes from 'prop-types'

import { Wrapper, Term, Key, Value } from './APITerms.styles'

const APITerms = ({ apiAuthentication, termsOfUse }) => (
  <Wrapper>
    <Term>
      <Key>API Authenticatie</Key>
      <Value data-test="api-authentication">{apiAuthentication}</Value>
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
      <Value>
        {termsOfUse.supportResponseTime
          ? `${termsOfUse.supportResponseTime}`
          : 'Geen'}
      </Value>
    </Term>
  </Wrapper>
)

APITerms.propTypes = {
  apiAuthentication: PropTypes.string.isRequired,
  termsOfUse: PropTypes.shape({
    governmentOnly: PropTypes.bool,
    payPerUse: PropTypes.bool,
    uptimeGuarantee: PropTypes.number,
    supportResponseTime: PropTypes.string,
  }),
}

APITerms.defaultProps = {}

export default APITerms
