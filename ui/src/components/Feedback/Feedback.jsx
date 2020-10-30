// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import React from 'react'
import { Button } from '@commonground/design-system'

import {
  FeedbackArea,
  FeedbackContainer,
  StyledTitle,
  StyledText,
  StyledGitlabIcon,
  StyledExternalIcon,
} from './Feedback.styles'

const Feedback = () => {
  return (
    <FeedbackArea>
      <FeedbackContainer>
        <StyledTitle>Wensen of feedback?</StyledTitle>
        <StyledText>
          Deze website is ‘permanent beta’ en zal worden aangepast naar de
          behoeften van gebruikers.
          <br />
          Wensen en opmerkingen kunnen via een melding op GitLab doorgegeven
          worden.
        </StyledText>
        <Button
          as="a"
          href="https://gitlab.com/commonground/developer.overheid.nl/issues"
          target="_blank"
          rel="noopener noreferrer"
          variant="secondary"
        >
          <StyledGitlabIcon />
          Melding maken op GitLab
          <StyledExternalIcon />
        </Button>
      </FeedbackContainer>
    </FeedbackArea>
  )
}

export default Feedback
