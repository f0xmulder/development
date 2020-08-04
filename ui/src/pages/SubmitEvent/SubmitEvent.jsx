// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import React from 'react'

import SubmitEventForm from '../../components/SubmitEventForm/SubmitEventForm'
import { StyledSubmitEvent, StyledPageContentCard } from './SubmitEvent.styles'

const SubmitEvent = () => (
  <StyledSubmitEvent>
    <h1>Event toevoegen</h1>
    <p>Voeg je evenement toe door onderstaand formulier in te vullen.</p>
    <StyledPageContentCard>
      <StyledPageContentCard.Body>
        <SubmitEventForm />
      </StyledPageContentCard.Body>
    </StyledPageContentCard>
  </StyledSubmitEvent>
)

export default SubmitEvent
