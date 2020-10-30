// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import React from 'react'
import { string, number, instanceOf, arrayOf, object } from 'prop-types'

import { Collapsible } from '@commonground/design-system'
import { formatAsTimeAgo } from '../../utils/timeAgo'
import ExternalIcon from '../Icons/External'
import PillBadge from '../PillBadge/PillBadge'
import { StyledCard, StyledLink } from './CodeSummary.styles'

const CodeSummary = ({
  ownerName,
  name,
  url,
  lastChange,
  stars,
  source,
  relatedApis,
  programmingLanguages,
}) => (
  <StyledCard>
    <StyledCard.LinkContainer>
      <StyledLink target="_blank" rel="noopener noreferrer" href={url}>
        {ownerName}/{name}
      </StyledLink>
      <ExternalIcon />
    </StyledCard.LinkContainer>
    <StyledCard.Details>
      <StyledCard.StarsActivity>
        {source.includes('repository') ? (
          <StyledCard.Span>
            <StyledCard.RepositoryIcon /> <small>Repository</small>
          </StyledCard.Span>
        ) : (
          <StyledCard.Span>
            <StyledCard.SnippetIcon /> <small>Snippet</small>
          </StyledCard.Span>
        )}
        {stars ? (
          <StyledCard.Span>
            <StyledCard.StarIcon /> <small>{stars}</small>
          </StyledCard.Span>
        ) : null}
        <StyledCard.HistoryIcon />{' '}
        <span>
          <small>{formatAsTimeAgo(lastChange)}</small>
        </span>
      </StyledCard.StarsActivity>
      <div>
        {programmingLanguages.map((pl, i) => (
          <StyledCard.PillContainer key={i}>
            <PillBadge>{pl}</PillBadge>
          </StyledCard.PillContainer>
        ))}
      </div>
      {relatedApis.length ? (
        <StyledCard.APIs>
          <Collapsible
            title={
              relatedApis.length !== 1
                ? `Gebruikt ${relatedApis.length} APIs van (semi-)overheidsorganisaties`
                : `Gebruikt ${relatedApis.length} API van een (semi-)overheidsorganisatie`
            }
          >
            {relatedApis.map((api, i) => (
              <div key={i}>
                <br />
                <StyledCard.APILink to={`/apis/${api.api_id}`}>
                  <StyledCard.APIContent>
                    {api.service_name}
                    <br />
                    <small>{api.organization_name}</small>
                  </StyledCard.APIContent>
                  <div>
                    <StyledCard.ChevronRightIcon />
                  </div>
                </StyledCard.APILink>
              </div>
            ))}
          </Collapsible>
        </StyledCard.APIs>
      ) : (
        ''
      )}
    </StyledCard.Details>
  </StyledCard>
)

CodeSummary.propTypes = {
  ownerName: string.isRequired,
  name: string.isRequired,
  url: string.isRequired,
  lastChange: instanceOf(Date).isRequired,
  stars: number,
  source: string.isRequired,
  programmingLanguages: arrayOf(string).isRequired,
  relatedApis: arrayOf(object).isRequired,
}

export default CodeSummary
