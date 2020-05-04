// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import { Button } from '@commonground/design-system'
import { H2, H3 } from '../../../Headings/Headings'

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
              <Button
                as={hasSpecification ? Link : null}
                variant="secondary"
                to={
                  hasSpecification
                    ? `/detail/${apiId}/${env.name}/specificatie`
                    : null
                }
                disabled={!hasSpecification}
                data-test="api-specification-url"
              >
                Specificatie
              </Button>

              <Button
                as={env.documentationUrl ? 'a' : null}
                variant="secondary"
                href={env.documentationUrl || null}
                disabled={!env.documentationUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-test="api-documentation-url"
              >
                Documentatie <ExternalIcon />
              </Button>
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
