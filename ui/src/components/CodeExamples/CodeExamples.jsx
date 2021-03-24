// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import React from 'react'
import { arrayOf, object, string, number } from 'prop-types'
import { GitLabIcon } from '../Icons/GitLabIcon'
import { GitHubIcon } from '../Icons/GitHubIcon'
import StarIcon from '../../components/Icons/StarIcon.jsx'
import PillBadge from '../PillBadge/PillBadge'

import { formatAsTimeAgo } from '../../utils/timeAgo'
import {
  CodeExamplesContainer,
  HistoryIcon,
  IconContainer,
  StyledH1,
  StyledList,
  StyledListItem,
  StyledExternalIcon,
  StyledTitle,
  StyledDescription,
  StyledTags,
  StyledStarsCount,
  StyledLastCommitMessage,
} from './CodeExamples.styles'

const CodeExample = ({
  repo,
  title,
  stars,
  lastCommit,
  tags,
  url,
  ...rest
}) => {
  return (
    <StyledListItem
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      {...rest}
    >
      <IconContainer>
        {repo === 'GitLab' ? (
          <GitLabIcon color="#0B71A1" title="GitLab" />
        ) : (
          <GitHubIcon color="#0B71A1" title="GitHub" />
        )}
      </IconContainer>
      <StyledTitle>{title}</StyledTitle>
      <StyledDescription>
        <StarIcon />
        <StyledStarsCount>{stars}</StyledStarsCount>
        <HistoryIcon />
        <StyledLastCommitMessage>{lastCommit}</StyledLastCommitMessage>
      </StyledDescription>
      <StyledTags>
        {tags.map((tag) => (
          <PillBadge key={tag}>{tag}</PillBadge>
        ))}
      </StyledTags>
      <StyledExternalIcon />
    </StyledListItem>
  )
}

CodeExample.propTypes = {
  repo: string.isRequired,
  title: string.isRequired,
  stars: number.isRequired,
  lastCommit: string.isRequired,
  tags: arrayOf(string),
  url: string.isRequired,
}

const showDate = (timestamp) => {
  const date = new Date(timestamp)
  return formatAsTimeAgo(date)
}

const whichRepo = (source) =>
  source.toLowerCase().includes('gitlab') ? 'GitLab' : 'GitHub'

const mapApiCode = (code) => ({
  id: code.id,
  lastChange: showDate(code.last_change),
  name: code.name,
  ownerName: code.owner_name,
  programmingLanguages: code.programming_languages,
  source: whichRepo(code.source),
  stars: code.stars,
  url: code.url,
})

const CodeExamples = ({ relatedCode }) => {
  const apiUsedByText =
    relatedCode?.length === 1
      ? `1 open source project gebruikt deze API`
      : `${relatedCode?.length || 0} open source projecten gebruiken deze API`

  return (
    <CodeExamplesContainer data-testid="code-examples">
      <StyledH1>Code</StyledH1>
      <small>{apiUsedByText}</small>

      <StyledList>
        {relatedCode?.map((relatedCode) => {
          const code = mapApiCode(relatedCode)
          return (
            <CodeExample
              data-testid="code-example"
              key={code.name}
              lastCommit={code.lastChange}
              repo={code.source}
              stars={code.stars}
              tags={code.programmingLanguages}
              title={code.name}
              url={code.url}
            />
          )
        })}
      </StyledList>
    </CodeExamplesContainer>
  )
}

CodeExamples.propTypes = {
  relatedCode: arrayOf(object).isRequired,
}

export default CodeExamples
