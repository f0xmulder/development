// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import React, { useEffect, useState } from 'react'
import { func, string } from 'prop-types'
import { useParams } from 'react-router-dom'

import APIDetailsRepository from '../../domain/api-details-repository'
import Pane from '../design-system-candidates/Pane'
import External from '../Icons/External'
import {
  StyledDesignRulesUl,
  StyledDesignRulesLi,
  StyledDesignRulesTitle,
  StyledLink,
} from './APIDesignRulesPane.styles'

const APIDesignRulesPane = ({ getApiDetailsById, parentUrl }) => {
  const { id } = useParams()
  const [apiDetails, setApiDetails] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      const apiDetails = await getApiDetailsById(id)
      setApiDetails(apiDetails)
    }

    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  return (
    <Pane parentUrl={parentUrl}>
      <h2>API Design Rules</h2>
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
                  {rule.title} <External />
                </StyledLink>
              </StyledDesignRulesTitle>
              <p>{rule.description}</p>
            </StyledDesignRulesLi>
          ))}
        </StyledDesignRulesUl>
      )}
    </Pane>
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
