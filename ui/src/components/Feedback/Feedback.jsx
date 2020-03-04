import React from 'react'

import {
  FeedbackArea,
  FeedbackContainer,
  StyledTitle,
  StyledText,
  StyledIconButton,
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
          Wensen en opmerkingen kunnen via een melding op Gitlab doorgegeven
          worden.
        </StyledText>
        <StyledIconButton
          href="https://gitlab.com/commonground/developer.overheid.nl/issues"
          target="_blank"
          rel="noopener noreferrer"
        >
          Melding maken op Gitlab
        </StyledIconButton>
      </FeedbackContainer>
    </FeedbackArea>
  )
}

export default Feedback
