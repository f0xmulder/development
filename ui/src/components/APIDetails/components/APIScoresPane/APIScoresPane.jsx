// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import React from 'react'
import { shape, bool, string } from 'prop-types'
import { useHistory } from 'react-router-dom'
import { Drawer } from '@commonground/design-system'

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
  const history = useHistory()

  const close = () => history.push(parentUrl)

  return (
    <Drawer closeHandler={close}>
      <Drawer.Header title="Opbouw API Score" closeButtonLabel="Sluit" />
      <Drawer.Content>
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
      </Drawer.Content>
    </Drawer>
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
