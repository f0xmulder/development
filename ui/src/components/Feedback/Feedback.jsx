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
          as="a"
          href="https://gitlab.com/commonground/developer.overheid.nl/issues"
          target="_blank"
          rel="noopener noreferrer"
          variant="secondary"
        >
          Melding maken op Gitlab
        </StyledIconButton>
      </FeedbackContainer>
    </FeedbackArea>
  )
}

export default Feedback
