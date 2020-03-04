import React from 'react'
import PropTypes from 'prop-types'

import { H2, H3 } from '../../../Headings/Headings'
import { ButtonLink, ButtonA } from '../../../Button/Button'

import {
  Wrapper,
  Environment,
  EnvData,
  Buttons,
  EnvUri,
  ExternalIcon,
} from './APIEnvironments.styles'

const APIEnvironments = ({ environments, apiId }) => (
  <Wrapper data-test="environments">
    <H2>Omgevingen</H2>

    {environments.map((env) => {
      const hasSpecification = env.specificationUrl && env.name

      return (
        <Environment key={env.name}>
          <H3>{env.name}</H3>
          <EnvData>
            <EnvUri data-test="apiUrl">{env.apiUrl}</EnvUri>

            <Buttons>
              <ButtonLink
                to={
                  hasSpecification
                    ? `/detail/${apiId}/${env.name.toLowerCase()}/specificatie`
                    : null
                }
                disabled={!hasSpecification}
                data-test="api-specification-url"
              >
                Specificatie
              </ButtonLink>

              <ButtonA
                href={env.documentationUrl || null}
                disabled={!env.documentationUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-test="api-documentation-url"
              >
                Documentatie <ExternalIcon />
              </ButtonA>
            </Buttons>
          </EnvData>
        </Environment>
      )
    })}
  </Wrapper>
)

APIEnvironments.propTypes = {
  apiId: PropTypes.string.isRequired,
  environments: PropTypes.arrayOf(PropTypes.object),
}
APIEnvironments.defaultProps = {}

export default APIEnvironments
