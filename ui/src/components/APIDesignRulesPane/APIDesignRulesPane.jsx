// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import React, { useEffect, useState } from 'react'
import { func, string } from 'prop-types'
import { useParams, useHistory } from 'react-router-dom'
import { Drawer } from '@commonground/design-system'

import APIDetailsRepository from '../../domain/api-details-repository'
import {
  StyledDesignRulesUl,
  StyledDesignRulesLi,
  StyledDesignRulesTitle,
  StyledLink,
  ExternalIcon,
} from './APIDesignRulesPane.styles'

const APIDesignRulesPane = ({ getApiDetailsById, parentUrl }) => {
  const { id } = useParams()
  const [apiDetails, setApiDetails] = useState(null)
  const history = useHistory()

  useEffect(() => {
    const fetchData = async () => {
      const apiDetails = await getApiDetailsById(id)
      setApiDetails(apiDetails)
    }

    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  const close = () => history.push(parentUrl)

  return (
    <Drawer closeHandler={close}>
      <Drawer.Header title="API Design Rules" closeButtonLabel="Sluit" />
      <Drawer.Content>
        <p>
          Van de volgende{' '}
          <StyledLink
            href="https://docs.geostandaarden.nl/api/API-Designrules/"
            target="_blank"
            rel="noopener noreferrer"
          >
            API Design Rules
          </StyledLink>{' '}
          wordt automatisch gecontroleerd of de API eraan voldoet:
        </p>
        {apiDetails && apiDetails.apiDesignRules && (
          <StyledDesignRulesUl>
            {apiDetails.apiDesignRules.map((rule) => (
              <StyledDesignRulesLi available={rule.compliant} key={rule.title}>
                <StyledDesignRulesTitle>
                  <StyledLink
                    href={rule.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {rule.title} <ExternalIcon />
                  </StyledLink>
                </StyledDesignRulesTitle>
                <p>{rule.description}</p>
              </StyledDesignRulesLi>
            ))}
          </StyledDesignRulesUl>
        )}
      </Drawer.Content>
    </Drawer>
  )
}

APIDesignRulesPane.propTypes = {
  getApiDetailsById: func.isRequired,
  parentUrl: string.isRequired,
}

APIDesignRulesPane.defaultProps = {
  getApiDetailsById: APIDetailsRepository.getById,
}

export default APIDesignRulesPane
