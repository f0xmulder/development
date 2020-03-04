import React from 'react'
import { shape, bool, string } from 'prop-types'

import Pane from '../../../design-system-candidates/Pane'
import { StyledScoresUl, StyledScoresLi } from '../../APIDetails.styles'
import Grade from '../../../Grade/Grade'

import { GradeSection } from './APIScoresPane.styles'

const APIScoresPane = ({ scores, parentUrl }) => {
  const {
    hasDocumentation,
    hasSpecification,
    hasContactDetails,
    providesSla,
  } = scores

  return (
    <Pane parentUrl={parentUrl}>
      <h2>Opbouw API score</h2>
      <p>Deze score geeft de kwaliteit van de API weer.</p>

      <GradeSection>
        <Grade scores={scores} largeAtMediaQuery="xsUp" />
      </GradeSection>

      <StyledScoresUl>
        <StyledScoresLi available={!!hasDocumentation}>
          Documentatie {!hasDocumentation ? 'niet' : ''} aanwezig
        </StyledScoresLi>
        <StyledScoresLi available={!!hasSpecification}>
          Specificatie {!hasSpecification ? 'niet' : ''} aanwezig
        </StyledScoresLi>
        <StyledScoresLi available={!!hasContactDetails}>
          Contactgegevens {!hasContactDetails ? 'niet' : ''} aanwezig
        </StyledScoresLi>
        <StyledScoresLi available={!!providesSla}>
          SLA {!providesSla ? 'niet' : ''} aanwezig
        </StyledScoresLi>
      </StyledScoresUl>
    </Pane>
  )
}

APIScoresPane.propTypes = {
  scores: shape({
    hasDocumentation: bool,
    hasSpecification: bool,
    hasContactDetails: bool,
    providesSla: bool,
  }),
  parentUrl: string,
}

export default APIScoresPane
